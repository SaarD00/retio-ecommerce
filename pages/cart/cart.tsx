import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { Items, User } from "../../typings";
import { fetchItems } from "../../utils/fetchItems";
import { fetchUsers } from "../../utils/fetchUsers";

interface Props {
  items: Items[];
  user: User;
}
const Home = ({ items: itemsProps, user: userProps }: Props) => {
  const [items, SetItems] = useState<Items[]>(itemsProps);
  const [user, SetUser] = useState<User>(userProps);
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
      <Cart user={user} setItems={SetItems} />
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = await fetchItems();
  const user = await fetchUsers();
  return {
    props: {
      items,
      user,
    },
  };
};
