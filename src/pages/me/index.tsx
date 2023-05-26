import Profile from "@root/src/components/features/auth/Profile";
import authMiddleware from "@root/src/middlewares/auth";
import * as React from "react";
import { NextPageContext } from 'next';

export interface IMeProps {}

const Me = (props: IMeProps) => {

  return (
    <div>
      <Profile />
    </div>
  );
};
Me.Layout = "Admin";

export default Me

export const getServerSideProps = async (context: any) => {
  // Apply the authMiddleware as middleware for the page
  await authMiddleware(context.req, context.res, () => {});

  // Any additional logic you want to perform before rendering the page

  return {
    props: {},
  };
};