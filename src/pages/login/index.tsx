"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { userAction } from "@root/src/redux/ducks/user/userDuck";
import { useAppSelector } from "@root/src/redux/hooks/hooks";
import { signIn, signOut, getProviders } from "next-auth/react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@root/src/components/common/Form/Input";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const dispatch = useDispatch();
  const error = useAppSelector((state) => state.user.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const params = useSearchParams();

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const submitHandler = async (data: FormData) => {
    // dispatch(userAction.loginStart({ email, password }));
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    
    if (result?.error) {
      toast.error(result?.error);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <FormProvider {...methods}>
      <div
        style={{ maxWidth: "480px" }}
        className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
      >
        <ToastContainer />
        <form onSubmit={handleSubmit(submitHandler)}>
          <h2 className="mb-5 text-2xl font-semibold">Login</h2>
          <Input label="Email" name="email" />
          <Input label="Password" name="password" />
          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Login
          </button>

          <hr className="mt-4" />

          <p className="text-center mt-5">
            Do not have an account?{" "}
            <Link href="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};

Login.Layout = "Main";
export default Login;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
