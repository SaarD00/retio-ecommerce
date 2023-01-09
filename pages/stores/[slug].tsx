import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { sanityClient } from "../../sanity";
import { Category, Stores as Store, Types } from "../../typings";
import dynamic from "next/dynamic";

interface Props {
  store: Store;
}

function storePage({ store }: Props) {
  const StorePage = dynamic(() => import("../../components/StorePage"), {
    ssr: false,
  });
  return (
    <div>
      <StorePage store={store} />
    </div>
  );
}

export default storePage;

export const getStaticPaths = async () => {
  const query = `*[_type == "stores"] {
  _id,
  slug {
      current
  }
}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((store: Store) => ({
    params: {
      slug: store.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = ` *[_type == "stores" && slug.current == $slug][0] {
    ...,
    types[]->{
      ...,
    },
    category[]->{
    ...,
  }
  
  }`;

  const store = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!store) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      store,
    },
    revalidate: 60,
  };
};