var mouse_event = 0;
var differenceX = 0;
var differenceY = 0;

function getListSiebelInfo() { //основной метод, получает данные из siebel
	var app = SiebelApp.S_App;
	var arrApplets = app.GetActiveView().GetAppletMap();
	var activeApplet = app.GetActiveView().GetActiveApplet();
	var arrCurFields = activeApplet.GetPModel().Get('GetBusComp').GetFieldMap();

	var divApplets, divAllInfo, divCurrentApplet, divFieldsCurrentApplet;
	var tableAllInfo, tableCurrentApplet, tableFieldsCurrentApplet;
	var header;
	var row;
	var cell;

	var arTitleApplets = ["Applet Name", "BusComp Name", "Row Id", "Title"];
	var arInfoAll = ["View Name", "Business Object Name"];
	var arFields = ["Field Name", "Field Value"];
	var ind = 0;
	//создание основных элементов
	//--
	divApplets = document.createElement("div");
	divApplets.setAttribute("id", "_devAppletsView");
	divApplets.innerHTML = "<h2>Information about applets on view:</h2>";

	divAllInfo = document.createElement("div");
	divAllInfo.setAttribute("id", "_devAllInfo");
	divAllInfo.innerHTML = "<h2>About view:</h2>";

	divCurrentApplet = document.createElement("div");
	divCurrentApplet.setAttribute("id", "_devCurApplet");
	divCurrentApplet.innerHTML = "<h2>About current applet:</h2>";

	divFieldsCurrentApplet = document.createElement("div");
	divFieldsCurrentApplet.setAttribute("id", "_devFieldsCurApplet");
	divFieldsCurrentApplet.innerHTML = "<h2>About fields:</h2>";

	$('#_dev01').append(divAllInfo);
	$('#_dev01').append(divApplets);
	$('#_dev01').append(divCurrentApplet);
	$('#_dev01').append(divFieldsCurrentApplet);

	createBlockInformation('#_devAppletsView', 'devTableAllApplets', arTitleApplets, arrApplets);
	//Информация
	tableAllInfo = document.createElement("table");
	tableAllInfo.setAttribute("name", "devTableAllApplets");
	header = tableAllInfo.createTHead();
	row = header.insertRow(0);
	arInfoAll.forEach(function (item, i, arInfoAll) {
		cell = row.insertCell(i);
		cell.innerHTML = item;
		cell.setAttribute("style", "border:1px solid black;padding:3px;background-color:#dbf1da;");
	});
	row = header.insertRow(1);
	cell = createCell(app, arInfoAll, row, "InfoAll", "");
	$('#_devAllInfo').append(tableAllInfo);
	//О текущем апплете
	tableCurrentApplet = document.createElement("table");
	tableCurrentApplet.setAttribute("name", "devTableAllApplets");
	header = tableCurrentApplet.createTHead();
	row = header.insertRow(0);
	arTitleApplets.forEach(function (item, i, arTitleApplets) {
		cell = row.insertCell(i);
		cell.innerHTML = item;
		cell.setAttribute("style", "border:1px solid black;padding:3px;background-color:#dbf1da;");
	});
	row = header.insertRow(1);
	cell = createCell(activeApplet, arTitleApplets, row, "CurApp", "");
	$('#_devCurApplet').append(tableCurrentApplet);
	//createBlockInformation('#_devCurApplet', 'devTableCurApplet', arTitleApplets, activeApplet);
	//О полях текущего апплета
	tableFieldsCurrentApplet = document.createElement("table");
	tableFieldsCurrentApplet.setAttribute("name", "devTableAllApplets");
	header = tableFieldsCurrentApplet.createTHead();

	row = header.insertRow(0);
	arFields.forEach(function (item, i, arFields) {
		cell = row.insertCell(i);
		cell.innerHTML = item;
		cell.setAttribute("style", "border:1px solid black;padding:3px;background-color:#dbf1da;");
	});
	ind = 1;
	//arrCurFields  = arrayUniq(arrCurFields);
	for (var a in arrCurFields) {
		let theField = arrCurFields[a];
		row = header.insertRow(ind);
		cell = createCell(activeApplet, arFields, row, "Applets", a);
		ind++;
	}
	$('#_devFieldsCurApplet').append(tableFieldsCurrentApplet);
	//createBlockInformation('#_devFieldsCurApplet', 'devTableCurApplet', arFields, arrCurFields);
}

