export interface Profile {
  id: string;
  role: 'admin' | 'psico' | 'user';
  full_name: string | null;
  phone: string | null;
  created_at: string;
}