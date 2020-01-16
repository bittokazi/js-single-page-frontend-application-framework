export default function header(data) {
  return {
    view: () => {
      return `
        <nav class="navbar navbar-dark bg-dark">
          <a class="navbar-brand" href="/" onclick="SimpleJsMvc.routeLink(event, '/')">Recipe Search</a>
        </nav>
      `;
    }
  };
}
