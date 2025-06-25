const products = [
  { name: "Smartphone", price: 19999, rating: 4.5, category: "electronics", image: "https://c8.alamy.com/comp/DH80YG/iphone-5-smartphone-DH80YG.jpg"},
  { name: "Bluetooth Headphones", price: 2999, rating: 4.2, category: "electronics",image: "https://m.media-amazon.com/images/I/71do4UiSu-L._SL1500_.jpg" },
  { name: "T-Shirt", price: 499, rating: 4.0, category: "fashion",image:"https://cdn1.bambinifashion.com/img/p/1/8/3/9/8/2/183982--product.jpg" },
  { name: "Jeans", price: 999, rating: 3.8, category: "fashion",image: "https://pngimg.com/uploads/jeans/jeans_PNG5766.png" },
  { name: "Novel", price: 299, rating: 4.7, category: "books",image: "https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781668016138/holly-9781668016138_hr.jpg" },
  { name: "Notebook", price: 149, rating: 4.3, category: "books",image: "https://pngimg.com/uploads/notebook/notebook_PNG19225.png" },
];

const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("product-list");

function renderProducts(data) {
  productList.innerHTML = "";
  document.getElementById("product-count").textContent = `Showing ${data.length} product(s)`;

  if (data.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>⭐ ${product.rating}</p>
    `;

    productList.appendChild(card);
  });
}


function applyFilters() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  const sortOption = sortFilter.value;
  const searchQuery = searchInput.value.trim().toLowerCase();

  // Save filter values to localStorage
  localStorage.setItem("category", selectedCategory);
  localStorage.setItem("sort", sortOption);
  localStorage.setItem("search", searchQuery);

  // Filter by category
  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  // Filter by search
  if (searchQuery !== "") {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery));
  }

  // Sort
  switch (sortOption) {
    case "priceLow":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceHigh":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "nameAZ":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  renderProducts(filtered);
}

// Restore last filters from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const savedCategory = localStorage.getItem("category") || "all";
  const savedSort = localStorage.getItem("sort") || "default";
  const savedSearch = localStorage.getItem("search") || "";

  categoryFilter.value = savedCategory;
  sortFilter.value = savedSort;
  searchInput.value = savedSearch;

  applyFilters();
});

categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
