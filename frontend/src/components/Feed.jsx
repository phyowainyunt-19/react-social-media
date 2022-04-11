import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // for param

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  /**
   * fetch all posts or a single post or specific category
   * use sanity querying language from sanity db
   */
  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]); // to be called anytime that our category changes

  if (loading)
    return <Spinner message="We are adding news ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available!</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
