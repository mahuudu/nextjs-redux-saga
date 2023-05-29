// components/common/MainLayout.tsx
import React, { PropsWithChildren } from "react";
import Header from "../common/Header";

const MainLayout = ({ children }: PropsWithChildren,) => {
  return (
    <>
        {/* <Header></Header> */}
        <main>{children}</main>
    </>
  );
};
export default MainLayout;
