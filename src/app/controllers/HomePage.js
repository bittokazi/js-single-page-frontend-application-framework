import SimpleJsMvc from "./../../engine/SimpleJsMvc";

import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/font-awesome.min.css";

export default function HomePage(data) {
  return {
    view: () => {
      return `
      <div class="container"> 
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="/" onclick="SimpleJsMvc.routeLink(event, '/')">JS Single Page Application Framework</a>
        </nav>
      
        <div class="container">
            <div class="row search-container">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <h2>Hello world!!!!!!!!</h2>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
      </div>
      `;
    }
  };
}
