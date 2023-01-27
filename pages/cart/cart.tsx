import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { Items } from "../../typings";
import { fetchItems } from "../../utils/fetchItems";

interface Props {
  items: Items[];
}
const Home = ({ items: itemsProps }: Props) => {
  const [items, SetItems] = useState<Items[]>(itemsProps);
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Retio - Ecommerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore */}
      <Header />
      <div className="max-w-7xl mx-auto w-full px-10 py-2">
        {"->"}{" "}
        <span
          onClick={() => {
            router.push("/");
          }}
        >
          {router.pathname}
        </span>
      </div>
      <Cart setItems={SetItems} />
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = await fetchItems();
  return {
    props: {
      items,
    },
  };
};
