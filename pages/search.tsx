import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../components/Header";
import { Category, Stores, Types } from "../typings";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchStores } from "../utils/fetchStores";
import { fetchTypes } from "../utils/fetchTypes";
import dynamic from "next/dynamic";
import SearchBar from "../components/SearchBar";
interface Props {
  types: Types[];
  stores: Stores[];
  category: Category[];
}

function search({ types, stores, category }: Props) {
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
export const getStaticProps: GetStaticProps<Props> = async () => {
  const stores: Stores[] = await fetchStores();
  const category: Category[] = await fetchCategory();
  const types: Types[] = await fetchTypes();

  return {
    props: {
      stores,
      category,
      types,
    },
  };
};
