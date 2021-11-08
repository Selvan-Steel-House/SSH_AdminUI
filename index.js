//OnLoad Token Generation
window.onload = function(){
  console.log("loaded",window.location.href);
  var arr = window.location.href.split("/");

  if(!localStorage.getItem("token")&&arr[arr.length-1]!="index.html"){
    window.location.href = "./index.html";
  }
  else{
    if(arr[arr.length-1]=="index.html"){
      localStorage.removeItem("token");
    }
  }
}

// Registered Users Section
// ------------------------------------------
//Table Search
$('#search').on('keyup', function(){
    var value = $(this).val(); 
    // console.log("value", value);
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
// ---------------------------------------------

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
                uploadAd(fileUpload.files[0]);
            }
        }
        else {
            alert("Please Choose an image with size less dhan 5MB");
        }
        //uploadAd(fileUpload.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

function showBanners(){
  var myHeaders = new Headers();
  var banners;
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImN1c3RvbWVySWQiOiI5MTc2MjIzODM1IiwibmFtZWAiOiJTdW5ueSJ9LCJpYXQiOjE2MzQ5OTAwMjQsImV4cCI6MTY2NjUyNjAyNH0.mihGwhKvf-hF25BlN6DKASkDFrbIa-Fl8hGFabaW14g");

  var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
  };
    
  var table = document.getElementById("adTable");
  table.innerHTML='';

  fetch(app_endpoint+"/v1/api/admin/ad/banner-details", requestOptions)
  .then(response => response.json())
  .then(json => {
        console.log(json);
        banners = json.bannerDetails;
        for(let i = 0;i<banners.length;i++){
        let banid = banners[i].bannerId;
        var row = `<tr>
        <td>${banners[i].bannerId}</td>
        <td><img src=${banners[i].downloadUrl} width="300px" height="300px"></td>
        <td><button class="btn btn-sm btn-danger banner-delete" id = "${banid}" onClick="remove('${banners[i].bannerId}')">Remove</button></td>
        </tr>`
        table.innerHTML +=row;
      }
    })
  .catch(error => console.log('error', error));
}


//Display Ad Banners
function AdBanner(){
  showBanners();
  document.getElementById("bannerTable").style.display="";
  }

// Upload Ad Button
function uploadAd(file) {
  //console.log(file);
  const form = new FormData();
  form.append(
    "image-upload-multiple",
    file
  );
  
  fetch(
    app_endpoint+"/v1/api/admin/ad/banners",
    {
      method: "POST",
      body: form,
      headers: {
        // "Content-Type":
        //   "multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM",
        authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImN1c3RvbWVySWQiOiI5MTc2MjIzODM1IiwibmFtZWAiOiJTdW5ueSJ9LCJpYXQiOjE2MzQ5OTAwMjQsImV4cCI6MTY2NjUyNjAyNH0.mihGwhKvf-hF25BlN6DKASkDFrbIa-Fl8hGFabaW14g",
      },
      
    }
  )
  .then((response) => {
      //console.log(response);
      
    })
    .catch((err) => {
      console.error(err);
  });
}

// Cancel upload Button
function cancel(){
  document.getElementById("imageResult").removeAttribute("src");
  document.getElementById("button").style.display="none";
}

// Done Upload
function done(){
  alert("SSH Admin: Ad Banner uploaded successfully!")
  AdBanner();
  document.getElementById("imageResult").removeAttribute("src");
  document.getElementById("button").style.display="none";
}

// Remove Ad Button
function remove(i){
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImN1c3RvbWVySWQiOiI5MTc2MjIzODM1IiwibmFtZWAiOiJTdW5ueSJ9LCJpYXQiOjE2MzQ5OTAwMjQsImV4cCI6MTY2NjUyNjAyNH0.mihGwhKvf-hF25BlN6DKASkDFrbIa-Fl8hGFabaW14g"
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      app_endpoint+"/v1/api/admin/ad/banner/"+i,
      requestOptions
    )
      .then((response) => response.json())
      .then(json => {
        //console.log(json);
        alert("SSH Admin: Ad Banner has removed successfully.");
        showBanners();
      })
      .catch((error) => console.log("error", error));
}


// Admin Login
function adminLogin(){
  var username = document.getElementById("loginid").value;
  var password = document.getElementById("loginpwd").value;
  fetch("https://dev.api.selvansteelhouse.in/v1/api/admin/ad/admin-login", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": JSON.stringify({username:username,password:password})
})
.then(response=>response.text()).then(data=>{
  //console.log(data);
  //console.log(JSON.parse(data).token);
  if(JSON.parse(data).isSuccess==="true"){
    localStorage.setItem("token","Bearer "+JSON.parse(data)?.token);
    window.location.href = "./home.html";
  }
  else{
    alert("SSH Admin: Invalid Credentials. Please Verify.");
  }
  
})
.catch(err => {
  console.error(err);
});
}






