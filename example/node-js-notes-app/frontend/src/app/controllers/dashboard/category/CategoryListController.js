import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import CategoryListView from "./../../../views/dashboard/category/CategoryListView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { getCategories } from "../../../services/CategoryService";

export class CategoryListController {
  constructor(reference) {
    this.data = {
      categories: [],
      onAuthSuccess: () => {
        this.onAuthSuccess();
      },
      firstLoad: true,
    };
  }

  onInit() {}

  onAuthSuccess() {
    getCategories()
      .then((response) => {
        this.data.categories = response.data;
        this.data.firstLoad = false;
        SimpleJsMvc.renderView();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  view() {
    return `${SimpleJsMvc.renderComponent(
      {
        contentTemplate: CategoryListView,
        menuKey: "categoryList",
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
