window.onload = function () {
    LoadTable();
};

function LoadTable() {
    console.log("from document.onload");
    var oReq = new XMLHttpRequest();
    oReq.onload = function (e) {
        console.log("from document.onloadt onload");

        document.getElementById("tableOuput").innerHTML = this.responseText;
    };
    oReq.open("get", "Products/GetTable");
    oReq.send();
}

function AjaxGet(url) {
    console.log("from AjaxGet");
    var oReq = new XMLHttpRequest();
    oReq.onload = function (e) {
        console.log("from AjaxGet onload");
        document.getElementById("result2").innerHTML = 'Result: ' + this.responseText;
    };
    oReq.open("get", url);
    oReq.send();
}

function Search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchField");
    filter = input.value.toUpperCase();
    table = document.getElementById("tableOuput");
    var rows = table.getElementsByTagName("td");
    for (i = 0; i < rows.length; i++) {
        var cells = rows[i].parentNode.childNodes;
        var foundInRow = false;
        for (j = 0; j < cells.length; j++) {
            var cellValue = cells[j].textContent || row.innerText;
        
            if (cellValue) {
                txtValue = cellValue;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    foundInRow = true;
                }
            }
        }
        if (foundInRow) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
    
}