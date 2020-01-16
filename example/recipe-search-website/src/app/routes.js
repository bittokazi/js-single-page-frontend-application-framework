import HomePage from "./controllers/HomePage";
import RecipeDetails from "./controllers/RecipeDetails";

const routes = () => {
  return [
    {
      path: "/",
      controller: HomePage,
      title: "Home - Recipe Search"
    },
    {
      path: "/recipe-details/{index}",
      controller: RecipeDetails,
      title: "Recipe Details"
    }
  ];
};

export default routes;
