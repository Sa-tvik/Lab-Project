import config
from supabase import create_client, Client

supabase: Client = create_client(config.SUPABASE_URL, config.SUPABASE_KEY)
