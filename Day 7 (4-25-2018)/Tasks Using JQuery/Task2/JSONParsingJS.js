$(function () {
    $.get("https://jsonplaceholder.typicode.com/posts", function (responseTxt, statusTxt, xhr) {
        if (statusTxt == "success")
            parsing(responseTxt);
        if (statusTxt == "error")
            alert("Error: " + xhr.status + ": " + xhr.statusText);
    });
});

function parsing(myObj) {
    //alert(myObj);
    for (items in myObj) {
        var userId = myObj[items].userId;
        var id = myObj[items].id;
        var title = myObj[items].title;
        var body = myObj[items].body;
        var tab = $(".tableClass")[0];

        var tr = document.createElement("tr");
        var userIdTd = document.createElement("td");
        var idTd = document.createElement("td");
        var titleTd = document.createElement("td");
        var bodyTd = document.createElement("td");

        var userIDtxt = document.createTextNode(userId);
        var idTxt = document.createTextNode(id);
        var titleTxt = document.createTextNode(title);
        var bodyTxt = document.createTextNode(body);

        //var a= $("<td></td>").text(userIdTxt);
        //alert(a);
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
