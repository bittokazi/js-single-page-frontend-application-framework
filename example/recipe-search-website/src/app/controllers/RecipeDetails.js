import SimpleJsMvc from "./../../engine/SimpleJsMvc";
import baseLayout from "./../layouts/base/baseLayout";

export default function RecipeDetails(data) {
  let recipe = {};
  recipe.ingredientLines = [];
  try {
    recipe = JSON.parse(localStorage.getItem("recipes"))[data.index].recipe;
  } catch (err) {}
  let index = 0;
  return {
    view: () => {
      return `
            ${SimpleJsMvc.renderComponent(
              data,
              baseLayout,
              `
                <div class="container">
                    <div class="row search-container">
                        <div class="col-md-4">
                            <img src="${
                              recipe.image
                            }" alt="..." class="img-thumbnail">
                            <h1>${recipe.label}</h1>
                        </div>
                        <div class="col-md-8">
                        <table class="table">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Ingredient</th>
                                </tr>
                            </thead>
                            <tbody>
                               ${recipe.ingredientLines
                                 .map(ingredient => {
                                   index++;
                                   return `
                                    <tr>
                                        <th scope="row">${index}</th>
                                        <td>${ingredient}</td>
                                    </tr>
                                   `;
                                 })
                                 .join("")}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
              `
            )}
            `;
    }
  };
}
