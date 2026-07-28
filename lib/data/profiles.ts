import 'server-only';
import { createClient } from '../supabase/server';
import { Profile } from '../types';

export async function getUserDataAPI(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from('profiles')
    .select('email, username, role')
    .eq('id', id)
    .maybeSingle();
  return data;
}

export async function getCurrentUserProfileAPI() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('email, username, role')
    .eq('id', user.id)
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

export async function updateUserAPI({
  userName,
}: {
  userName: NonNullable<Profile['username']>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: null, error: userError };
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ username: userName })
    .eq('id', user.id)
    .select()
    .single();

  if (error || !data) {
    return { data: null, error };
  }

  const { error: metadataError } = await supabase.auth.updateUser({
    data: { username: userName },
  });

  if (metadataError) {
    return { data: null, error: metadataError };
  }

  return { data, error: null };
}
