import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'A server-authenticated Supabase dashboard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <a
          href='#main-content'
          className='sr-only fixed left-4 top-4 z-[100] rounded-lg bg-zinc-950 px-4 py-2 text-sm font-medium text-white focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        >
          Skip to main content
        </a>
        {children}
        <Toaster
          position='top-right'
          gutter={12}
          toastOptions={{
            duration: 4500,
            style: {
              maxWidth: '24rem',
              border: '1px solid #e4e4e7',
              borderRadius: '0.75rem',
              background: '#ffffff',
              color: '#27272a',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              lineHeight: 1.5,
              boxShadow: '0 16px 40px -18px rgba(24, 24, 27, 0.35)',
            },
            success: {
              iconTheme: {
                primary: '#16a34a',
                secondary: '#f0fdf4',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#fef2f2',
              },
            },
            loading: {
              iconTheme: {
                primary: '#2563eb',
                secondary: '#eff6ff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
