LANGUAGE plpgsql
AS $$
begin
  insert into public.profile (id, username, email)
  values (NEW.id, NEW.raw_user_meta_data ->> 'username', NEW.email);
  return new;
end;
$$;
