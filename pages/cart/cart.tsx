import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
const Home = () => {
  return (
    <div>
      <Head>
        <title>Retio - Ecommerce</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* @ts-ignore */}
      <Header />
      <Cart />
    </div>
  );
};

export default Home;
