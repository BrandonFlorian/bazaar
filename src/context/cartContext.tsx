import { showNotification } from "@mantine/notifications";
import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "@/app/supabase-provider";
import { Session } from "@supabase/auth-helpers-nextjs";

export type Cart = {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => boolean;
  removeItem: (item_id: string) => void;
  clearCart: () => void;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const defaultCart: Cart = {
  items: [],
  total: 0,
  addItem: () => false,
  removeItem: () => {},
  clearCart: () => {},
};

const CartContext = createContext<Cart>(defaultCart);

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = (props: any) => {
  const [total, setTotal] = useState<number>(0);
  const [items, setItems] = useState<CartItem[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  const { supabase } = useSupabase();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        return;
      }
      setSession(data.session);
    };
    getSession();
  }, [supabase.auth]);

  useEffect(() => {
    if (items.length <= 0) {
      const localStorageCart = localStorage.getItem(
        session?.user.user_metadata.email
      );
      if (localStorageCart) {
        const cart = JSON.parse(localStorageCart);
        setItems(cart);
        const total = cart.reduce((acc: number, item: CartItem) => {
          return acc + (item.price ?? 0) * (item.quantity ?? 1);
        }, 0);
        setTotal(total);
      }
    }
  }, [items.length, session?.user.user_metadata.email]);

  const addItem = (item: CartItem): boolean => {
    try {
      const currentItems = items;

      //check if item already exists

      const itemExists = currentItems.find((i) => i.id === item.id);
      if (itemExists) {
        showNotification({
          title: "Item already exists",
          message: "Item already exists in the cart",
        });
        return false;
      }

      currentItems.push(item);
      localStorage.setItem(
        session?.user?.user_metadata.email,
        JSON.stringify(currentItems)
      );
      setItems(currentItems);
      setTotal((prev) => prev + (item.price ?? 0) * (item.quantity ?? 1));

      showNotification({
        title: "Item added",
        message: "Item added to the cart",
        color: "green",
      });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const removeItem = (item_id: string) => {
    try {
      localStorage.removeItem(session?.user?.user_metadata.email);
      const item = items.find((item) => item.id === item_id);
      const currentItems = items.filter((item) => item.id !== item_id);
      localStorage.setItem(
        session?.user?.user_metadata.email,
        JSON.stringify(currentItems)
      );
      setItems(currentItems);

      setTotal((prev) => prev - (item?.price ?? 0) * (item?.quantity ?? 1));
      showNotification({
        title: "Item removed",
        message: "Item removed from the cart",
        color: "red",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(session?.user?.user_metadata.email);
    setItems([]);
    setTotal(0);
  };

  const value = {
    addItem,
    items,
    total,
    removeItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};
