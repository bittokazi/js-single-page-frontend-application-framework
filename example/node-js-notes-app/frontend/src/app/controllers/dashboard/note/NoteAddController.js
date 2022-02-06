import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import NoteAddView from "./../../../views/dashboard/note/NoteAddView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { addNote } from "../../../services/NoteService";
import { getCategories } from "../../../services/CategoryService";

export class NoteAddController {
  constructor(reference) {
    this.data = {
      form: {
        title: "",
        content: "",
        categoryid: "",
      },
      categories: [],
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

  updateForm(prop, event) {
    this.data.form[prop] = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    if (
      this.data.form.title.length < 1 ||
      this.data.form.categoryid.length < 1
    ) {
      return;
    }
    addNote(this.data.form)
      .then((response) => {
        SimpleJsMvc.gotoURL("/dashboard/notes");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  view() {
    return `${SimpleJsMvc.renderComponent(
      {
        contentTemplate: NoteAddView,
        menuKey: "noteAdd",
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
