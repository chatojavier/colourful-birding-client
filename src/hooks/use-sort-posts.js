const { useState, useEffect } = require('react');

const useSortPosts = (posts, sortBy) => {
  const [postsList, setPostsList] = useState(posts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    switch (sortBy) {
      case 'name': {
        const postsUpdated = [...posts].sort((a, b) => {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        });
        setPostsList(postsUpdated);
        break;
      }
      case 'price': {
        const postsUpdated = [...posts].sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        setPostsList(postsUpdated);
        break;
      }
      case 'programedDates': {
        const postsUpdated = [...posts].sort((a, b) => {
          const aFrom = new Date(a.programedDates.from);
          const bFrom = new Date(b.programedDates.from);
          if (aFrom < bFrom) {
            return -1;
          }
          if (aFrom > bFrom) {
            return 1;
          }
          return 0;
        });
        setPostsList(postsUpdated);
        break;
      }
    }
    setLoading(false);
  }, []);

  return [postsList, loading];
};

export default useSortPosts;
