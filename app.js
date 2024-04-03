// Get The URL
const site = window.location.hostname;

// Running every interval
setInterval(function(){
  var loaded = false;
  var elementList = document.getElementsByClassName("x-component u4-iframecontainer x-box-item x-component-default");

  if(elementList.length>0){
    var childrenForDivContainingIframe = elementList[0].children
    if(childrenForDivContainingIframe.length > 0){

      var iframe = elementList[0].children[0];
  
      var frame = iframe.contentWindow.document.getElementById("contentContainerFrame");
    
      var tables = frame.contentWindow.document.getElementsByClassName("Excel ColumnsMovable ColumnsResizable ColumnsAutoResizable");
      if(tables.length>1){
        loaded = true;
        var table = tables[1];
    
        table.setAttribute("style", "border-width: 0px; border-collapse: separate; width: 1400px;"); 
      
        var beskrivelser = frame.contentWindow.document.getElementsByClassName("GridCell");
      
        var beskrivelse;
        for (let i = 0; i < beskrivelser.length; i++) {
          if(beskrivelser[i].id.startsWith("b_s89_g89s90_ctl02__headerdescription")){
            beskrivelse = beskrivelser[i]
          }
        }
      
        beskrivelse.setAttribute("style", "white-space:nowrap;text-align:center;vertical-align:middle;cursor:pointer;width:150px;"); 
      }
    }
  }
  if(!loaded){
    console.log("Elements not loaded yet")
  }

}, 1000);