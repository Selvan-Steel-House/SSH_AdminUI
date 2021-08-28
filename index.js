// Show List of Registered users
  function generate_table() {
    document.getElementById("dvTable").style.display="";
    var customers = new Array();
    customers.push(["ID", "Name", "Mobile","Mail ID"]);

    customers.push([1, "John Hammond", "123456789","asfdg@gmail.com"]);
    customers.push([2, "John Ham", "123456789","asfdg@gmail.com"]);
    customers.push([3, "Hammond", "123456789","asfdg@gmail.com"]);
    customers.push([4, "John mond", "123456789","asfdg@gmail.com"]);

    var table = document.createElement("TABLE");
    table.classList.add("table");
    table.classList.add("table-bordered");
    //count of columns.
    var columnCount = customers[0].length;
    //header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    //data rows.
    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}

function close_table(){
    document.getElementById("dvTable").style.display="none";
}

/* SHOW UPLOADED IMAGE*/
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        document.getElementById("button").style.display="";
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

/*SHOW UPLOADED IMAGE NAME*/
var input = document.getElementById( 'upload' );
var infoArea = document.getElementById( 'upload-label' );

input.addEventListener( 'change', showFileName );
function showFileName( event ) {
  var input = event.srcElement;
  var fileName = input.files[0].name;
  infoArea.textContent = 'File name: ' + fileName;
}

// Upload and Cancel Button
function upload(){
    alert("Upload ad");
}

function cancel(){
    document.getElementById("imageResult").removeAttribute("src");
    document.getElementById( 'upload-label' ).innerHTML="Choose file";
    document.getElementById("button").style.display="none";
}


