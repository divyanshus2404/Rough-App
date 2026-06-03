-- Swaptopia Database Schema

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  enrollment_number text unique,
  avatar_url text,
  signature_url text,
  face_scan_url text,
  is_verified_student boolean default false,
  verification_status text default 'pending', -- 'pending', 'verified', 'rejected'
  university_domain text,
  trust_score integer default 100,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- 2. CATEGORIES TABLE
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text unique not null,
  slug text unique not null,
  icon text
);

-- Populate initial categories
insert into public.categories (name, slug, icon) values 
  ('Books & Notes', 'books-notes', 'book'),
  ('Electronics', 'electronics', 'laptop'),
  ('Furniture', 'furniture', 'sofa'),
  ('Clothing', 'clothing', 'shirt'),
  ('Stationery', 'stationery', 'pen-tool'),
  ('Sports & Outdoors', 'sports-outdoors', 'bike'),
  ('Vehicles/Bikes', 'vehicles-bikes', 'car'),
  ('Sublets & Housing', 'sublets-housing', 'home'),
  ('Miscellaneous', 'misc', 'box');

-- 3. LISTINGS TABLE
create table public.listings (
  id uuid default uuid_generate_v4() primary key,
  seller_id uuid references public.profiles(id) on delete cascade not null,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  description text,
  price numeric(10,2) not null,
  currency text default 'INR',
  is_swap_open boolean default false,
  swap_preferences text[] default array[]::text[],
  condition text not null, -- 'New', 'Like New', 'Good', 'Fair', 'Poor'
  images text[] default array[]::text[],
  status text default 'active', -- 'active', 'sold', 'archived'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for listings
alter table public.listings enable row level security;
create policy "Listings are viewable by everyone." on public.listings for select using (status = 'active');
create policy "Users can create their own listings." on public.listings for insert with check (auth.uid() = seller_id);
create policy "Users can update their own listings." on public.listings for update using (auth.uid() = seller_id);
create policy "Users can delete their own listings." on public.listings for delete using (auth.uid() = seller_id);

-- 4. MESSAGES TABLE
create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  listing_id uuid references public.listings(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  receiver_id uuid references public.profiles(id) on delete set null,
  content text not null,
  read_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for messages
alter table public.messages enable row level security;
create policy "Users can read their own messages." on public.messages for select using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "Users can send messages." on public.messages for insert with check (auth.uid() = sender_id);

-- Functions & Triggers
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger listings_updated_at
  before update on public.listings
  for each row execute procedure handle_updated_at();
