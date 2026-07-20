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
