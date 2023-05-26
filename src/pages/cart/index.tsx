import Cart from "@root/src/components/features/cart/cart";
import * as React from "react";

export interface ICartPageProps {}

const CartPage = (props: ICartPageProps) => {
  return (
    <div>
      <Cart />
    </div>
  );
};
CartPage.Layout = "Main";
export default CartPage;
