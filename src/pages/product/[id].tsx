import ProductDetails from "@root/src/components/features/products/ProductDetails";
import * as React from "react";
import { productAPI } from "@root/src/api";
import path from "path";

export interface IProductDetailProps {}

export function ProductDetail({ data }: any) {
  return (
    <div>
      <ProductDetails product={data?.Products} />
    </div>
  );
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const id = params.id;
  try {
    const res = await productAPI.getById(id);
    const data = res;
    return { props: { data } , revalidate: 60, };
  } catch (error) {
    console.log("error at product [id] ", error);
    return { props: { data: null } };
  }
}

export async function getStaticPaths() {
  const data = await productAPI.getAll();

  const paths = data?.Products.map((item: any) => ({
    params: { id: item._id.toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

ProductDetail.Layout = "Main";
export default ProductDetail;
