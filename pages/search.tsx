import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../components/Header";
import { Category, Stores, Types } from "../typings";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchStores } from "../utils/fetchStores";
import { fetchTypes } from "../utils/fetchTypes";
import dynamic from "next/dynamic";
import SearchBar from "../components/SearchBar";
import { useRouter } from "next/router";
interface Props {
  stores: Stores[];
  category: Category[];
}

function search({ stores, category }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStores, setFilteredStores] = useState(stores);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);

    if (searchQuery.length >= 3) {
      const filteredStores = stores.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery) ||
          store.name.includes(searchQuery) ||
          store.category.some((cat) =>
            cat.title.toLowerCase().includes(searchQuery)
          ) ||
          store.category.some((cat) => cat.title.includes(searchQuery))
      );
      setFilteredStores(filteredStores);
    } else {
      setFilteredStores(stores);
    }
  };

  return (
    <div>
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
      <SearchBar
        category={category}
        stores={filteredStores}
        onSearchInputChange={handleSearchInputChange}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default search;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const stores = await fetchStores();
  const category = await fetchCategory();

  return {
    props: {
      stores,
      category,
    },
  };
};
