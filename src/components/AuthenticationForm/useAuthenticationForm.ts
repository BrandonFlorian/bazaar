"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormValues } from "./AuthenticationForm.types";
import { supabase } from "@/utils/supabaseClient";

export const useAuthenticationForm = () => {
  const router = useRouter();
  const [type, setType] = useState<"login" | "register" | "confirm">("login");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (values: FormValues, type: string) => {
    if (type === "login") {
      return await handleLogin(values);
    }
    if (type === "register") {
      return await handleRegister(values);
    }
    if (type === "confirm") {
      return await handleConfirm(values);
    }
  };

  const handleRegister = async (values: FormValues) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) setErrorMessage(error.message);
      else {
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  const handleConfirm = async (values: FormValues) => {
    try {
      //todo
      setLoading(true);
      return setErrorMessage("Invalid confirmation code");
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  const handleLogin = async (values: FormValues) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) setErrorMessage(error.message);
      else {
        setLoading(false);
        return router.push("/");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };
  return {
    handleSubmit,
    errorMessage,
    loading,
    type,
    setType,
  };
};

export default useAuthenticationForm;
