window.onload=init;

function init(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            //document.getElementById("demo").innerHTML = Object.values(myObj);
            
            
            for(items in myObj){
                var userId= myObj[items].userId;
                var id= myObj[items].id;
                var title= myObj[items].title;
                var body= myObj[items].body;
                //document.getElementById("demo").innerHTML+=userId+ " "+ id + " "+ title+" "+ body+ "</br>";
                
                var tab= document.getElementsByClassName("tableClass")[0];
                
    
                var tr = document.createElement("tr");
                var userIdTd = document.createElement("td");
                var idTd = document.createElement("td");
                var titleTd = document.createElement("td");
                var bodyTd = document.createElement("td");

                var userIDtxt = document.createTextNode(userId);
                var idTxt = document.createTextNode(id);
                var titleTxt = document.createTextNode(title);
                var bodyTxt = document.createTextNode(body);
                
    
                userIdTd.appendChild(userIDtxt);
                idTd.appendChild(idTxt);
                titleTd.appendChild(titleTxt);
                bodyTd.appendChild(bodyTxt);

                tr.appendChild(userIdTd);
                tr.appendChild(idTd);
                tr.appendChild(titleTd);
                tr.appendChild(bodyTd);
                
                tab.appendChild(tr);
    
            }
        }
    };
    xmlhttp.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
    xmlhttp.send();
}