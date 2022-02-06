import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import CategoryUpdateView from "./../../../views/dashboard/category/CategoryUpdateView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { getCategory, updateCategory } from "../../../services/CategoryService";

export class CategoryUpdateController {
  constructor(reference) {
    this.data = {
      form: {
        id: reference.id,
        title: "",
      },
      onAuthSuccess: () => {
        this.onAuthSuccess();
      },
      firstLoad: true,
    };
  }

  onInit() {}

  onAuthSuccess() {
    this.data.firstLoad = false;
    SimpleJsMvc.bindFunction("updateForm", this.updateForm);
    SimpleJsMvc.bindFunction("onSubmit", this.onSubmit);
    getCategory(this.data.form.id)
      .then((response) => {
        this.data.form.title = response.data.title;
        SimpleJsMvc.renderView();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateForm(prop, event) {
    this.data.form[prop] = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.data.form.title.length < 1) {
      return;
    }
    updateCategory(this.data.form)
      .then((response) => {
        SimpleJsMvc.gotoURL("/dashboard/categories");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  view() {
    return `${SimpleJsMvc.renderComponent(
      {
        contentTemplate: CategoryUpdateView,
        menuKey: "categoryList",
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
