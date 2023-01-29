import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import Slider from "../../../components/Slider";
import Stores from "../../../components/Stores";
import {
  Category,
  Stores as Store,
  Types,
  User,
  UserBody,
} from "../../../typings";
import { fetchStores } from "../../../utils/fetchStores";
import Header from "../../../components/Header";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchUsers } from "../../../utils/fetchUsers";
import { sanityClient } from "../../../sanity";

interface Props {
  stores: Store[];
  users: User[];
}

const Home = ({ stores, users }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isNewUser, setIsNewUser] = useState(false);
  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  const [town, setTown] = useState("");
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
      setInput(session?.user?.name!);
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

  const userss = users.filter((user) => user.name == session?.user?.name);
  const addAddress = async () => {
    try {
      const postInfo: UserBody = {
        id: userss[0]._id,
        name: input,
        address: address,
        town: town,
      };
      const result = await fetch(`/api/addBilling`, {
        body: JSON.stringify(postInfo),
        method: "POST",
      });
      const json = await result.json();
      console.log(json);
      return json;
    } catch (err) {
      console.error(err);
    }
  };

  const handlesubmit = () => {
    addAddress();
    router.push("/checkout/payment/payondelivery");
  };
  return (
    <div>
      <Head>
        <title>Retio - Ecommerce</title>
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
        <div className="p-5    flex flex-col items-center ">
          <h1 className="text-3xl font-[450]">Confirm Your Info</h1>
          <div className="flex flex-col space-y-7 items-center">
            <div className="w-96 mx-auto ">
              <p className="mx-2 font-[500]">Name</p>
              <input
                value={input}
                disabled
                className="outline-none my-2 w-full border border-Retio-primary focus:border-Retio-secondary transition-all duration-200 focus:scale-105 px-2 py-1 rounded-lg text-Retio-primary"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
            </div>
            <div className="w-96 mx-auto">
              <p className="mx-2 font-[500]">Address</p>
              <textarea
                value={address}
                rows={3}
                placeholder="Flat, house.no, street, towm, city"
                className="outline-none my-2 w-full border border-Retio-primary focus:border-Retio-secondary transition-all duration-200 focus:scale-105 px-2 py-1 rounded-lg text-Retio-primary"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="w-96 mx-auto">
              <p className="mx-2 font-[500]">City</p>
              <input
                value={town}
                placeholder="E.g mumbai"
                className="outline-none my-2 w-full border border-Retio-primary focus:border-Retio-secondary transition-all duration-200 focus:scale-105 px-2 py-1 rounded-lg text-Retio-primary"
                onChange={(e) => {
                  setTown(e.target.value);
                }}
              />
            </div>
            <div
              onClick={handlesubmit}
              className="my-2 bg-Retio-secondary p-5  flex hover:cursor-pointer hover:bg-Retio-secondary/90 transition-all duration-150 justify-center rounded-lg text-white w-full"
            >
              <p>Use This Info</p>
            </div>
          </div>
        </div>
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
