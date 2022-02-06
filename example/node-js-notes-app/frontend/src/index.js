import SimpleJsMvc from "./engine/SimpleJsMvc";
import routes from "./app/routes";
import "./style.css";

new SimpleJsMvc(routes()).init();
