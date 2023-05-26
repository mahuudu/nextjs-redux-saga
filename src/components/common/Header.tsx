"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Search from "./search";
import { useAppDispatch, useAppSelector } from "@root/src/redux/hooks/hooks";
import { cartAction } from "@root/src/redux/ducks/cart/cartDuck";
import { cartList } from "@root/src/redux/ducks/cart/cartDuck";
import { userAction } from "@root/src/redux/ducks/user/userDuck";
import { useSession, signIn, signOut  } from "next-auth/react";

const Header = () => {
  const { data , status  } = useSession();
  const cart = useAppSelector(cartList);
  const sessionData: any | null | undefined = data;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cartAction.initCart());
    dispatch(userAction.getUserInfo());
  }, [dispatch]);


  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const handldeLogout = () => {
    dispatch(userAction.logout());
    signOut();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <header className="bg-white py-2 border-b">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="flex-shrink-0 mr-5">
            <Link href="/">
              <img
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                height="40"
                width="120"
                alt="BuyItNow"
              />
            </Link>
          </div>
          <Search />

          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/cart"
              className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
            >
              <i className="text-gray-400 w-5 fa fa-shopping-cart"></i>
              <span className="hidden lg:inline ml-1">
                Cart (<b>{cartItems ? cartItems?.length : 0}</b>)
              </span>
            </Link>
            {status !== "authenticated" ? (
              <Link
                href="/login"
                className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
              >
                <i className="text-gray-400 w-5 fa fa-user"></i>
                <span className="hidden lg:inline ml-1">Sign in</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={handldeLogout}
                  className="px-3 py-2 inline-block text-center text-gray-700 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 hover:border-gray-300"
                >
                  <span className=" ml-1">Logout</span>
                </button>
                <Link href="/me">
                  <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer">
                    {/* <img className="w-10 h-10 rounded-full" src="#" /> */}
                    <div className="space-y-1 font-medium">
                      <p>
                        {sessionData?.user?.user?.displayName}
                        <time className="block text-sm text-gray-500 dark:text-gray-400">
                          {sessionData?.user?.user?.email}
                        </time>
                      </p>
                    </div>
                  </div>
                </Link>
              </>
            )}
          </div>

          <div className="lg:hidden ml-2">
            <button
              type="button"
              className="bg-white p-3 inline-flex items-center rounded-md text-black hover:bg-gray-200 hover:text-gray-800 border border-transparent"
            >
              <span className="sr-only">Open menu</span>
              <i className="fa fa-bars fa-lg"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
