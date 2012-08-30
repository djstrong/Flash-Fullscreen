var embeds = document.body.getElementsByTagName("embed")
//var objects = document.body.getElementsByTagName("object")

var flash = [embeds]

var fullScreened = null

for (i=0; i<flash.length; i++) {
  for (j=0; j<flash[i].length; j++) {
    e = flash[i][j]
    if (e.type!="application/x-shockwave-flash" && e.src.indexOf(".swf")==-1) continue;
    
    var button = document.createElement("button");
    button.innerHTML = "Fullscreen";

    button.onclick = (function(e) {
      return function() {
	console.log(e)
	console.log('asd')
	if (e.hasAttribute("width"))
	  e.oldWidth = e.width
	else
	  e.oldWidth = null
	  
	if (e.hasAttribute("height"))
	  e.oldHeight = e.height
	else
	  e.oldHeight = null

	e.width = screen.width
	e.height = screen.height
	fullScreened = e
	e.webkitRequestFullScreen();
      };
    })(e);
    
    e.parentNode.insertBefore(button,e.nextSibling);
  }
}

document.addEventListener("webkitfullscreenchange", (function() {
  return function() {
    console.log('asdasdasd ja jebie')
    if (!document.webkitIsFullScreen) {
      console.log(fullScreened)
      console.log(fullScreened.oldWidth)
      if (fullScreened.oldWidth==null)
	fullScreened.removeAttribute("width")
      else
	fullScreened.width = fullScreened.oldWidth
	
      if (fullScreened.oldHeight==null)
	fullScreened.removeAttribute("height")
      else
	fullScreened.height = fullScreened.oldHeight
    }
  };
})(), false);

var iframes = document.body.getElementsByTagName("iframe")
for (var i=0; i<iframes.length; i++) {
  var e = iframes[i]
  e.setAttribute("webkitAllowFullScreen", true)
}
