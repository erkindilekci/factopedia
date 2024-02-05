import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://fquvmouxlqlmhewonqwf.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxdXZtb3V4bHFsbWhld29ucXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxMjUyMDYsImV4cCI6MjAyMjcwMTIwNn0.M3ZXF6odLJ71fTJh9pMKgMJ4GrmXKRvMz_-VCFKekqk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;