import { GetServerSideProps, GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../components/Header";
import { Category, Stores, Types } from "../typings";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchStores } from "../utils/fetchStores";
import { fetchTypes } from "../utils/fetchTypes";
import dynamic from "next/dynamic";
import SearchBar from "../components/SearchBar";
interface Props {
  stores: Stores[];
  category: Category[];
}

function search({ stores, category }: Props) {
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
          store.category.some((cat) =>
            cat.title.toLowerCase().includes(searchQuery)
          )
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
