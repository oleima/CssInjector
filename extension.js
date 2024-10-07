const site = window.location.hostname;
let columnWidth = 300;
getColumnWidth();

var slider = document.getElementById("myRange");
var output = document.getElementById("output");

async function getColumnWidth(){
    const value = await getWidth();
    columnWidth = value;
    slider.value = columnWidth;
    output.innerHTML = "Width: " + slider.value + "px"; // Display the default slider value
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    columnWidth = this.value
    setOutputValue(columnWidth);
    setWidth();
}

function setOutputValue(width){
    output.innerHTML = "Width: " + width + "px";
}

  async function getCurrentTabId() {
    let queryOptions = { active: true};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.id;
  }

  async function getWidth(){
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(await getCurrentTabId(), {greeting: "getWidth"});
    // do something with response here, not outside the function
    return response.width;
  }

  async function setWidth(){
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(await getCurrentTabId(), {greeting: "setWidth="+columnWidth});
  }