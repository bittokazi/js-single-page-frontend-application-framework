import HomePage from "./controllers/HomePage";

const routes = () => {
  return [
    {
      path: "/",
      controller: HomePage,
      title: "JS Single Page Application Framework"
    }
  ];
};

export default routes;
