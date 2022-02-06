import { notFound } from "../app/routes";

var Mustache = require("mustache");

let routeList = [];
let currentRoute = {};
let currentController = {};

export default class SimpleJsMvc {
  constructor(routes) {
    this.viewMap = {};
    routeList = routes;
    window["SimpleJsMvc"] = this;
    return window["SimpleJsMvc"];
  }

  init() {
    let selfAppEngine = this;

    window.onpopstate = function (event) {
      selfAppEngine.routeLink(null, window.location.pathname, false, true);
    };

    window.onload = function () {
      selfAppEngine.bootApp();
    };
  }

  bootApp() {
    this.routeLink(null, window.location.pathname, false, true);
  }

  matchRoute(path, currentPath) {
    let found = true;
    let index = 0;
    if (path.split("/").length != currentPath.split("/").length) found = false;
    path.split("/").forEach((element) => {
      let allProps = element.match(/\{([^}]+)\}/g);
      if (!allProps) {
        if (element != currentPath.split("/")[index]) {
          found = false;
        }
      }
      index++;
    });
    return found;
  }

  getRouteProps(path, currentPath) {
    let data = {};
    let index = 0;
    path.split("/").forEach((element) => {
      let allProps = element.match(/\{([^}]+)\}/g);
      if (allProps) {
        data[allProps[0].replace("{", "").replace("}", "")] =
          currentPath.split("/")[index];
      }
      index++;
    });
    return data;
  }

  static uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  static gotoURL(route) {
    setTimeout(() => {
      window["SimpleJsMvc"].routeLink(null, route, true, true);
    }, 10);
  }

  static bindFunction(callSign, callback) {
    window["_self"][callSign] = callback;
  }

  routeLink(event, arr, pushState = true, fromSystem = false) {
    console.log(arr);

    if (event != null) event.preventDefault();
    if (fromSystem || window.location.pathname != arr) {
      let found = false;
      routeList.forEach((element) => {
        if (this.matchRoute(element.path, arr)) {
          found = true;
          if (window["_self"]) {
            if (window["_self"].destroy) window["_self"].destroy();
          }
          if (pushState) {
            window.history.pushState(
              { page: SimpleJsMvc.uuidv4() },
              SimpleJsMvc.uuidv4(),
              arr
            );
          }

          let data = this.getRouteProps(element.path, arr);
          let name = element.controller.toString();
          let reg = /function ([^\(]*)/;
          window["_self"] = new element.controller(data);

          currentRoute = element;
          currentController = window["_self"];
          if (currentController.componentLoaded)
            currentController.componentLoaded();
          document.getElementById("application").innerHTML = Mustache.render(
            currentController.view(),
            currentController.data,
            currentController.partials ? currentController.partials : {}
          );
          if (currentController.onInit) currentController.onInit();
          if (currentRoute.title) document.title = currentRoute.title;
        }
      });
      if (!found) {
        notFound();
      }
    }
  }

  static setGlobalState(key, value) {
    if (window["globalState"]) {
      window["globalState"][key] = value;
    } else {
      window["globalState"] = {};
      window["globalState"][key] = value;
    }
  }

  static getGlobalState(key) {
    if (window["globalState"]) {
      return window["globalState"][key];
    } else {
      return undefined;
    }
  }

  static reRenderComponent(id, content) {
    document.getElementById(id).innerHTML = content;
  }

  static changeTitle(title = "") {
    document.title = title;
  }

  static renderView() {
    document.getElementById("application").innerHTML = Mustache.render(
      currentController.view(),
      currentController.data,
      currentController.partials ? currentController.partials : {}
    );
  }

  static renderComponent(data, component) {
    let componentInstance = new component(data);
    return Mustache.render(
      componentInstance.view(),
      componentInstance.data,
      componentInstance.partials ? componentInstance.partials : {}
    );
  }

  static getCurrentPath() {
    return window.location.pathname;
  }
}
