import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Cart from "../../components/Cart";
import Header from "../../components/Header";
import { Items, Order, User } from "../../typings";
import { fetchItems } from "../../utils/fetchItems";
import { fetchOrders } from "../../utils/fetchOrder";
import { fetchUsers } from "../../utils/fetchUsers";

interface Props {
  items: Items[];
  user: User[];
  orders: Order[];
}
const Home = ({
  items: itemsProps,
  user: userProps,
  orders: orderProps,
}: Props) => {
  const [items, SetItems] = useState<Items[]>(itemsProps);
  const [orders, SetOrders] = useState<Order[]>(orderProps);
  const [user, SetUser] = useState<User[]>(userProps);
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
      <Cart orders={orders} user={user} setItems={SetItems} />
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const items = await fetchItems();
  const user = await fetchUsers();
  const orders = await fetchOrders();
  return {
    props: {
      items,
      user,
      orders,
    },
  };
};
