import React, { ReactNode } from 'react';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className='min-h-screen bg-zinc-50 px-4 py-8 sm:px-6'>
        <div className='mx-auto max-w-450'>
          <Header />
          <main
            id='main-content'
            className='mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8'
          >
            {children}
          </main>
        </div>
      </div>
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
    </>
  );
}
