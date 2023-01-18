import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Slider from "../components/Slider";
import Stores from "../components/Stores";
import { Category, Stores as Store, Types } from "../typings";
import { fetchStores } from "../utils/fetchStores";
import Header from "../components/Header";
import { useRouter } from "next/router";
interface Props {
  stores: Store[];
}

const Home = ({ stores }: Props) => {
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
