import SimpleJsMvc from "../engine/SimpleJsMvc";
import ContactsPageController from "./controllers/ContactsPageController";
import HomePage from "./controllers/HomePageController";
import { NotFoundController } from "./controllers/NotFoundController";

const routes = () => {
  return [
    {
      path: "/",
      controller: HomePage,
      title: "Home | Js SPA MVC Framework",
    },
    {
      path: "/contacts/{name}",
      controller: ContactsPageController,
      title: "Contacts | Js SPA MVC Framework",
    },
    {
      path: "/404",
      controller: NotFoundController,
      title: "404 - Not Found",
    },
  ];
};

export const notFound = () => {
  SimpleJsMvc.gotoURL("/404");
};

export default routes;
