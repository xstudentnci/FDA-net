"use strict";

window.onload = function () {
    //TODO: have a live instance
    new UIMediator().hideAll();
};

function AJAXSubmit(oFormElement) {

    var mediator = new UIMediator();
    mediator.hideAll();

    var oReq = new XMLHttpRequest();
    oReq.onload = function (e) {

        if (this.status == 200) {
            mediator.showSuccessMessage("Products file uploaded successfuly.");          
        }
        else if (this.status == 400) {
            var data = JSON.parse(e.target.responseText);

            if (Array.isArray(data) && data.length > 0) {

                mediator.showErrorMessage("Not able to upload products, please fix below errors:");

                var tableBuilder = new TableBuilder();
                var table = tableBuilder.build(data, ["Id", "Error  message"]);

                document.getElementById("errorTable").append(table);
            }
        }
        else {
            mediator.showErrorMessage("Not able to upload products file, please contact IT department");
        }
    };

    oReq.open("post", oFormElement.action);
    oReq.send(new FormData(oFormElement));
}

class UIMediator {
    constructor() {
        this.resultMessage = new ResultMessage();        
    }

    showSuccessMessage(message) {
        this.resultMessage.hideAll();
        this.resultMessage.showSuccessMessage(message);
    }

    showErrorMessage(message) {
        this.resultMessage.hideAll();
        this.resultMessage.showErrorMessage(message);
    }

    renderTable(data) {
        var tableBuilder = new TableBuilder();
        var table = tableBuilder.build(data, ["Id", "Error  message"]);

        this.errorTable.append(table);
    }

    hideAll() {
        this.resultMessage.hideAll();

        var errorTable = document.getElementById("tableErrors");      

        if (errorTable != undefined) {
            var parent = errorTable.parentElement;
            parent.removeChild(errorTable);           
        }
    }
}

class ResultMessage {
    constructor() {
        this.successMessageDiv = document.getElementById("successMessageDiv");
        this.errorMessageDiv = document.getElementById("errorMessageDiv");
    }

    showSuccessMessage(message) {
        this.successMessageDiv.removeAttribute("hidden");
        this.successMessageDiv.textContent = message;
    }

    showErrorMessage(message) {
        this.errorMessageDiv.removeAttribute("hidden");
        this.errorMessageDiv.textContent = message;
    }

    hideAll() {    
        this.successMessageDiv.setAttribute("hidden", "true");
        this.errorMessageDiv.setAttribute("hidden", "true");
    }
}

class TableBuilder {
    constructor() {
    }

    build(data, columnNames) {
        var table = document.createElement("table");
        table.setAttribute("id", "tableErrors");
        table.setAttribute("class", "table table-striped table-bordered table-condensed");
        this.buildHeader(table, columnNames);

        for (var i = 1; i <= data.length; i++) {
            this.buildRow(table, i, data[i]);
        }

        return table;
    }

    buildHeader(table, columnNames) {

        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        thead.appendChild(tr);
        table.appendChild(tr);

        for (var i = 0; i < columnNames.length; i++) {

            var th = document.createElement("th");
            var textNode = document.createTextNode(columnNames[i]);
            th.appendChild(textNode);
            tr.appendChild(th);
        }

        return table;
    }

    buildRow(table, id, value) {
        if (value == undefined) return table;

        var tr = document.createElement("tr");

        if (id % 2 != 0) {
            tr.setAttribute("style", "background-color:rgba(0, 0, 0, 0.05)");
        }
        table.appendChild(tr);

        this.buildCell(tr, id);
        this.buildCell(tr, value);

        return table;
    }

    buildCell(tr, value) {
        var td = document.createElement("td");
        var textNode = document.createTextNode(value);
        td.appendChild(textNode);
        tr.appendChild(td);
    }
}