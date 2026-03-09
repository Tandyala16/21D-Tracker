import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cgbjexwjoiuvsvdmqses.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnYmpleHdqb2l1dnN2ZG1xc2VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwMjk0MzksImV4cCI6MjA4ODYwNTQzOX0.NbjnNWzKVZdHiQEyOM62eS28wG91aThJFigUiFkF2AM'

export const supabase = createClient(supabaseUrl, supabaseKey)
