import axios from "axios";

export default function HomepageService() {
  return {
    getSearchResult: (keyword, page, success, error) => {
      axios
        .get(
          `https://api.edamam.com/search?q=${keyword}&app_id=APP_ID&app_key=APP_KEY&from=${page -
            10}&to=${page}`
        )
        .then(response => {
          success(response);
        })
        .catch(err => {
          error(err);
        })
        .finally(() => {});
    }
  };
}
