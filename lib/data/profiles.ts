import 'server-only';
import { createClient } from '../supabase/server';

export async function getUserData(id: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from('profiles')
    .select('email, username')
    .eq('id', id)
    .maybeSingle();

  return data;
}
