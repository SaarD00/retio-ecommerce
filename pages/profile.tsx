import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Slider from "../components/Slider";
import Stores from "../components/Stores";
import { Category, Stores as Store, Types, User, UserBody } from "../typings";
import { fetchStores } from "../utils/fetchStores";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsers } from "../utils/fetchUsers";

interface Props {
  stores: Store[];
  users: User[];
}

const Home = ({ stores, users }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState(false);
  const postUser = async () => {
    const userInfo: UserBody = {
      name: session?.user?.name || "",
      email: session?.user?.name || "",
    };
    const result = await fetch(`/api/addUser`, {
      body: JSON.stringify(userInfo),
      method: "POST",
    });

    const json = await result.json();
    return json;
  };

  console.log(users.filter((user) => user.name === session?.user?.name));

  useEffect(() => {
    if (session) {
      const match = users.find((user) => user.name === session?.user?.name);
      if (!match) {
        setIsNewUser(true);
      }
    }
  }, [session]);

  useEffect(() => {
    if (isNewUser) {
      const createUser = async () => {
        postUser();
      };
      createUser();
    }
  }, [isNewUser]);

  return (
    <div>
      <Head>
        <title>Retio - Profile</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Easiest and Flexible way for purchasing retail products with less than a doorstep | Retio"
        />
        <meta
          property="og:image"
          content="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.4e47d276.png&w=256&q=100"
        />
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
        <div className="flex justify-center ">
          <p className=" text-2xl text-Retio-primary">
            Welcome,{" "}
            <span className="text-Retio-secondary">{session?.user?.name}</span>{" "}
          </p>
        </div>
        <h1 className="flex justify-center items-center p-5 text-3xl">
          Page currently in bulding!
        </h1>
      </div>
    </div>
  );
};

export default Home;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const stores = await fetchStores();
  const users = await fetchUsers();

  return {
    props: {
      stores,
      users,
    },
  };
};
