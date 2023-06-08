import {
  getActiveTabUrl,
  generateCreateMaintenanceQuery,
  generateUsersQuery,
  generateTableQuery,
  generateDeleteMaintenanceQuery,
} from "../../utils/utils.js";

const apiUrl = "https://graphql.getmontecarlo.com/graphql";

let mcon = "";
let fullTableName = "";
let warehouseName = "";
let warehouseUuid = "";
let currentURL = "";

async function sendRequest(query) {
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: query,
  };
  let resp = await fetch(apiUrl, request);
  return await resp.json();
}

const onCreateMaintWindow = async (e) => {
  e.preventDefault();
  let startTime = `${document.getElementById("startTime").value}Z`;
  let endTime = `${document.getElementById("endTime").value}Z`;

  let queryVars = {
    startTime: startTime,
    endTime: endTime,
    mcon: mcon,
    dwid: warehouseUuid,
  };

  let query = generateCreateMaintenanceQuery(queryVars);
  let { data } = await sendRequest(query);
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
  let { data } = await sendRequest(query);
  console.log(data);

  document.getElementById(
    "deleted-maintenance-window-conf"
  ).textContent = `Deleted maintenance window id ${maintenanceWindowId}`;
  document.getElementById("delete-maintenance-window").style.display = "none";
  document.getElementById("delete-maintenance-window-results").style.display =
    "";
};

document.addEventListener("DOMContentLoaded", async (tabId, changeInfo, tab) => {
  const activeTab = await getActiveTabUrl();
  currentURL = activeTab.url;

  mcon = activeTab.url.split("/")[4];
  fullTableName = mcon.split("++")[4];

  // get the warehouse info
  let vars = {
    mcon: mcon,
  };
  let query = generateTableQuery(vars);
  let { data } = await sendRequest(query);
  warehouseName = data.getTable.warehouse.name;
  warehouseUuid = data.getTable.warehouse.uuid;

  // update the warehouse name in the form
  let warehouseNameInput = document.getElementById("warehouse-name");
  warehouseNameInput.value = warehouseName;

  // update the warehouse UUID in the form
  let warehouseUuidInput = document.getElementById("warehouse-uuid");
  warehouseUuidInput.value = warehouseUuid;

  // update the MCON in the form
  let mconinput = document.getElementById("mcon");
  mconinput.value = mcon;

  // update the table name in the form
  let tablenameinput = document.getElementById("full-table-name");
  tablenameinput.value = fullTableName;

  // add event listener to create button
  document
    .getElementById("create-maintenance-window")
    .addEventListener("submit", onCreateMaintWindow);

  // add event listener to delete button
  document
    .getElementById("delete-maintenance-window")
    .addEventListener("submit", onDeleteMaintWindow);
});

//Update form on page change. 
//Note: External Tables are not supported
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) =>{
  const activeTab = await getActiveTabUrl();
  if (currentURL == activeTab.url) return;  //Check for URL change
  // TODO: JS string compare ignores parameters, replace ? with "" to fix
  //This will ensure one execution per url change
  console.log("currentURL: " + currentURL)
  console.log("activeTab.url: " + activeTab.url)
  if(!activeTab.url.includes("https://getmontecarlo.com/assets")) return;
  currentURL = activeTab.url;  
  console.log(activeTab)
  let tabInfo = activeTab.url.split("/")[4].split("++")[4];
  console.log("tablinfo" + tabInfo)
  mcon = activeTab.url.split("/")[4];
  fullTableName = mcon.split("++")[4];

  // get the warehouse info
  let vars = {
    mcon: mcon,
  };
  let query = generateTableQuery(vars);
  let { data } = await sendRequest(query);
  warehouseName = data.getTable.warehouse.name;
  warehouseUuid = data.getTable.warehouse.uuid;

  // update the warehouse name in the form
  let warehouseNameInput = document.getElementById("warehouse-name");
  warehouseNameInput.value = warehouseName;

  // update the warehouse UUID in the form
  let warehouseUuidInput = document.getElementById("warehouse-uuid");
  warehouseUuidInput.value = warehouseUuid;

  // update the MCON in the form
  let mconinput = document.getElementById("mcon");
  mconinput.value = mcon;

  // update the table name in the form
  let tablenameinput = document.getElementById("full-table-name");
  tablenameinput.value = fullTableName;
});



// chrome.devtools.network.onNavigated.addListener(() => {
//   console.log("Inspected page reloaded");
// });