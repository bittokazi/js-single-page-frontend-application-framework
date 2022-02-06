import Route from "./Route";
import Config from "./../config/Config";
import SequalizeMigration from "./SequalizeMigration";
import SequalizeSeed from "./SequalizeSeed";

export default class Engine {
  constructor(app) {
    this.app = app;
    this.config = Config();
    return this;
  }

  init() {
    SequalizeMigration()
      .then(() => {
        SequalizeSeed()
          .then(() => {
            SequalizeSeed;
            Route(this.app);
            this.app.listen(this.config.PORT, () =>
              console.log(`Server running on port ${this.config.PORT}!`)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
