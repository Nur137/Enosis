window.onload = init;

function init() {
    document.getElementById("abc").innerHTML = "<table style=\"border:1px solid blue\"> <tr> <th>Firstname</th> <th>Lastname</th>  <th>Age</th> </tr>  <tr> <td>Nur</td> <td>Imtiazul</td>  <td>23</td> </tr> </table>";
    document.getElementById("abc").style.color = "red";
    document.getElementsByClassName("demo")[1].innerHTML = "<table style=\"border:1px solid blue\"> <tr> <th>Firstname</th> <th>Lastname</th>  <th>Age</th> </tr>  <tr> <td>Nur</td> <td>Imtiazul</td>  <td>23</td> </tr> </table>";
    var item = document.getElementsByClassName("demo");
    //document.write(document.querySelectorAll("p").length);

    document.getElementById("div1").removeChild(document.getElementById("p1"));
    
    var bodyTag=document.getElementsByTagName("body")[0];

    var para = document.createElement("p");
    var node = document.createTextNode("NUR IMTIAZ.");
    para.appendChild(node);

    bodyTag.appendChild(para);
}

function func(id){
    id.innerHTML="asdsdf";
}

function changeFunc(id){
    id.value=id.value.toUpperCase();
}

function mouseFunc(id){
    id.style.color="red";
}

function mouseUpFunc(id){
    id.style.color="blue";
}
