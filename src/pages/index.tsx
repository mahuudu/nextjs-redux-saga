import React, { useEffect, useState } from "react";
import { MyPage } from "@components/common/types";
import ListProducts from "@components/features/products/ListProducts";
import { productAPI } from "../api";
import queryString from "query-string";
import Search from "../components/common/search";
// import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { selectcount, countAction } from "../redux/ducks/count/countDuck";
import { userAction } from "../redux/ducks/user/userDuck";
import axiosClient from "../api/config";


const HomePage: MyPage = ({ data }: any) => {
  // const dispatch = useAppDispatch();


  useEffect(() => {
    (async () => {
      const a = await productAPI.getAll()
    })();

  }, [])


  const handleClick = () => {

  }


  return (
    <div className="container">
      <div>
        <ListProducts
          products={data?.Products.products || []}
          filteredProductsCount={data?.Products.filteredProductsCount || 0}
        ></ListProducts>
      </div>
    </div>
  );
};

export const getServerSideProps = async (content: any) => {

  const { keyword } = content.query;
  try {

    const urlParams = {
      keyword: keyword,
      page: content.query.page,
      category: content.query.category,
      "price[gte]": content.query.min,
      "price[lte]": content.query.max,
      "ratings[gte]": content.query.ratings,
    };

    if (!keyword) {
      urlParams.keyword = ''
    }

    const res = await productAPI.getSearch(urlParams);
    const data = res;
    return { props: { data, error: null } };

  } catch (error) {
    console.log("errrrrrrrrrrr", error);
    return { props: { data: null } };
  }
};

export default HomePage;
HomePage.Layout = "Main";
// HomePage.Layout = "OtherLayout"; -> error Type '"OtherLayout"' is not assignable to type '"Main" | "Admin" | undefined'.
