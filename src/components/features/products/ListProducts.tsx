"use client";

import React from "react";
import CustomPagination from "@components/common/CustomPagination";
import Filters from "@components/common/Filters";

import ProductItem from "./ProductItem";

const ListProducts = ({ products, filteredProductsCount , productsCount }: any) => {

  // const isEmpty = (lst) => {
  //   if(Array.isArray(lst) && lst.length > 0){

  //     return true
  //   }
  //   else(typeof(lst) === "string" && lst || lst === 'undefined'){
  //     return true 
  //   }
  //   return false;
  // }


  return (
    <section className="py-12">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />
          <main className="md:w-2/3 lg:w-3/4 px-3">
            {products.length > 0 ? (
              products?.map((product: any) => (
                <ProductItem key={product?.id+JSON.stringify( new Date().getUTCMilliseconds())} product={product} />
              ))
            ) : (
              <p> No data </p>
            )}
            {products.length > 0 && <CustomPagination
              resPerPage={products?.resPerPage}
              productsCount={filteredProductsCount}
            />}
          </main>
        </div>
      </div>
    </section>
  );
};

export default ListProducts;
