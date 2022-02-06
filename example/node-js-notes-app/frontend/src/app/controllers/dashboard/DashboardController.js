import SimpleJsMvc from "../../../engine/SimpleJsMvc";
import DashboardView from "./../../views/dashboard/DashboardView.mustache";
import { DashboardBaseComponent } from "./../../components/DashboardBaseComponent";
import { AppEngine } from "../../services/AppEngine";

export class DashboardController {
  constructor(reference) {
    this.data = {
      user: null,
      onAuthSuccess: () => {
        this.onAuthSuccess();
      },
      firstLoad: true,
    };
  }

  onInit() {}

  onAuthSuccess() {
    this.data.user = AppEngine.getInstance().authService.user;
    this.data.firstLoad = false;
    setTimeout(() => {
      SimpleJsMvc.renderView();
    }, 100);
  }

  view() {
    return `${SimpleJsMvc.renderComponent(
      {
        contentTemplate: DashboardView,
        menuKey: "dashboard",
        noCard: true,
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
