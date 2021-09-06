//JSON to HTML Table
//replace API response JSON 
var myArray = [
    {
        "customer_id": "1234",
        "customer_name": "Ramu",
        "customer_phone": "123456789",
        "customer_mail": "asdf@fgh.com"
      },
       {
        "customer_id": "1234",
        "customer_name": "Samu",
        "customer_phone": "123456789",
        "customer_mail": "asdf@ghj.com"
      },
      {
        "customer_id": "1234",
        "customer_name": "Damu",
        "customer_phone": "123456789",
        "customer_mail": "asdf@ghj.com"
      },
      {
        "customer_id": "1234",
        "customer_name": "Pamu",
        "customer_phone": "123456789",
        "customer_mail": "asdf@ghj.com"
      }
];

var banners = [
    {
      "ad_id": "1234",
      "ad_url": "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg"
    },
    {
      "ad_id": "5678",
      "ad_url": "https://img.freepik.com/free-vector/dark-paper-layers-wallpaper-with-golden-details_23-2148403401.jpg?size=626&ext=jpg"
    },
    {
        "ad_id": "4567",
        "ad_url": "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg"
      }
  ];


//Table Search
$('#search').on('keyup', function(){
    var value = $(this).val(); 
    // console.log("value", valu e);
    var data = searchTable(value, myArray)
    buildTable(data);
})

buildTable(myArray);

function searchTable(value, data){
    var newData = [];
    for(var i=0; i<data.length; i++){
        value = value.toLowerCase();
        var name = data[i].customer_name.toLowerCase();
        if(name.includes(value)){
            newData.push(data[i]);
        }
    }
    return newData;
}


function buildTable(data){
    var table = document.getElementById("myTable");
    table.innerHTML='';
    for(var i=0; i<data.length; i++){
        var row = `<tr>
        <td>${data[i].customer_id}</td>
        <td>${data[i].customer_name}</td>
        <td>${data[i].customer_phone}</td>
        <td>${data[i].customer_mail}</td>
        </tr>`
        table.innerHTML +=row;
    }
}

//Show Table
function show_table() {
    document.getElementById("dvTable").style.display="";
    document.getElementById("close").style.display="";
}

//Close Table
function close_table(){
    document.getElementById("dvTable").style.display="none";
    document.getElementById("close").style.display="none";
}



// Ad Banner JS

/* SHOW UPLOADED IMAGE*/
function readURL(input) {
    var fileUpload = document.getElementById("upload");
    if (typeof (fileUpload.files) != "undefined") {
        var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);
        // alert(size + " KB.");
        if(size<=5000){
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
        else {
            alert("Please Choose an image with size less dhan 5MB");
        }
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

function showBanners(data){
    var table = document.getElementById("adTable");
    table.innerHTML='';
    for(var i=-0; i<data.length; i++){
        var row = `<tr>
        <td>${data[i].ad_id}</td>
        <td><img src=${data[i].ad_url}></td>
        <td><button class="btn btn-sm btn-danger" onClick=remove(${data[i].ad_id})>Remove</button></td>
        </tr>`
        table.innerHTML +=row;
    }
}


//Display Ad Banners
function AdBanner(){
    showBanners(banners);
    document.getElementById("bannerTable").style.display="";
    }

    // Upload Ad Button
function uploadAd(){
   alert("Ad Upload Clicked");
    }

// Cancel upload Button
function cancel(){
    document.getElementById("imageResult").removeAttribute("src");
    document.getElementById("button").style.display="none";
}

// Remove Ad Button
function remove(id){
    alert("Remove Ad Clicked, ID : " + id);
}

