import React, {type ReactNode, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import {useHistory, useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import styles from './styles.module.css';

const GITHUB_REPO = 'hadziqmtqn/erd-builder-pro';
const RELEASES_API = `https://api.github.com/repos/${GITHUB_REPO}/releases`;
const RELEASES_PAGE = `https://github.com/${GITHUB_REPO}/releases`;
const PER_PAGE = 10;
// GitHub allows 60 unauthenticated API requests per hour per IP address,
// so a fetched page is reused for a while instead of being requested again.
const CACHE_TTL_MS = 30 * 60 * 1000;
const STORAGE_PREFIX = 'erdbp-changelog:v1:page:';
const REMARK_PLUGINS = [remarkGfm];

interface Release {
  id: number;
  tag_name: string;
  body: string | null;
  published_at: string | null;
  html_url: string;
}

interface ReleasePage {
  releases: Release[];
  lastPage: number;
  fetchedAt: number;
}

type LoadError = {kind: 'rate-limited'; retryAt: number | null} | {kind: 'failed'};

type FetchResult = {ok: true; data: ReleasePage} | {ok: false; error: LoadError};

type View =
  | {status: 'loading'; page: number}
  | {status: 'ready'; page: number; data: ReleasePage}
  | {status: 'error'; page: number; error: LoadError};

const memoryCache = new Map<number, ReleasePage>();

function readCache(page: number): ReleasePage | null {
  const cached = memoryCache.get(page);
  if (cached) {
    return cached;
  }
  try {
    const stored = window.sessionStorage.getItem(STORAGE_PREFIX + page);
    if (!stored) {
      return null;
    }
    const parsed = JSON.parse(stored) as ReleasePage;
    if (
      !Array.isArray(parsed.releases) ||
      !Number.isInteger(parsed.lastPage) ||
      typeof parsed.fetchedAt !== 'number'
    ) {
      return null;
    }
    memoryCache.set(page, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(page: number, entry: ReleasePage): void {
  memoryCache.set(page, entry);
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + page, JSON.stringify(entry));
  } catch {
    // Storage can be full or blocked; the in-memory copy still covers this visit.
  }
}

function isFresh(entry: ReleasePage): boolean {
  return Date.now() - entry.fetchedAt < CACHE_TTL_MS;
}

function freshCache(page: number): ReleasePage | null {
  const cached = readCache(page);
  return cached && isFresh(cached) ? cached : null;
}

function pageFromLink(header: string | null, rel: string): number | null {
  for (const part of header?.split(',') ?? []) {
    const match = /<([^>]+)>;\s*rel="([^"]+)"/.exec(part);
    if (match?.[2] === rel) {
      const page = Number(new URL(match[1]).searchParams.get('page'));
      return Number.isInteger(page) && page > 0 ? page : null;
    }
  }
  return null;
}

async function fetchReleasePage(page: number, signal: AbortSignal): Promise<FetchResult> {
  const response = await fetch(`${RELEASES_API}?per_page=${PER_PAGE}&page=${page}`, {signal});
  if (response.status === 403 || response.status === 429) {
    const retryAfter = Number(response.headers.get('retry-after'));
    const reset = Number(response.headers.get('x-ratelimit-reset'));
    let retryAt: number | null = null;
    if (retryAfter > 0) {
      retryAt = Date.now() + retryAfter * 1000;
    } else if (response.headers.get('x-ratelimit-remaining') === '0' && reset > 0) {
      retryAt = reset * 1000;
    }
    return {ok: false, error: {kind: 'rate-limited', retryAt}};
  }
  if (!response.ok) {
    return {ok: false, error: {kind: 'failed'}};
  }
  const releases = ((await response.json()) as Release[]).map(
    ({id, tag_name, body, published_at, html_url}) => ({id, tag_name, body, published_at, html_url}),
  );
  // GitHub leaves out rel="last" when the requested page is the last one.
  const lastPage = pageFromLink(response.headers.get('link'), 'last') ?? (releases.length > 0 ? page : 1);
  return {ok: true, data: {releases, lastPage, fetchedAt: Date.now()}};
}

function parsePage(search: string): number {
  const page = Number(new URLSearchParams(search).get('page'));
  return Number.isInteger(page) && page > 0 ? page : 1;
}

function range(from: number, to: number): number[] {
  return Array.from({length: to - from + 1}, (_, index) => from + index);
}

// Seven slots at most, so the bar keeps its width while moving between pages.
function pageItems(current: number, last: number): Array<number | 'gap'> {
  if (last <= 7) {
    return range(1, last);
  }
  if (current <= 4) {
    return [...range(1, 5), 'gap', last];
  }
  if (current >= last - 3) {
    return [1, 'gap', ...range(last - 4, last)];
  }
  return [1, 'gap', current - 1, current, current + 1, 'gap', last];
}

function ReleaseEntry({release, dateFormat}: {release: Release; dateFormat: Intl.DateTimeFormat}): ReactNode {
  return (
    <article className={styles.release}>
      <header className={styles.releaseHeader}>
        <h3 className={styles.releaseTitle}>v{release.tag_name.replace(/^v/, '')}</h3>
        {release.published_at && (
          <time className={styles.releaseDate} dateTime={release.published_at}>
            {dateFormat.format(new Date(release.published_at))}
          </time>
        )}
      </header>
      <div className={clsx('markdown-body', styles.releaseBody)}>
        {/* skipHtml drops GitHub's "Release notes generated using …" comment, which would otherwise show as text. */}
        <ReactMarkdown remarkPlugins={REMARK_PLUGINS} skipHtml>
          {release.body ?? ''}
        </ReactMarkdown>
      </div>
      <a className={styles.releaseLink} href={release.html_url} target="_blank" rel="noopener noreferrer">
        <Translate id="changelog.release.viewOnGitHub" description="Link from a changelog entry to its GitHub release">
          Lihat Detail di GitHub →
        </Translate>
      </a>
    </article>
  );
}

function LoadErrorNotice({
  error,
  timeFormat,
  onRetry,
}: {
  error: LoadError;
  timeFormat: Intl.DateTimeFormat;
  onRetry: () => void;
}): ReactNode {
  let message: ReactNode;
  if (error.kind === 'failed') {
    message = (
      <Translate id="changelog.error.failed" description="Shown when the GitHub releases request fails">
        Riwayat perubahan tidak dapat dimuat dari GitHub. Periksa koneksi internet Anda, lalu coba lagi.
      </Translate>
    );
  } else if (error.retryAt !== null) {
    message = (
      <Translate
        id="changelog.error.rateLimitedUntil"
        description="Shown when GitHub refuses the request (HTTP 403 or 429) and sends the time its limit resets"
        values={{time: timeFormat.format(error.retryAt)}}>
        {'GitHub sedang membatasi permintaan dari jaringan Anda. Coba lagi setelah pukul {time}, atau baca catatan rilis langsung di GitHub.'}
      </Translate>
    );
  } else {
    message = (
      <Translate
        id="changelog.error.rateLimited"
        description="Shown when GitHub refuses the request (HTTP 403 or 429) without a reset time">
        GitHub sedang membatasi permintaan dari jaringan Anda. Coba lagi beberapa menit lagi, atau baca catatan rilis langsung di GitHub.
      </Translate>
    );
  }
  return (
    <div
      className={clsx('alert', error.kind === 'failed' ? 'alert--danger' : 'alert--warning', styles.notice)}
      role="alert">
      <p>{message}</p>
      <div className={styles.noticeActions}>
        {error.kind === 'failed' && (
          <button type="button" className="button button--sm button--secondary" onClick={onRetry}>
            <Translate id="changelog.error.retry" description="Button that requests the changelog page again">
              Coba lagi
            </Translate>
          </button>
        )}
        <a
          className="button button--sm button--outline button--secondary"
          href={RELEASES_PAGE}
          target="_blank"
          rel="noopener noreferrer">
          <Translate id="changelog.error.openReleases" description="Link to the GitHub Releases page when the changelog cannot load">
            Buka GitHub Releases
          </Translate>
        </a>
      </div>
    </div>
  );
}

function StepLink({target, className, children}: {target: string | null; className: string; children: ReactNode}): ReactNode {
  const classes = clsx('button button--secondary button--outline', className);
  if (target === null) {
    return (
      <span className={clsx(classes, 'disabled')} aria-disabled="true">
        {children}
      </span>
    );
  }
  return (
    <Link className={classes} to={target}>
      {children}
    </Link>
  );
}

function Pagination({
  page,
  lastPage,
  hrefFor,
}: {
  page: number;
  lastPage: number;
  hrefFor: (page: number) => string;
}): ReactNode {
  const previous = Math.min(page - 1, lastPage);
  return (
    <nav
      className={styles.nav}
      aria-label={translate({
        id: 'changelog.pagination.label',
        message: 'Halaman changelog',
        description: 'ARIA label of the changelog pagination',
      })}>
      <StepLink className={styles.previous} target={previous >= 1 ? hrefFor(previous) : null}>
        <span aria-hidden="true">← </span>
        <Translate id="changelog.pagination.previous" description="Link to the previous changelog page">
          Sebelumnya
        </Translate>
      </StepLink>
      <ul className={clsx('pagination', styles.pages)}>
        {pageItems(page, lastPage).map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} className={clsx('pagination__item', styles.gap)} aria-hidden="true">
              <span>…</span>
            </li>
          ) : (
            <li key={item} className={clsx('pagination__item', item === page && 'pagination__item--active')}>
              <Link
                className="pagination__link"
                to={hrefFor(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={translate(
                  {
                    id: 'changelog.pagination.page',
                    message: 'Halaman {page}',
                    description: 'ARIA label of a numbered changelog page link',
                  },
                  {page: item},
                )}>
                {item}
              </Link>
            </li>
          ),
        )}
      </ul>
      <StepLink className={styles.next} target={page < lastPage ? hrefFor(page + 1) : null}>
        <Translate id="changelog.pagination.next" description="Link to the next changelog page">
          Berikutnya
        </Translate>
        <span aria-hidden="true"> →</span>
      </StepLink>
    </nav>
  );
}

