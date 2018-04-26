$(function () {

    var request = $.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        method: "GET",
        success: function (result) {
            parsing(result);
        }

    });

    // $.get("https://jsonplaceholder.typicode.com/posts", function (responseTxt, statusTxt, xhr) {
    //     if (statusTxt == "success")
    //         parsing(responseTxt);
    //     if (statusTxt == "error")
    //         alert("Error: " + xhr.status + ": " + xhr.statusText);
    // });
});

function parsing(myObj) {
    //alert(myObj);
    for (items in myObj) {
        var userId = myObj[items].userId;
        var id = myObj[items].id;
        var title = myObj[items].title;
        var body = myObj[items].body;
        var tab = $(".tableClass");

        $(".tableClass").append([
            '<tr>',
            '<td>' + userId + '</td>',
            '<td>' + id + '</td>',
            '<td>' + title + '</td>',
            '<td>' + body + '</td>',
            '</tr>'
        ]);

    }
}