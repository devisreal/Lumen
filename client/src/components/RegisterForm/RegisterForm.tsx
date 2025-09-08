import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { registerUser } from "../../api/auth";
import { registerFormSchema } from "../../lib/formSchemas";
import { RegisterPayload } from "../../types/auth";

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerFormSchema),
  });
  const navigate = useNavigate();

  const handleRegister = async (formValues: RegisterPayload) => {
    try {
      const data = await registerUser(formValues);
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
    <form onSubmit={handleSubmit(handleRegister)} method="POST">
      <div className="grid gap-y-4">
        <TextInput
          {...register("username")}
          classNames={{
            label: `${errors.username?.message && "text-red-500"}`,
          }}
          type="text"
          radius="md"
          label="Username"
          withAsterisk
          withErrorStyles
          description={`${errors.username?.message ? "" : "Enter a preferred username"}`}
          placeholder="johnsmith"
          inputWrapperOrder={["label", "input", "description", "error"]}
          autoComplete="name"
          error={errors.username?.message}
        />

        <TextInput
          {...register("email")}
          classNames={{
            label: `${errors.email?.message && "text-red-500"}`,
          }}
          type="email"
          radius="md"
          label="Email Address"
          withAsterisk
          withErrorStyles
          description={`${errors.email?.message ? "" : "Enter your email adress"}`}
          placeholder="john@company"
          inputWrapperOrder={["label", "input", "description", "error"]}
          autoComplete="email"
          error={errors.email?.message}
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

        <PasswordInput
          {...register("confirm_password")}
          classNames={{
            label: `${errors.confirm_password?.message && "text-red-500"}`,
          }}
          radius="md"
          type="password"
          label="Confirm Password"
          withAsterisk
          withErrorStyles
          description={`${errors.confirm_password?.message ? "" : "Enter your password again"}`}
          placeholder="••••••••••"
          inputWrapperOrder={["label", "input", "description", "error"]}
          autoComplete="off"
          error={errors.confirm_password?.message}
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

export default RegisterForm;
