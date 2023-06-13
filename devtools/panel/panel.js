import {
	generateCreateMaintenanceQuery,
	generateUsersQuery,
	generateTableQuery,
	generateDeleteMaintenanceQuery,
} from "../../tools/queries.js";

import { getActiveTabUrl, sendRequest } from "../../tools/utils.js";
import Config from "../../services/config.js";
import Router from "../../services/router.js"

let config = new Config();
let router = new Router();


const getInstanceDetails = async () => {
	const activeTab = await getActiveTabUrl();
	let mcon = activeTab.url.split("/")[4];

	// get the warehouse info
	let vars = {
		mcon: mcon,
	};
	let query = generateTableQuery(vars);
	let { data } = await sendRequest(config.apiUrl, query);

	// set warehouse details in config object
	await config.setConfigProperty("warehouseName", data.getTable.warehouse.name);
	await config.setConfigProperty("warehouseUuid", data.getTable.warehouse.uuid);

};

document.addEventListener("DOMContentLoaded", async () => {
	console.log("initializing panel");
	await getInstanceDetails();

	// document loaded - grab the view and set the html
	console.log("loading landing page");
	let view = await router.getView("/", config)
	document.querySelector("#app").innerHTML = await view.getHtml();

	console.log("listening for navigation");
	document.body.addEventListener("click", async (e) => {
		console.log("click registered");
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			let path = `/${e.target.href.split("/")[3]}`;
			console.log("route change");
			let view = await router.getView(path, config);
			document.querySelector("#app").innerHTML = await view.getHtml();
		}
	});

});
