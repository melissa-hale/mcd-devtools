import {
  generateCreateMaintenanceQuery,
  generateUsersQuery,
  generateTableQuery,
  generateDeleteMaintenanceQuery,
} from "../../tools/queries.js";
import { getActiveTabUrl, sendRequest } from "../../tools/utils.js";
import config from "../../services/config.js";


const onCreateMaintWindow = async (e) => {
  e.preventDefault();
  let startTime = `${document.getElementById("startTime").value}Z`;
  let endTime = `${document.getElementById("endTime").value}Z`;

  let queryVars = {
    startTime: startTime,
    endTime: endTime,
    mcon: config.mcon,
    dwid: config.account.warehouseUuid,
  };

  let query = generateCreateMaintenanceQuery(queryVars);
  let { data } = await sendRequest(config.apiUrl, query);
  let maintId = data.createOrUpdateDataMaintenanceEntry.entry.id;

  document.getElementById(
    "maint-id"
  ).textContent = `Created maintenance window id ${maintId}`;
  document.getElementById("create-maintenance-window").style.display = "none";
  document.getElementById("create-maintenance-window-results").style.display =
    "";
};

const onDeleteMaintWindow = async (e) => {
  e.preventDefault();
  let maintenanceWindowId = document.getElementById(
    "maintenance-window-id"
  ).value;

  let queryVars = {
    id: maintenanceWindowId,
  };

  let query = generateDeleteMaintenanceQuery(queryVars);
  let { data } = await sendRequest(config.apiUrl, query);

  document.getElementById(
    "deleted-maintenance-window-conf"
  ).textContent = `Deleted maintenance window id ${maintenanceWindowId}`;
  document.getElementById("delete-maintenance-window").style.display = "none";
  document.getElementById("delete-maintenance-window-results").style.display =
    "";
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabUrl();

  config.mcon = activeTab.url.split("/")[4];
  config.fullTableName = config.mcon.split("++")[4];

  // get the warehouse info
  let vars = {
    mcon: config.mcon,
  };
  let query = generateTableQuery(vars);
  let { data } = await sendRequest(config.apiUrl, query);

  config.account = {
    warehouseName: data.getTable.warehouse.name,
    warehouseUuid: data.getTable.warehouse.uuid,
  };

  // update the warehouse name in the form
  let warehouseNameInput = document.getElementById("warehouse-name");
  warehouseNameInput.value = config.account.warehouseName;

  // update the warehouse UUID in the form
  let warehouseUuidInput = document.getElementById("warehouse-uuid");
  warehouseUuidInput.value = config.account.warehouseUuid;

  // update the MCON in the form
  let mconinput = document.getElementById("mcon");
  mconinput.value = config.mcon;

  // update the table name in the form
  let tablenameinput = document.getElementById("full-table-name");
  tablenameinput.value = config.fullTableName;

  // add event listener to create button
  document
    .getElementById("create-maintenance-window")
    .addEventListener("submit", onCreateMaintWindow);

  // add event listener to delete button
  document
    .getElementById("delete-maintenance-window")
    .addEventListener("submit", onDeleteMaintWindow);
});

// chrome.devtools.network.onNavigated.addListener(() => {
//   console.log("Inspected page reloaded");
// });
