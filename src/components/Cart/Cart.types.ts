export type CartProps = {
  title: string;
  position: "bottom" | "left" | "right" | "top";
  open: boolean;
  setOpen: (value: boolean) => void;
  buttonText: string;
};

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
