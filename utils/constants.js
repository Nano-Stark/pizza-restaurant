let BASE_URL;
if (process.env.NODE_ENV === "production") {
  // BASE_URL = "https://pizza-restuarant.netlify.app";
  BASE_URL = "https://pizza-restaurant-phi.vercel.app";
} else {
  BASE_URL = "http://localhost:3000";
}

export default BASE_URL;
