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
    return `${SimpleJsMvc.renderComponent(
      {
        contentTemplate: NoteListView,
        menuKey: "noteList",
        ...this.data,
      },
      DashboardBaseComponent
    )}`;
  }
}
