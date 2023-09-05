CREATE OR REPLACE FUNCTION create_new_order(user_id UUID, items JSON)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
    new_order_id UUID;
    item JSONB;
BEGIN
    -- Create a new order
    INSERT INTO orders (user_id, order_status)
    VALUES (user_id::uuid, 'pending') 
    RETURNING id INTO new_order_id;

    -- Iterate over each item in the items JSON array, casting it to JSONB
    FOR item IN SELECT * FROM jsonb_array_elements(items::jsonb)
    LOOP
        -- Insert each item into order_items
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES (new_order_id, 
                (item->>'product_id')::uuid, 
                (item->>'quantity')::int, 
                (item->>'price')::numeric);
    END LOOP;

    -- Return the new order ID
    RETURN new_order_id;
END; 
$$;