export default function Changelog(): ReactNode {
  const {i18n} = useDocusaurusContext();
  const history = useHistory();
  const location = useLocation();
  const page = parsePage(location.search);
  const [state, setState] = useState<View>({status: 'loading', page});
  const [knownLastPage, setKnownLastPage] = useState<number | null>(null);
  const [attempt, setAttempt] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const shownPage = useRef(page);

  useEffect(() => {
    const fresh = freshCache(page);
    if (fresh) {
      setState({status: 'ready', page, data: fresh});
      setKnownLastPage(fresh.lastPage);
      return undefined;
    }
    const cached = readCache(page);
    const controller = new AbortController();
    setState({status: 'loading', page});
    fetchReleasePage(page, controller.signal)
      .catch((): FetchResult => ({ok: false, error: {kind: 'failed'}}))
      .then((result) => {
        if (controller.signal.aborted) {
          return;
        }
        if (result.ok) {
          writeCache(page, result.data);
          setState({status: 'ready', page, data: result.data});
          setKnownLastPage(result.data.lastPage);
        } else if (cached) {
          // An expired copy reads better than an error while GitHub refuses requests.
          setState({status: 'ready', page, data: cached});
          setKnownLastPage(cached.lastPage);
        } else {
          setState({status: 'error', page, error: result.error});
        }
      });
    return () => controller.abort();
  }, [page, attempt]);

  useEffect(() => {
    if (shownPage.current === page) {
      return;
    }
    shownPage.current = page;
    // Back and Forward keep the scroll position the browser restores for that entry.
    if (history.action === 'POP') {
      return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    topRef.current?.scrollIntoView({behavior: reduceMotion ? 'auto' : 'smooth', block: 'start'});
    statusRef.current?.focus({preventScroll: true});
  }, [page, history]);

  const dateFormat = useMemo(
    () => new Intl.DateTimeFormat(i18n.currentLocale, {year: 'numeric', month: 'long', day: 'numeric'}),
    [i18n.currentLocale],
  );
  const timeFormat = useMemo(
    () => new Intl.DateTimeFormat(i18n.currentLocale, {hour: '2-digit', minute: '2-digit'}),
    [i18n.currentLocale],
  );

  // Right after the URL changes, the state still holds the previous page. A cached page
  // renders at once, so the scroll below lands on the full list instead of a loading line.
  let view: View = state;
  if (state.page !== page) {
    const fresh = freshCache(page);
    view = fresh ? {status: 'ready', page, data: fresh} : {status: 'loading', page};
  }
  const lastPage = view.status === 'ready' ? view.data.lastPage : knownLastPage;
  const hrefFor = (target: number) => (target <= 1 ? location.pathname : `${location.pathname}?page=${target}`);

  let statusText: string | null = null;
  if (view.status === 'loading') {
    statusText = translate({
      id: 'changelog.loading',
      message: 'Memuat riwayat perubahan…',
      description: 'Shown while a changelog page loads from GitHub',
    });
  } else if (view.status === 'ready' && view.data.releases.length > 0) {
    statusText = translate(
      {
        id: 'changelog.pageStatus',
        message: 'Halaman {page} dari {total}',
        description: 'Position of the current changelog page',
      },
      {page: view.page, total: view.data.lastPage},
    );
  }

  return (
    <div ref={topRef} className={styles.changelog}>
      {statusText && (
        <p ref={statusRef} tabIndex={-1} className={styles.status}>
          {statusText}
        </p>
      )}
      {view.status === 'error' && (
        <LoadErrorNotice
          error={view.error}
          timeFormat={timeFormat}
          onRetry={() => setAttempt((count) => count + 1)}
        />
      )}
      {view.status === 'ready' && view.data.releases.length === 0 && (
        <p>
          {view.page > 1 ? (
            <Translate
              id="changelog.pageMissing"
              description="Shown when the page number in the URL is past the last changelog page"
              values={{page: view.page, total: view.data.lastPage}}>
              {'Halaman {page} tidak ada. Changelog hanya sampai halaman {total}.'}
            </Translate>
          ) : (
            <Translate id="changelog.empty" description="Shown when the repository has no releases">
              Belum ada rilis di GitHub.
            </Translate>
          )}
        </p>
      )}
      {view.status === 'ready' &&
        view.data.releases.map((release) => (
          <ReleaseEntry key={release.id} release={release} dateFormat={dateFormat} />
        ))}
      {lastPage !== null && (lastPage > 1 || page > 1) && (
        <Pagination page={page} lastPage={lastPage} hrefFor={hrefFor} />
      )}
    </div>
  );
}
