"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormValues } from "./AuthenticationForm.types";
import { appPaths } from "../../../public/config/constants";
import { useSupabase } from "@/app/supabase-provider";

export const useAuthenticationForm = () => {
  const router = useRouter();
  const [type, setType] = useState<"login" | "register" | "confirm">("login");
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { supabase } = useSupabase();

  const handleSubmit = async (values: FormValues, type: string) => {
    if (type === "login") {
      return await handleLogin(values);
    }
    if (type === "register") {
      return await handleRegister(values);
    }
  };

  const handleRegister = async (values: FormValues) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });
      if (error) setErrorMessage(error.message);
      else {
        setLoading(false);
        setType("confirm");
      }
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error);
    }
  };

  const handleLogin = async (values: FormValues) => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) setErrorMessage(error.message);
      else {
        setLoading(false);
        return router.push(appPaths.home);
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
