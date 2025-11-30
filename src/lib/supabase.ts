import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://etggcbqlghjluepxojrb.supabase.co';
const supabaseAnonKey = 'sb_publishable_i5G6hdcgJ0glOm7zA8I96g_Bemxd0Sb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
