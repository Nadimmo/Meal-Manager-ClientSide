import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ksbnbpvrwiahovmjaxcx.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzYm5icHZyd2lhaG92bWpheGN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMzczMzgsImV4cCI6MjA4NDcxMzMzOH0.CjiqxqiN95eWdZ8ciNTeIDPMDqLAhY3NGPHVVGT4LVw"


export const supabase = createClient(supabaseUrl, supabaseAnonKey)
