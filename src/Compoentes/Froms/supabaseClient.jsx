import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qjwtfscwloiinilmoynb.supabase.co";
const supabaseKey = "sb_publishable_a6-8NkzyE2OXJQ9cQJLsRg_Ix5awgHm";

export const supabase = createClient(supabaseUrl, supabaseKey);