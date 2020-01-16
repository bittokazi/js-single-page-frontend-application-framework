import SimpleJsMvc from "./../../engine/SimpleJsMvc";
import baseLayout from "./../layouts/base/baseLayout";
import SearchForm from "./../components/homepage/SearchForm";
import HomepageService from "./../services/HomepageService";
import RecipeCardComponent from "./../components/homepage/RecipeCardComponent";

export default function HomePage(data) {
  let page = 10;
  let keyword = "";
  data.showNav = false;
  data.recipies = [];
  if (SimpleJsMvc.getGlobalState("load")) {
    try {
      data.recipies = JSON.parse(localStorage.getItem("recipes"));
      page = parseInt(localStorage.getItem("page"));
      data.showNav = true;
      keyword = localStorage.getItem("keyword");
    } catch (err) {}
  }
  const getRecipe = () => {
    HomepageService().getSearchResult(
      keyword,
      page,
      res => {
        localStorage.setItem("recipes", JSON.stringify(res.data.hits));
        localStorage.setItem("page", page);
        data.recipies = res.data.hits;
        data.showNav = true;
        SimpleJsMvc.reRenderComponent(
          "recipeCardComponent",
          SimpleJsMvc.renderComponent(data, RecipeCardComponent)
        );
      },
      err => {
        console.log(err);
      }
    );
  };
  data.searchFormCallback = _keyword => {
    keyword = _keyword;
    localStorage.setItem("keyword", keyword);
    page = 10;
    getRecipe();
  };
  data.next = () => {
    page += 10;
    getRecipe();
  };
  data.prev = () => {
    page -= 10;
    getRecipe();
  };
  return {
    view: () => {
      return `
      ${SimpleJsMvc.renderComponent(
        data,
        baseLayout,
        `
        <div class="container">
            <div class="row search-container">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    ${SimpleJsMvc.renderComponent(data, SearchForm)}
                </div>
                <div class="col-md-4"></div>
            </div>
            <div class="row" id="recipeCardComponent">
                ${SimpleJsMvc.renderComponent(data, RecipeCardComponent)}
            </div>
        </div>
        `
      )}
      `;
    }
  };
}
