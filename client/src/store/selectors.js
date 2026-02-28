export const selectAvailableSizes = (state) => {
  const products = state.products.list;

  return new Set(
    products.flatMap(p => p.sizes || [])
  );
};