"use client";

import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@root/src/components/common/Form/Input";
import { useDispatch } from "react-redux";
import { userAction } from "@root/src/redux/ducks/user/userDuck";
import { useAppSelector } from "@root/src/redux/hooks/hooks";

interface FormData {
  displayName: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  displayName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Register = () => {
  const dispatch = useDispatch();
  const error = useAppSelector((state) => state.user.error);

  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormData) => {
    console.log("data;", data);

    dispatch(userAction.registerStart({ ...data }));
  };

  useEffect(() => {
    console.log("error", error);
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <FormProvider {...methods}>
      <ToastContainer />
      <div
        style={{ maxWidth: "480px" }}
        className="mt-10 mb-20 p-4 md:p-7 mx-auto rounded bg-white shadow-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-5 text-2xl font-semibold">Register Account</h2>
          <Input label="Name" name="displayName" />
          <Input label="Email" name="email" />
          <Input label="Password" name="password" />
          <button
            type="submit"
            className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          >
            Register
          </button>

          <hr className="mt-4" />
          <p className="text-center mt-5">
            Already have an account?
            <Link href="/login" className="text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </FormProvider>
  );
};
Register.Layout = "Main";
export default Register;
