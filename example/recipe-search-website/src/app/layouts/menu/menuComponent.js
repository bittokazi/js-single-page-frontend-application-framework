import SimpleJsMvc from "./../../../engine/SimpleJsMvc";

const isActive = path => {
  if (path.split("/").length == 3) {
    if (path.split("/")[2] == window.location.pathname.split("/")[2]) {
      return `active`;
    }
  }
  if (path.split("/").length == 4) {
    if (
      path.split("/")[2] == window.location.pathname.split("/")[2] &&
      path.split("/")[3] == window.location.pathname.split("/")[3]
    ) {
      return `active`;
    }
  }
  if (path == window.location.pathname) {
    return `active`;
  } else {
    return ``;
  }
};

const isActiveSub = path => {
  if (path == window.location.pathname) {
    return `active`;
  } else {
    return ``;
  }
};

export default function menuComponent(data) {
  let menuItems = [
    {
      name: "Dashboard",
      path: "dashboard",
      icon: "glyphicon glyphicon-fire fa-fw"
    },
    {
      name: "Profile",
      path: "profile",
      icon: "ti-user fa-fw"
    },
    {
      name: "Notes",
      path: "",
      icon: "ti-layout fa-fw"
    },
    {
      name: "Add Note",
      path: "",
      icon: "ti-face-smile fa-fw"
    },
    {
      name: "Logout",
      path: "login",
      icon: "ti-files fa-fw"
    }
  ];
  //   let isActive = path => {
  //     if (SimpleJsMvc.getCurrentPath() == "/" + path) {
  //       return "active";
  //     } else {
  //       return "";
  //     }
  //   };
  const submenu = menu => {
    if (menu.sub) {
      return `
              <ul class="nav nav-second-level collapse">
                  ${menu.sub
                    .map(menu1 =>
                      menu1.show
                        ? `
                      <li>
                          <a href="${
                            menu1.path
                          }" onclick="SimpleJsMvc.routeLink(event, '${
                            menu1.path
                          }')" class="waves-effect ${isActive(menu1.path)}">
                              <i class="${menu1.icon}"></i> ${menu1.title}
                          </a>
                          </li>
                  `
                        : ``
                    )
                    .join("")}
              </ul>
          `;
    }
    return ``;
  };
  return {
    view: () => {
      return `
                ${data
                  .map(
                    menu => `
                    <li>
                        <a href="${
                          menu.path
                        }" onclick="SimpleJsMvc.routeLink(event, '${
                      menu.path
                    }')" class="waves-effect ${isActive(menu.path)}">
                            <i class="${menu.icon}"></i> ${menu.title}
                        </a>
                        ${submenu(menu)}
                    </li>
                `
                  )
                  .join("")}
            `;
    }
  };
}
