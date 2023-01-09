import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Stores from "../components/Stores";
import { Category, Stores as Store, Types } from "../typings";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchStores } from "../utils/fetchStores";
import { fetchTypes } from "../utils/fetchTypes";

interface Props {
  stores: Store[];
}

const Home = ({ stores }: Props) => {
  return (
    <div>
      <Head>
        <title>Retio - Ecommerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Slider />
      <Stores stores={stores} />
    </div>
  );
};

export default Home;
export const getStaticProps: GetStaticProps<Props> = async () => {
  const stores: Store[] = await fetchStores();

  return {
    props: {
      stores,
    },
  };
};
