import { AppEngine } from "../services/AppEngine";
import DashboardSidebarView from "./../views/dashboard/layout/DashboardSidebar.mustache";

export class DashboardSidebar {
  constructor(reference) {
    this.data = {
      ...reference,
      menus: AppEngine.getInstance().dashboardMenuService.getMenus(
        reference.menuKey
      ),
      currentMenu: AppEngine.getInstance().dashboardMenuService.currentMenu(
        reference.menuKey
      ),
    };
  }

  view() {
    return DashboardSidebarView;
  }
}
