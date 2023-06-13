let routes = [
  { path: "/", view: "a view" },
  { path: "/create-maintenance-window", view: "another" },
]

let path = '/create-maintenance-window'

let matches = routes.map((route) => {
  console.log(route);
  return {
    route,
    isMatch: path === route.path,
  };
});

console.log(matches)

let match = matches.find(route=> route.isMatch)



console.log(match)