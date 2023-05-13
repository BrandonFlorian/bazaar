export type FormValues = {
  email: string;
  username: string;
  password: string;
  terms: boolean;
};

export type FormProps = {
  type: string;
  setType: (type: "login" | "register" | "confirm") => void;
};
