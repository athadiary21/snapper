import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Screenshot = {
  id: string;
  user_id: string;
  title: string;
  image_url: string;
  thumbnail_url?: string;
  metadata?: {
    width: number;
    height: number;
    format: string;
    annotations?: any[];
  };
  created_at: string;
  updated_at: string;
};

export type Preset = {
  id: string;
  user_id: string;
  name: string;
  settings: {
    background_color?: string;
    padding?: number;
    border_radius?: number;
    shadow?: boolean;
    shadow_color?: string;
  };
  created_at: string;
};
