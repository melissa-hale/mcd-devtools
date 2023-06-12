export async function getActiveTabUrl() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export async function sendRequest(apiUrl, body) {
  let request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };
  let resp = await fetch(apiUrl, request);
  return await resp.json();
};

export async function appendScript(scriptPath) {
  let script = document.createElement("script");

  script.type = "text/javascript";
  script.src = scriptPath;
  document.body.appendChild(script)

  return
}