function removeListSiebelInfo() { //метод удаляет элементы
	$('#_devFieldsCurApplet').remove();
	$('#_devAppletsView').remove();
	$('#_devCurApplet').remove();
	$('#_devAllInfo').remove();
}

function arrayUniq(array) {
	for (var a in array) {
		var tempind = 0;
		for (var b in array) {
			if (a == b) {
				tempind++;
			}
		}
		if (tempind > 1) {
			delete array[a];
		}
	}
	return array;
}

function createCell(obj, arrayName, row, type, field) { //универсальный метод создания ячейки записи
	var temp;
	arrayName.forEach(function (item, i, arrayName) {
		let cell = row.insertCell(i);
		switch (item) {
			case "View Name":
				temp = obj.GetActiveView().GetName();
				break;
			case "Business Object Name":
				temp = obj.GetActiveBusObj().GetName();
				break;
			case "Applet Name":
				temp = obj.GetName();
				break;
			case "BusComp Name":
				temp = obj.GetPModel().Get('GetBusComp').GetName();
				break;
			case "Row Id":
				temp = obj.GetPModel().Get('GetBusComp').GetFieldValue("Id");
				break;
			case "Title":
				temp = obj.GetAppletLabel();
				break;
			case "Field Name":
				temp = field;
				break;
			case "Field Value":
				temp = obj.GetPModel().Get('GetBusComp').GetFieldValue(field);
				break;
		}
		cell.innerHTML = "<a id='Current " + temp + "' href='javascript:ClipBoard(\"Current " + temp + "\")'>" + temp + "</a>";
		cell.setAttribute("style", "border:1px solid black;padding:3px");
	});
	return cell;
}

function createBlockInformation(block, name, arrayTitles, arrayObject) {
	var tableApplets = document.createElement("table");
	tableApplets.setAttribute("name", name);
	var header = tableApplets.createTHead();
	var theApplet;
	var row;
	var cell;
	var ind = 0;
	for (var a in arrayObject) {
		theApplet = arrayObject[a];
		row = header.insertRow(ind);
		ind++;
		cell = createCell(theApplet, arrayTitles, row, "Applets", "");
	}
	row = header.insertRow("Title");
	arrayTitles.forEach(function (item, i, arrayTitles) {
		cell = row.insertCell(i);
		cell.innerHTML = item;
		cell.setAttribute("style", "border:1px solid black;padding:3px;background-color:#dbf1da;");
	});
	$(block).append(tableApplets);
}

function showPanel() {
	removeListSiebelInfo();
	getListSiebelInfo();
	$("#_dev01").toggle();
}

function ClipBoard(id) { //копирует содержание ссылки в буфер
	var textlink;
	var range;
	var successful;
	var ind = 0;
	while (!successful && ind < 25) {
		try {
			textlink = document.getElementById(id);
			range = document.createRange();
			range.selectNode(textlink);
			window.getSelection().addRange(range);
			successful = document.execCommand('copy');
		} catch (err) {

		} finally {
			ind++;
		}
	}
	window.getSelection().removeAllRanges();
}

document.onkeydown = function (e) {
	e = e || window.event;
	if (e.altKey && e.keyCode == 71) {
		showPanel();
	}
	return true;
};


$('#_dev00').mousedown(function (e) {
	differenceX = e.pageX - parseInt($('#_dev00').css('left'));
	differenceY = e.pageY - parseInt($('#_dev00').css('top'));
	mouse_event = 1;
});

document.onmouseup = function () {
	mouse_event = 0;
};

document.onmousemove = function (e) {
	if (mouse_event == 1) {
		$('#_dev00').css('left', e.pageX - differenceX);
		$('#_dev00').css('top', e.pageY - differenceY);
	}
};

function opacityChange() {
	let opacity = document.getElementById("dev_op").value;
	document.getElementById("_dev00").style.opacity = opacity / 10;
}