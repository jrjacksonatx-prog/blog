import './globals.css';
import type { Metadata } from 'next';
import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'My Blog',
  description: 'Next.js + MDX + Contentlayer on Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ margin: 0 }}>
                <a href="/">My Blog</a>
              </h1>
              <p style={{ margin: 0 }}>
                <small>Tech • DevOps • TAM</small>
              </p>
            </div>
            <nav style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="/deals">Deals</a>
              <a href="/posts">Posts</a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()} • Built with Next.js & MDX •{' '}
          <a href="/deals">Flight Deals</a>
        </footer>
      </body>
    </html>
  );
}

