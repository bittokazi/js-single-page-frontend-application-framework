import SimpleJsMvc from "../../../../engine/SimpleJsMvc";
import NoteListView from "./../../../views/dashboard/note/NoteListView.mustache";
import { DashboardBaseComponent } from "../../../components/DashboardBaseComponent";
import { getNotes } from "../../../services/NoteService";

export class NoteListController {
  constructor(reference) {
    this.data = {
      notes: [],
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

  onInit() {}

  onAuthSuccess() {
    getNotes()
      .then((response) => {
        this.data.notes = response.data;
        this.data.firstLoad = false;
        SimpleJsMvc.renderView();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  view() {
    return NoteListView;
  }
}
