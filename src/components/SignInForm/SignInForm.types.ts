export type FormValues = {
  email: string;
  username: string;
  password: string;
};
export type FormProps = {
  type: string;
  setType: (type: "login" | "register" | "confirm") => void;
};
