﻿"use strict";

var mediator;

window.onload = function () {
    mediator = new UIMediator();
    Object.freeze(mediator);

    mediator.hideAll();

    document.getElementById("customFile").onchange = function () {
        var inputFile = document.getElementById("customFile");
        var fileName = inputFile.value.split("\\").pop();
        var label = document.getElementById("customFileLabel");
        label.classList.add("selected");
        label.innerHTML = fileName;
    };
};

function AJAXSubmit(oFormElement) {
    mediator.hideAll();
    if (!mediator.validateForm()) return;

    var oReq = new XMLHttpRequest();
    oReq.onload = function (e) {

        if (this.status == 200) {
            mediator.showSuccessMessage("Products file uploaded successfuly.");
        }
        else if (this.status == 400) {
            var data = JSON.parse(e.target.responseText);

            if (data.type == "xml-validation-error") {
                if (Array.isArray(data.errors) && data.errors.length > 0) {
                    mediator.showErrorMessage("Not able to upload products, please fix below errors:");
                    mediator.renderTable(data.errors);
                } else {
                    mediator.showErrorMessage("Not able to upload products file, please contact IT department");
                }
            }
            else if (data.type == "error") {
                mediator.showErrorMessage("Not able to upload products file: " + data.message);
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
        this.errorTableDiv = document.getElementById("errorTableDiv");
        this.inputFile = document.getElementById("customFile");
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

        this.errorTableDiv.append(table);
    }

    hideAll() {
        this.resultMessage.hideAll();

        var errorTable = document.getElementById("tableErrors");

        if (errorTable != undefined) {
            var parent = errorTable.parentElement;
            parent.removeChild(errorTable);
        }
    }

    validateForm() {
        if (!this.inputFile.files || this.inputFile.files.length == 0) {
            this.showErrorMessage("No file selected for uploading, please select a file");
            return false;
        }

        return true;
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

        for (var i = 0; i <= data.length; i++) {
            this.buildRow(table, i + 1, data[i]);
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
        tr.setAttribute("class", "text-left");
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
