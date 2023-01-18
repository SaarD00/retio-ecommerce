import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
const Home = () => {
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
      <Cart />
    </div>
  );
};

export default Home;
