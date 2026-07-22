import 'server-only';
import { createClient } from '../supabase/server';
import { Profile } from '../types';

export async function getUserDataAPI(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from('profiles')
    .select('email, username')
    .eq('id', id)
    .maybeSingle();
  return data;
}

export async function getAllUsersAPI(): Promise<Profile[] | []> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.log('Something went wrong while fetching users');
    return [];
  }

  return data && data?.length > 0 ? data : [];
}

export async function getUsersByIdsAPI(ids: string[]): Promise<Profile[] | []> {
  if (ids.length === 0) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .in('id', ids);

  if (error) {
    console.log('Something went wrong while fetching users');
    return [];
  }

  return data && data.length > 0 ? data : [];
}


export async function getUsersByNameAPI(
  name?: string,
): Promise<Profile[] | []> {
  const query = name?.trim();

  if (!query) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .or(`username.ilike.%${query}%,email.ilike.%${query}%`)
    .order('username', { ascending: true });

  if (error) {
    console.log('Something went wrong while fetching users');
    return [];
  }

  return data && data.length > 0 ? data : [];
}
