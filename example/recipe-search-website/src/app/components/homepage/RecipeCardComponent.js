import SimpleJsMvc from "./../../../engine/SimpleJsMvc";

export default function RecipeCardComponent(data) {
  SimpleJsMvc.bindFunction("next", () => {
    data.next();
  });
  SimpleJsMvc.bindFunction("prev", () => {
    data.prev();
  });
  const navHtml = () => {
    if (data.showNav) {
      return `<div class="col-md-12">
                <div class="row">
                  <div class="col-md-5"></div>
                  <div class="col-md-2 nav-container">
                    <button onclick="_self.prev()" type="button" class="btn btn-info">Prev</button>
                    <button onclick="_self.next()" type="button" class="btn btn-primary">Next</button>
                  </div>
                  <div class="col-md-5"></div>
                </div>
              </div>`;
    } else {
      return ``;
    }
  };
  return {
    view: () => {
      let index = -1;
      return `
            ${data.recipies
              .map(recipe => {
                index++;
                return `
                    <div class="col-md-4 card-container">
                        <div class="card" style="width: 18rem;">
                            <img class="card-img-top" src="${recipe.recipe.image}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.recipe.label}</h5>
                                <a href="/recipe-details/${index}" onclick="SimpleJsMvc.routeLink(event, '/recipe-details/${index}')" class="btn btn-primary">See Details</a>
                            </div>
                        </div>
                        
                    </div>
                `;
              })
              .join("")}
              ${navHtml()}
            `;
    }
  };
}
