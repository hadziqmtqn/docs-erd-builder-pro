import React, { useState, useEffect } from 'react';

const GITHUB_REPO = 'hadziqmtqn/erd-builder-pro';

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
}

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Changelog() {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data dari GitHub');
        return res.json();
      })
      .then((data) => {
        setReleases(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Memuat riwayat perubahan...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="changelog-container">
      {releases.map((release) => (
        <div key={release.id} style={{ marginBottom: '3rem', borderBottom: '1px solid var(--ifm-color-emphasis-200)', paddingBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
             <h3 style={{ margin: 0 }}>v{release.tag_name.replace('v', '')}</h3>
             <span style={{ fontSize: '0.8rem', color: 'var(--ifm-color-emphasis-600)' }}>
               {new Date(release.published_at).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
          </div>
          <div className="markdown-body" style={{ fontSize: '0.9rem' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {release.body}
            </ReactMarkdown>
          </div>
          <a href={release.html_url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', marginTop: '15px', display: 'inline-block', fontWeight: 'bold' }}>
            Lihat Detail di GitHub →
          </a>
        </div>
      ))}
    </div>
  );
}
