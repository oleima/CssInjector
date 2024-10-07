// Get The URL
const site = window.location.hostname;
let columnWidth = getColumnWidth();

function getColumnWidth(){
  let cookiedValue = getCookie("columnWidth")
  let columnWidth = 300;
  if(cookiedValue !== ""){
    columnWidth = Number(cookiedValue)
  }
  else{
    setCookie("columnWidth", columnWidth, 14)

  }
  return columnWidth;
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        let cvalue = c.substring(name.length, c.length);
        setCookie(cname,cvalue,14);
        return cvalue;
      }
    }
    return "";
  }

  function recievedWidth(width) {
    widthValue = width.split("=")[1];
    setCookie("columnWidth", widthValue, 14)
  }

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
      
      if (request.greeting === "getWidth"){
        
        sendResponse({width: columnWidth});
      }
      if (request.greeting.startsWith('setWidth')){
        recievedWidth(request.greeting);
        sendResponse({width: "set"});
      }
    }
  );

// Running every interval
setInterval(function(){
    updateSetHours();
    updateApproveHours();
}, 200);


function updateSetHours(){
  var loaded = false;
  var elementList = document.getElementsByClassName("x-component u4-iframecontainer x-box-item x-component-default");

  if(elementList.length>0)
  {
    var childrenForDivContainingIframe = elementList[0].children
    if(childrenForDivContainingIframe.length > 0)
    {

      var iframe = elementList[0].children[0];
  
      var frame = iframe.contentWindow.document.getElementById("contentContainerFrame");
      if(frame)
      {
        var tables = frame.contentWindow.document.getElementsByClassName("Excel ColumnsMovable ColumnsResizable ColumnsAutoResizable");
        if(tables!= null){
          if(tables.length>1){
            loaded = true;
            var table = tables[1];
            columnWidth = getColumnWidth();
            var tablewidth = columnWidth + 1200
            table.setAttribute("style", "border-width: 0px; border-collapse: separate; width: " + tablewidth + "px;"); 
          
            var beskrivelser = frame.contentWindow.document.getElementsByClassName("GridCell");
          
            var beskrivelse;
            for (let i = 0; i < beskrivelser.length; i++) {
              if(beskrivelser[i].id.startsWith("b_s89_g89s90_ctl02__headerdescription")){
                beskrivelse = beskrivelser[i]
              }
            }
            if(beskrivelse){
              const columnStyle = "white-space:nowrap;text-align:center;vertical-align:middle;cursor:pointer;width:"+columnWidth+"px;"
              beskrivelse.setAttribute("style", columnStyle); 
            }
          }
          
        }
      }
    }
  }
  if(!loaded){
    console.log("Elements not loaded yet")
  }
}

function updateApproveHours(){
  var loaded = false;
  var elementList = document.getElementsByClassName("x-component u4-iframecontainer x-box-item x-component-default");

  if(elementList.length>0){
    var childrenForDivContainingIframe = elementList[0].children
    if(childrenForDivContainingIframe.length > 0){

      var iframe = elementList[0].children[0];
  
      var frame = iframe.contentWindow.document.getElementById("contentContainerFrame");
      if(frame)
      {
        var tables = frame.contentWindow.document.getElementsByClassName("Excel ColumnsMovable ColumnsResizable ColumnsAutoResizable");
      
        if(tables!= null){
          if(tables.length>1){
            loaded = true;
            var table = tables[1];
            columnWidth = getColumnWidth();
            var tablewidth = columnWidth + 1200
            table.setAttribute("style", "border-width: 0px; border-collapse: separate; width: " + tablewidth + "px;"); 
      
            var beskrivelser = frame.contentWindow.document.getElementsByClassName("GridCell");
      
            var beskrivelse;
            for (let i = 0; i < beskrivelser.length; i++) {
              if(beskrivelser[i].id.startsWith("b_g1105s5_ctl02__headerdescription")){
                beskrivelse = beskrivelser[i]
              }
            }
            if(beskrivelse){
              const columnStyle = "white-space:nowrap;text-align:center;vertical-align:middle;cursor:pointer;width:"+columnWidth+"px;"
              beskrivelse.setAttribute("style", columnStyle); 
            }
          }
        }
      }
    }
  }
  if(!loaded){
    console.log("Elements not loaded yet")
  }
}