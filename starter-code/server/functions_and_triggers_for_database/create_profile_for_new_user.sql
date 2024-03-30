/*
-This is backup incase anything happens to the trigger or function on supabase so we know what worked.

-The functions written here are used in the app but the actual definition for the trigger and function that affects
the functionality of the app are on supabase!
*/

--Trigger for when a new user signs up. Trigger goes off after a new row is inserted into auth.users
create trigger new_user_trigger
    after insert on auth.users
    for each row execute function create_profile_for_new_user();

/*This is not a full Postsgresql function but is what is written in Database under Functions on supabase. 
The function definition is not needed in the supabase UI so I just need to include what the function does.
*/

BEGIN
    INSERT INTO PUBLIC."Users"("UserID", "Email")
    VALUES(NEW.id, NEW.email);
    RETURN NEW;
END;

--Trigger to drop the trigger above if needed.
drop trigger if exists create_profile_for_new_user on auth.users;