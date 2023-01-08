import { GetStaticProps } from "next";
import React, { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import { Category, Stores, Types } from "../typings";
import { fetchCategory } from "../utils/fetchCategory";
import { fetchStores } from "../utils/fetchStores";
import { fetchTypes } from "../utils/fetchTypes";

interface Props {
  types: Types[];
  stores: Stores[];
  category: Category[];
}

function search({ types, stores, category }: Props) {
  async function getCategory(input: string) {
    try {
      const response = await fetch(`https://api.openai.com/v1/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          query: input,
        }),
      });
      const data = await response.json();
      return data.category;
    } catch (error) {
      console.error(error);
    }
  }

  const [searchQuery, setSearchQuery] = useState("");

  const [filteredStores, setFilteredStores] = useState(stores);

  const handleSearchInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchQuery = event.target.value;
    setSearchQuery(searchQuery);

    if (searchQuery.length >= 3) {
      const category = await getCategory(searchQuery);
      console.log(category); // this will log the closest category to the input value
      const filteredStores = stores.filter(
        (store) =>
          store.name.includes(searchQuery) ||
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

    revalidate: 20,
  };
};
