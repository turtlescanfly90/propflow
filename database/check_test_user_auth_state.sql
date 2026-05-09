-- Testing helper.
-- Shows whether the test user exists and whether email confirmation is set.

select
  id,
  email,
  created_at,
  email_confirmed_at,
  confirmed_at,
  last_sign_in_at,
  aud,
  role
from auth.users
where lower(email) = lower('c_b_9046@hotmail.com');
