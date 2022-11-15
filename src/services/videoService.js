import {createClient} from "@supabase/supabase-js";

const PROJECT_URL = "https://dvjltguguyphpkeuwhem.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2amx0Z3VndXlwaHBrZXV3aGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMTI0NjYsImV4cCI6MTk4Mzc4ODQ2Nn0.UXzZg56s397AuUAZMXJ9FvqM-r9FHG6BCH1JhcVhef4";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("videos")
                .select("*")

        }
    }
}