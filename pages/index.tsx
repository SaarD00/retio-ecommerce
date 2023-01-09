import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Slider from "../components/Slider";
import Stores from "../components/Stores";
import { Category, Stores as Store, Types } from "../typings";
import { fetchStores } from "../utils/fetchStores";
import Header from "../components/Header";
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
      <Header />

      <Slider />
      <Stores stores={stores} />
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const stores = await fetchStores();

  return {
    props: {
      stores,
    },
  };
};
