import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { LoginPayload, loginUser } from "../../api/auth";
import { loginFormSchema } from "../../lib/formSchemas";

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  const handleLogin = async (formValues: LoginPayload) => {
    try {
      const data = await loginUser(formValues);
      toast.success(data.message);
      reset();
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        console.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} method="POST">
      <div className="grid gap-y-4">
        <TextInput
          {...register("username")}
          classNames={{
            label: `${errors.username?.message && "text-red-500"}`,
          }}
          radius="md"
          label="Email address or Username"
          withAsterisk
          withErrorStyles
          description={`${errors.username?.message ? "" : "Enter your email or username"}`}
          placeholder="john@company"
          inputWrapperOrder={["label", "input", "description", "error"]}
          autoComplete="email"
          error={errors.username?.message}
        />

        <PasswordInput
          {...register("password")}
          classNames={{
            label: `${errors.password?.message && "text-red-500"}`,
          }}
          radius="md"
          type="password"
          label="Password"
          withAsterisk
          withErrorStyles
          description={`${errors.password?.message ? "" : "Enter your password"}`}
          placeholder="••••••••••"
          inputWrapperOrder={["label", "input", "description", "error"]}
          autoComplete="off"
          error={errors.password?.message}
        />

        <Button
          type="submit"
          color="butter-yellow.4"
          c="white"
          size="md"
          radius="md"
          classNames={{
            inner: "text-sm",
          }}
        >
          {isSubmitting ? (
            <Loader color="white" size="sm" type="dots" />
          ) : (
            "Sign in"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
