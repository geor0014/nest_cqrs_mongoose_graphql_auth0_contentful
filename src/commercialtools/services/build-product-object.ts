export const buildResponseObjectFromProduct = (response) => {
  const {
    data: { total, count, results },
  } = response;

  return {
    total,
    count,
    results: results.map((product) => {
      const { id, masterData, key } = product;

      return {
        id,
        key,
        name: masterData.current.name,
        slug: masterData.current.slug,
      };
    }),
  };
};
