import HomeView from "./../views/HomeView.mustache";

export default class HomePageController {
  constructor(reference) {
    this.data = {
      name: "Bitto Kazi",
    };
  }

  onInit() {}

  view() {
    return HomeView;
  }
}
