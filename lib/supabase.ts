import { createClient, SupabaseClient } from "@supabase/supabase-js";

// These are intentionally NEXT_PUBLIC_ env vars — the Supabase anon key is
// designed to be exposed client-side. RLS policies enforce access control:
//   - charta_waitlist: INSERT allowed for anon, SELECT/UPDATE/DELETE denied.
// Do NOT commit credentials directly; configure these in Vercel/your host.

// Lazy singleton — avoids throwing at module load if imported in a server
// context where env vars aren't needed for the current render path.
// Note: module-level singleton is appropriate for production (one env per deployment)
// but intentionally not reset between calls. If running tests with multiple env
// configurations, call `resetSupabaseClient()` exported below between test suites.
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (client) return client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set."
    );
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

/** Reset the singleton — for test environments only. Not needed in production. */
export function resetSupabaseClient(): void {
  client = null;
}
