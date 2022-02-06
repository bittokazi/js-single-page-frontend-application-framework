export class DashboardMenuService {
  constructor() {
    this.menus = [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: "nc-icon nc-bank",
        key: "dashboard",
      },
      {
        title: "Add Category",
        path: "/dashboard/categories/add",
        icon: "nc-icon nc-single-copy-04",
        key: "categoryAdd",
      },
      {
        title: "Category List",
        path: "/dashboard/categories",
        icon: "nc-icon nc-tile-56",
        key: "categoryList",
      },
      {
        title: "Add Note",
        path: "/dashboard/notes/add",
        icon: "nc-icon nc-simple-add",
        key: "noteAdd",
      },
      {
        title: "Note List",
        path: "/dashboard/notes",
        icon: "nc-icon nc-paper",
        key: "noteList",
      },
    ];
  }

  getMenus(key) {
    return this.menus.map((menu) => {
      if (menu.key == key) {
        menu["active"] = true;
      } else {
        menu["active"] = false;
      }
      return menu;
    });
  }

  currentMenu(key) {
    return this.menus.filter((menu) => menu.key == key)[0];
  }
}
