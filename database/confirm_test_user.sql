-- Testing helper only.
-- Use this when Supabase confirmation emails are not arriving.
-- Replace the email if needed, then run in Supabase SQL Editor.

update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now())
where lower(email) = lower('c_b_9046@hotmail.com');

select id, email, email_confirmed_at, confirmed_at
from auth.users
where lower(email) = lower('c_b_9046@hotmail.com');
