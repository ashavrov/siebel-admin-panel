$.get(chrome.extension.getURL('/html/contenthml.html'), 
    function(data) {
        var div = document.createElement("div");
        div.setAttribute("name", "_dev00");
		div.setAttribute("id", "_dev00");
		div.setAttribute("style", "max-height:600px;height: auto; width: auto; top: 60px; left:30px; box-shadow: rgb(0, 0, 0) 0px 0px 10px; position: fixed; overflow:auto; z-index: 1000");
		div.setAttribute("class","ui-dialog ui-widget ui-widget-content ui-corner-all ui-front ui-dialog-buttons ui-draggable");
        div.innerHTML = data;
		var client = document.getElementById("_sweclient");
		if (client != null)
		{
			document.getElementsByTagName("body")[0].appendChild(div, client);
		}
		$( "#_dev01" ).show();
    }
);
$.get(chrome.extension.getURL('/contentscript.js'), 
    function(data) {
        var script = document.createElement("script");
        script.innerHTML = data;
        document.getElementsByTagName("body")[0].appendChild(script);
    }
);