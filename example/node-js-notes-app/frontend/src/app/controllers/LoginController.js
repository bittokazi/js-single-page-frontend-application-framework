import LoginView from "./../views/Login.mustache";
import SimpleJsMvc from "../../engine/SimpleJsMvc";
import { loginUser } from "../services/LoginService";
import { AuthHolder } from "../services/AuthHolder";
import { AppEngine } from "../services/AppEngine";

export default class LoginController {
  constructor(reference) {
    this.data = {
      form: {
        username: "",
        password: "",
      },
      loading: true,
      doNotMatch: false,
    };
  }

  onInit() {
    SimpleJsMvc.bindFunction("updateForm", this.updateForm);
    SimpleJsMvc.bindFunction("onSubmit", this.onSubmit);
    AppEngine.getInstance()
      .authService.isAuthenticated(false)
      .then(() => {
        SimpleJsMvc.gotoURL("/dashboard");
      })
      .catch(() => {})
      .finally(() => {
        this.data.loading = false;
        SimpleJsMvc.renderView();
      });
  }

  updateForm(prop, event) {
    this.data.form[prop] = event.target.value;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.data.form.username != "" && this.data.form.password != "") {
      this.data.doNotMatch = false;
      this.data.loading = true;
      SimpleJsMvc.renderView();
      loginUser(this.data.form)
        .then((response) => {
          this.data.doNotMatch = false;
          AuthHolder.setToken(response.data);
          SimpleJsMvc.gotoURL("/dashboard");
        })
        .catch((error) => {
          this.data.doNotMatch = true;
        })
        .finally(() => {
          this.data.loading = false;
          SimpleJsMvc.renderView();
        });
    }
  }

  view() {
    return LoginView;
  }
}
