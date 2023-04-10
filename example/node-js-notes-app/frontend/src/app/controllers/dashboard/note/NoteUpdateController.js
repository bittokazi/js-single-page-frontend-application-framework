import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import NoteUpdateView from "./../../../views/dashboard/note/NoteUpdateView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { getNote, updateNote } from "../../../services/NoteService";
import { getCategories } from "../../../services/CategoryService";

export class NoteUpdateController {
  constructor(reference) {
    this.data = {
      form: {
        id: reference.id,
        title: "",
        content: "",
        categoryid: "",
      },
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
                menuKey: "noteList",
                ..._self.data,
              },
              DashboardBaseComponent
            )
          );
        };
      },
    };
  }

  onInit() {
    SimpleJsMvc.bindFunction("updateForm", this.updateForm);
    SimpleJsMvc.bindFunction("onSubmit", this.onSubmit);
  }

  onAuthSuccess() {
    let promises = [];
    promises.push(
      new Promise((resolve, reject) => {
        getNote(this.data.form.id)
          .then((response) => {
            this.data.form = {
              ...this.data.form,
              ...response.data,
            };
            return resolve({});
          })
          .catch((error) => {
            console.log(error);
            return reject({});
          });
      })
    );

    promises.push(
      new Promise((resolve, reject) => {
        getCategories()
          .then((response) => {
            this.data.categories = response.data;
            this.data.firstLoad = false;
            return resolve({});
          })
          .catch((error) => {
            console.log(error);
            return reject({});
          });
      })
    );

    Promise.all(promises).then(() => {
      this.data.categories = this.data.categories.map((category) => {
        if (category.id == this.data.form.categoryid) category.selected = true;
        return category;
      });
      SimpleJsMvc.renderView();
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
    updateNote(this.data.form)
      .then((response) => {
        SimpleJsMvc.gotoURL("/dashboard/notes");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  view() {
    return NoteUpdateView;
  }
}
