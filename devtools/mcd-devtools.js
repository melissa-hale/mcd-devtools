const createMCDPanel = () => {
    chrome.devtools.panels.create(
      "MCD Devtools",
      null,
      "/devtools/panel/panel.html",
      null
    );
};

createMCDPanel();
