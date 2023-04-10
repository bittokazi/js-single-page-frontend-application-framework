import SimpleJsMvc from "../../engine/SimpleJsMvc";
import { AppEngine } from "../services/AppEngine";
import DashboardLayout from "./../views/dashboard/layout/DashboardLayout.mustache";
import { DashboardSidebar } from "./DashboardSidebar";

export class DashboardBaseComponent {
  constructor(reference) {
    this.data = {
      ...reference,
      authenticated: AppEngine.getInstance().authService.user ? true : false,
      footerYear: new Date().getFullYear(),
      user: AppEngine.getInstance().authService.user,
      sideBarComponent: function () {
        return function (val, render) {
          return render(
            SimpleJsMvc.renderComponent({ ...reference }, DashboardSidebar)
          );
        };
      },
    };
    if (!reference.noCard) {
      this.data.noCard = false;
    }
    this.partials = {
      contentView: reference.contentView,
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
