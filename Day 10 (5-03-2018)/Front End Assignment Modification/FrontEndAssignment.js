var users = [] // array of user type objects (table entry)
var tempImage; // for storing image data (base64 format) 
var contentId; // id of users for updating table data
var ascendingFactor = true;  // ascendingFactor= true means data will be shown in ascending order
var arr = []; // set for autocomplete search data source
var actualUserList = []  // for holding actual list (for handling non sorting list)


// on page load
$(document).ready(function () {
    fact = 1;         // making sorting acsending

    // autocomplete search source
    $("#autocomplete-search").autocomplete({
        source: arr
    });

    // autocomplete search button click
    $("#autocomplete-search-button").click(function () {
        removeTableData();
        loadTableUsingAutocompleteSearchData($("#autocomplete-search").val());
    });

    // showing back all entry
    $("#autocomplete-search-show-all-button").click(function () {
        removeTableData();
        loadTable();
    });

    // form button click 
    $("#formButton").click(function (event) {
        event.preventDefault()

        // taking vaues from input fields
        var name = $("#inputName").val();
        var address = $("#inputAddress").val();
        var rating = $("#ratingList").prop("selectedIndex");

        // checking fields are non-empty or not
        if (!checkFields(name, address, rating)) return;


        // on insert button click
        if ($("#formButton").val() == "Insert") {
            formInsertButtonTask(name, address, rating);
        }


        // on update button click
        else if ($("#formButton").val() == "Update") {
            formUpdateButtonTask(name, address, rating);
        }

        clearForm();
        arrr = [];
        for (user in users) {
            var current = users[user].name;
            if (!arr.includes(current)) arr.push(current);
        }

        // for preventing page load
        return false;
    });

    // image file selection on image choosing button click
    $("#select-image").change(function (e) {
        readURL(this);
    });

    // sorting table
    $("#sort").click(function () {
        sortUsers(false);
        if (ascendingFactor) {
            $("#sort").attr("src", "Images/down_arrow.png");
            ascendingFactor = false;
        }
        else {
            $("#sort").attr("src", "Images/up_arrow.png");
            ascendingFactor = true;
        }
    });

    // non sorting effect on table
    $("#neutral").click(function () {
        sortUsers(true);
    });


    // for update button click on dynamic table
    $("#dynamicTable").on("click", ".update", function () {
        var currentRow = $(this).closest("tr").prop("id");
        updateRow(currentRow);
        return false;
    });

    // for delete button click on dynamic table
    $("#dynamicTable").on("click", ".delete", function () {
        var currentRow = $(this).closest("tr").prop("id");
        deleteRow(currentRow);
        return false;
    });

})

// cleaning table
function removeTableData() {
    $("table tbody").remove();
}

// loading data from users array
function loadTable() {
    var $table = $('<table>');
    // tbody
    var $tbody = $table.append('<tbody/>').children('tbody');


    for (var i = 0; i < users.length; i++) {

        $tbody.append('<tr/>').children('tr:last')
            .append("<td>" + users[i].name + "</td>")
            .append("<td>" + users[i].address + "</td>")
            .append("<td>" + starRating(users[i].rating) + "</td>")
            .append("<td><img id=\"table-image\"  src=" + users[i].image + "></img></td>")
            .append("<td><button class=\"update btn-success\">Update</button> <button class=\"delete btn-danger\">Delete</button></td>").attr('id', "row" + i);
    }

    $tbody.appendTo('#dynamicTable');

    //table.append('</tbody>');
}

// clear form 
function clearForm() {
    tempImage = "";
    $("#tourist-img").attr("src", "");
    $("#inputName").val("");
    $("#inputAddress").val("");
    $("#ratingList").val("Select Your Nationality");
    $("#select-image").val("");
}

