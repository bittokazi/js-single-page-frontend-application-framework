import { AuthService } from "./AuthService";
import { DashboardMenuService } from "./DashboardMenuService";

export class AppEngine {
  constructor() {
    this.dashboardMenuService = new DashboardMenuService();
    this.authService = new AuthService();
  }

  static getInstance() {
    if (!this.appEngine) this.appEngine = new AppEngine();
    return this.appEngine;
  }
}
