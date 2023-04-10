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
      dashboardLayout: function () {
        return function (val, render) {
          return render(
            SimpleJsMvc.renderComponent(
              {
                contentView: val,
                menuKey: "categoryList",
                ..._self.data,
              },
              DashboardBaseComponent
            )
          );
        };
      },
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
    return CategoryListView;
  }
}
