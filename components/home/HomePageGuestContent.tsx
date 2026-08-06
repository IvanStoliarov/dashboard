import { createClient } from '@/lib/supabase/server';
import React from 'react';

export default async function HomePageGuestContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = await createClient();
  const claims = await client.auth.getClaims();
  const isAuthenticated = claims.data?.claims.sub;
  if (isAuthenticated) return null;
  return children;
}
