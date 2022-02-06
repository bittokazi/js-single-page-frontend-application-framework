import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import CategoryAddView from "./../../../views/dashboard/category/CategoryAddView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { addCategory } from "../../../services/CategoryService";

export class CategoryAddController {
  constructor(reference) {
    this.data = {
      form: {
        title: "",
      },
      onAuthSuccess: () => {
        this.onAuthSuccess();
      },
      firstLoad: true,
    };
  }

  onInit() {
    SimpleJsMvc.bindFunction("updateForm", this.updateForm);
    SimpleJsMvc.bindFunction("onSubmit", this.onSubmit);
  }

  onAuthSuccess() {
    this.data.firstLoad = false;
  }

  updateForm(prop, event) {
    this.data.form[prop] = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.data.form.title.length < 1) {
      return;
    }
    addCategory(this.data.form)
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
        contentTemplate: CategoryAddView,
        menuKey: "categoryAdd",
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
