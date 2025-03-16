


document.addEventListener("DOMContentLoaded", function () {

    
     let tabledata = document.getElementById('table');
    
     let row = tabledata.insertRow()
    
     let name = row.insertCell(0);
    
   
     fetch('/alluser')
     .then((response) => {
        return response.text();
     })
     .then((data) => {
        name.innerHTML = data;
     })
     .catch((error) => {
        console.err("Fetching error!! data not get",error);
     })
       
});


