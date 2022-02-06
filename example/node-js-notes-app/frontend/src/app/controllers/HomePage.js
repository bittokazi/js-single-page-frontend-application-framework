import Home from "./../views/Home.ejs";

export default function HomePage(prop) {
  return {
    data: {
      name: "Bitto",
    },
    view: () => {
      return Home;
    },
  };
}
