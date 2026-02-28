export const categories = [
  {
    id: "1",
    name:"Casual",
    image: '/images/categories/category-casual.png',
    col: 'col-12 col-md-4',
  },
  {
    id: "2",
    name:"Formal",
    image: '/images/categories/category-formal.png',
    col: 'col-12 col-md-8',
  },
  {
    id: "3",
    name:"Party",
    image: '/images/categories/category-party.png',
    col: 'col-12 col-md-8',
  },
  {
    id: "4",
    name:"Gym",
    image: '/images/categories/category-gym.png',
    col: 'col-12 col-md-4',
  },
];

export const getCategoryById = (id) => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      const category = categories.find(cat => cat.id === id);

      if(!category) {
      reject(new Error("Category not found"));
     } else {
      resolve(category);
     }
    }, 1000)
  });
};
