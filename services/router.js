import AccountDetails from "../devtools/panel/views/accountDetails/AccountDetails.js";
import CreateMaintWindow from "../devtools/panel/views/actions/CreateMaintWindow.js";

export default class Router {
  constructor() {
    this.routes = [
      { path: "/", view: AccountDetails },
      { path: "/create-maintenance-window", view: CreateMaintWindow },
    ];
  }

  async getView(path="/", config) {
    console.log(path)
    let match = this.routes.map((route) => {
        return {
            route,
            isMatch: path ===route.path
        }
    }).find((route) => {
        route.isMatch
    })

    if (!match) {
        match = {
            route: this.routes[0],
            isMatch: false
        }
    }

    return new match.route.view(config)
  }

};

