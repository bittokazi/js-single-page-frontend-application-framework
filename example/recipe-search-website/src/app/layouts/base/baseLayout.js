import SimpleJsMvc from "./../../../engine/SimpleJsMvc";
import header from "./header";
import footer from "./footer";

import "./../../../assets/css/bootstrap.min.css";
import "./../../../assets/css/font-awesome.min.css";

export default function baseLayout(data, content) {
  SimpleJsMvc.setGlobalState("load", true);
  return {
    view: () => {
      return `
        <div class="container">
          ${SimpleJsMvc.renderComponent(data, header)}
          ${content}
          ${SimpleJsMvc.renderComponent(data, footer)}
        </div>
            `;
    }
  };
}
