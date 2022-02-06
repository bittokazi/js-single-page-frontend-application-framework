import ContactsView from "./../views/ContactsView.mustache";

export default class ContactsPageController {
  constructor(reference) {
    this.data = {
      name: reference.name,
    };
  }

  onInit() {}

  view() {
    return ContactsView;
  }
}
