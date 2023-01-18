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
      {/* <Cart /> */}
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center p-5">
        <h1 className="text-3xl">Thanks, Your order has been placed</h1>
        <p className="p-2 text-lg">Heres your Invoice</p>
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Home;