// loading data from users array (auto-complete names)
function loadTableUsingAutocompleteSearchData(name) {
    var $table = $('<table>');
    // tbody
    var $tbody = $table.append('<tbody/>').children('tbody');

    // Show all data if input field is empty
    if (name == "") {
        removeTableData();
        loadTable();
        return;
    }

    // substring search
    for (var i = 0; i < users.length; i++) {
        if (users[i].name.startsWith(name)) {
            $tbody.append('<tr/>').children('tr:last')
                .append("<td>" + users[i].name + "</td>")
                .append("<td>" + users[i].address + "</td>")
                .append("<td>" + starRating(users[i].rating) + "</td>")
                .append("<td><img id=\"table-image\"  src=" + users[i].image + "></img></td>")
                .append("<td><button class=\"update btn-success\">Update</button> <button class=\"delete btn-danger\">Delete</button></td>").attr('id', "row" + i);
        }
    }
    $tbody.appendTo('#dynamicTable');
}

// Image file selection
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#tourist-img').attr('src', e.target.result);
            tempImage = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// Checking fields
function checkFields(name, address, rating) {
    if (name == "") {
        alert("Name Field Can Not Be Empty");
        return false;
    }
    if (address == "") {
        alert("Address Field Can Not Be Empty");
        return false;
    }
    if (!rating) {
        alert("Please Provide a Rating For the Place");
        return false;
    }

    if (tempImage == undefined || tempImage == "") {
        alert("Please provide an image");
        return false;
    }
    return true;
}

// inserting element in table
function formInsertButtonTask(name, address, rating) {
    var initialRanking = users.length;
    var user = {
        name: name,
        address: address,
        rating: rating,
        image: tempImage,
        initialRanking: initialRanking
    };
    // pushing user object in users array
    users.push(user);
    actualUserList.push(user);
    // regenerate table
    removeTableData();
    loadTable();
    //clearForm();
}

// updating table content
function formUpdateButtonTask(name, address, rating) {
    users[contentId] = {
        name: name,
        address: address,
        rating: rating,
        image: tempImage
    };
    // regenerate table
    removeTableData();
    loadTable();
    // changing text of form button to "Update"
    $("#formButton").val("Insert");
}

// loading form using update button of table
function tableUpdateButtonTask(rowId) {

    // changing text of form button to "Update"
    $("#formButton").val("Update");
    tempImage = users[rowId].image;
    $("#tourist-img").attr("src", tempImage);
    $("#inputName").val(users[rowId].name);
    $("#inputAddress").val(users[rowId].address);
    $("#ratingList").val(users[rowId].rating);
    users[rowId].image = tempImage;
    contentId = rowId;
}

// deleting particular table content
function tableDeleteButtonTask(rowId) {
    if (confirm("Do you want to delete current row?")) {
        users.splice(rowId, 1);
        // regenerating table
        removeTableData();
        loadTable();
    }
}

// for sorting users
function sortUsers(neutralFactor) {
    if (neutralFactor) users.sort(restoreTable);
    else users.sort(compare);
    // regenerating table
    removeTableData();
    loadTable();
}

function restoreTable(user1, user2) {
    if (user1.initialRanking < user2.initialRanking) return -1;
    else if (user1.initialRanking > user2.initialRanking) return 1;
}

// comparing users to sort
function compare(user1, user2) {
    var fact = 1;
    if (!ascendingFactor) fact = -1;
    // consider rating first
    if (user1.rating < user2.rating)
        return -1 * fact;
    if (user1.rating > user2.rating)
        return 1 * fact;

    // if 2 ratings are equal
    if (user1.name < user2.name)
        return -1 * fact;
    if (user1.name > user2.name)
        return 1 * fact;

    // if 2 addresses are equal
    if (user1.address < user2.address)
        return -1 * fact;
    if (user1.address > user2.address)
        return 1 * fact;
}

function updateRow(currentRow) {
    rowId = parseInt(currentRow.substr(3, currentRow.length - 1));
    tableUpdateButtonTask(rowId);
}

function deleteRow(currentRow) {
    rowId = parseInt(currentRow.substr(3, currentRow.length - 1));
    tableDeleteButtonTask(rowId);
}

function starRating(rating) {
    var stars = "";
    for (var i = 0; i < rating; i++)stars += "<span class=\"fa fa-star checked\"></span>";
    for (var i = 0; i < (5 - rating); i++)stars += "<span class=\"fa fa-star\"></span>";

    return stars;
}