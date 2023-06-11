chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log(changeInfo)
  console.log(tab)
  if (changeInfo.status == "complete") {
    console.log("detected change in URL");
    // reloadExtension(port);
  }
});
