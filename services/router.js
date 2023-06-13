import AccountDetails from "../devtools/panel/views/accountDetails/AccountDetails.js";
import CreateMaintWindow from "../devtools/panel/views/actions/CreateMaintWindow.js";

export default class Router {
  constructor() {
    this.routes = [
      { path: "/", view: AccountDetails },
      { path: "/create-maintenance-window", view: CreateMaintWindow },
    ];
  }

  async getView(path, config) {

    let matches = await this.routes.map((route) => {
        console.log(route)
        return {
            route,
            isMatch: path ===route.path
        }
    });

    console.log(matches)

    let match = await matches.find((route) => {
        route.isMatch === true
    })
    console.log(match)

    // if (!match) {
    //     match = {
    //         route: this.routes[0],
    //         isMatch: false
    //     }
    // }

    return new match.route.view(config)
  }

};

