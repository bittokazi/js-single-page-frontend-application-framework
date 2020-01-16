import SimpleJsMvc from "./../../../engine/SimpleJsMvc";

export default function SearchForm(data) {
  SimpleJsMvc.bindFunction("searchAction", event => {
    event.preventDefault();
    data.searchFormCallback(event.target.elements[0].value);
  });
  return {
    view: () => {
      return `
                <form class="form-inline" onsubmit="_self.searchAction(event)">
                    <div class="form-group mx-sm-3 mb-2">
                    <label for="keyword" class="sr-only">Search Keyword</label>
                    <input type="text" class="form-control" id="keyword" placeholder="keyword">
                    </div>
                    <button type="submit" class="btn btn-primary mb-2">Search</button>
                </form>
            `;
    }
  };
}
