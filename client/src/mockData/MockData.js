const categories = [
  {
    "id": "b7a1e2a4-4e91-4c4a-9b3f-0e7b9a8f0c01",
    "name": "Shop",
    "slug": "shop",
    "parentId": null
  },

  {
    "id": "3d5b8c72-9a94-4baf-9e7c-9c61b9b22c11",
    "name": "Men",
    "slug": "men",
    "parentId": "b7a1e2a4-4e91-4c4a-9b3f-0e7b9a8f0c01"
  },
  {
    "id": "9c6f1b18-2b6f-4fd7-bf88-71d9c71caa22",
    "name": "Women",
    "slug": "women",
    "parentId": "b7a1e2a4-4e91-4c4a-9b3f-0e7b9a8f0c01"
  },

  {
    "id": "5a1c9a73-bf7e-4a6a-9c43-9f1f2d4cbb33",
    "name": "Topwear",
    "slug": "topwear",
    "parentId": "3d5b8c72-9a94-4baf-9e7c-9c61b9b22c11"
  },
  {
    "id": "f3c6a1e2-3e9b-4a6d-8f91-8f2c3a2bdd44",
    "name": "Bottomwear",
    "slug": "bottomwear",
    "parentId": "3d5b8c72-9a94-4baf-9e7c-9c61b9b22c11"
  },

  {
    "id": "c2a6b7e1-8d74-4e9c-91a5-3a7d9e9cee55",
    "name": "T-Shirts",
    "slug": "t-shirts",
    "parentId": "5a1c9a73-bf7e-4a6a-9c43-9f1f2d4cbb33"
  },
  {
    "id": "e91b6c3a-9d6f-4a42-bf71-6c2d7c1eea66",
    "name": "Shirts",
    "slug": "shirts",
    "parentId": "5a1c9a73-bf7e-4a6a-9c43-9f1f2d4cbb33"
  },

  {
    "id": "6d7f1a9e-0c6a-4a7a-8c11-7d9e4f2cbb77",
    "name": "Topwear",
    "slug": "topwear",
    "parentId": "9c6f1b18-2b6f-4fd7-bf88-71d9c71caa22"
  },
  {
    "id": "0a3f9d6c-2b6e-4a7c-b7e1-9d6c1b2eaa88",
    "name": "Tops & T-Shirts",
    "slug": "tops-tshirts",
    "parentId": "6d7f1a9e-0c6a-4a7a-8c11-7d9e4f2cbb77"
  }
]

const products = [
  {
    "id": "7b2a6c4e-3e5a-4c91-b8a7-2f9c6d1a0011",
    "name": "Oversized Black T-Shirt",
    "price": 799,
    "rating": 4.5,
    "categoryId": "c2a6b7e1-8d74-4e9c-91a5-3a7d9e9cee55",
    "image": "/images/products/black-tshirt.jpg",
    "images": [
      "/images/products/black-tshirt-1.jpg",
      "/images/products/black-tshirt-2.jpg",
      "/images/products/black-tshirt-3.jpg"
    ],
    "brand": "Veetee",
    "sizes": ["S", "M", "L", "XL"],
    "colors": ["Black"],
    "stock": 25
  },
  {
    "id": "9a1c7d2e-4f8a-4c9a-8d1e-7c2b9e0a0022",
    "name": "White Printed T-Shirt",
    "price": 699,
    "rating": 0,
    "categoryId": "c2a6b7e1-8d74-4e9c-91a5-3a7d9e9cee55",
    "image": "/images/products/white-tshirt.jpg",
    "images": [],
    "brand": "Veetee",
    "sizes": ["M", "L", "XL"],
    "colors": ["White"],
    "stock": 40
  },
  {
    "id": "4e9a6c1b-8d7a-4f2a-9c11-2b6e7d9a0033",
    "name": "Men Slim Fit Shirt",
    "price": 1299,
    "rating": 4,
    "categoryId": "e91b6c3a-9d6f-4a42-bf71-6c2d7c1eea66",
    "image": "/images/products/shirt.jpg",
    "brand": "Veetee",
    "sizes": ["M", "L", "XL"],
    "colors": ["Blue", "White"],
    "stock": 15
  }
]

export {categories, products}