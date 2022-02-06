import SimpleJsMvc from "../../engine/SimpleJsMvc";
import { AppEngine } from "../services/AppEngine";
import DashboardLayout from "./../views/dashboard/layout/DashboardLayout.mustache";
import DashboardSidebar from "./../views/dashboard/layout/DashboardSidebar.mustache";

export class DashboardBaseComponent {
  constructor(reference) {
    this.data = {
      ...reference,
      menus: AppEngine.getInstance().dashboardMenuService.getMenus(
        reference.menuKey
      ),
      currentMenu: AppEngine.getInstance().dashboardMenuService.currentMenu(
        reference.menuKey
      ),
      authenticated: AppEngine.getInstance().authService.user ? true : false,
      footerYear: new Date().getFullYear(),
      user: AppEngine.getInstance().authService.user,
    };
    if (!reference.noCard) {
      this.data.noCard = false;
    }
    this.partials = {
      contentTemplate: reference.contentTemplate,
      sideBarView: DashboardSidebar,
    };
    if (!AppEngine.getInstance().authService.user) {
      AppEngine.getInstance()
        .authService.isAuthenticated()
        .then(() => {
          this.data.authenticated = true;
        })
        .catch(() => {
          SimpleJsMvc.gotoURL("/login");
        });
    } else {
      setTimeout(() => {
        if (document.getElementById("bodyClick")) {
          document.getElementById("bodyClick").click();
        }
      }, 500);

      if (reference.firstLoad) {
        reference.onAuthSuccess();
      }
    }
    SimpleJsMvc.bindFunction("logout", this.logout);
  }

  logout() {
    AppEngine.getInstance().authService.removeAuth();
  }

  view() {
    return DashboardLayout;
  }
}
