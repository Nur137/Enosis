var users = [] // array of user type objects (table entry)
var tempImage; // for storing image data (base64 format) 
var contentId; // id of users for updating table data
var fact;  // fact=1 means ascending, fact=-1 means descending
var arr = []; // set for autocomplete search data source
var actualUserList=[]  // for holding actual list (for handling non sorting list)

// on page load
$(document).ready(function () {
    fact = 1;         // making sorting acsending

    // autocomplete search source
    $("#autocomplete-search").autocomplete({
        source: arr
    });

    // autocomplete search button click
    $("#autocomplete-search-button").click(function(){
        removeTableData();
        loadTableUsingAutocompleteSearchData($("#autocomplete-search").val());
    });

    // showing back all entry
    $("#autocomplete-search-show-all-button").click(function(){
        removeTableData();
        loadTable();
    });

    // form button click 
    $("#formButton").click(function () {

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
        sortUsers();
        fact *= -1;    // changing sorting factor
        if (fact == 1) $("#sort").attr("src", "Images/down_arrow.png");
        else $("#sort").attr("src", "Images/up_arrow.png");
    });

    // non sorting effect on table
    $("#neutral").click(function(){
        users=actualUserList;
        removeTableData();
        loadTable();
    });

    // for dynamic button click
    $("table").on("click", "button", function () {
        var id = this.id;
        var rowId;
        // update
        if (id.charAt(0) == 'u') {
            // parsing row id from button id example: u11
            rowId = parseInt(id.substr(1, id.length - 1));
            tableUpdateButtonTask(rowId);
        }
        // delete
        if (id.charAt(0) == 'd') {
            // parsing row id from button id example: u11
            rowId = parseInt(id.substr(1, id.length - 1));
            tableDeleteButtonTask(rowId);
        }

        // for preventing page reload
        return false;
    });
})

// cleaning table
function removeTableData() {
    $("table tbody").remove();
}

// loading data from users array
function loadTable() {
    $("table").append('<tbody>');
    for (var i = 0; i < users.length; i++) {
        $("table").append([
            '<tr>',
            '<td>' + users[i].name + '</td>',
            '<td>' + users[i].address + '</td>',
            '<td>' + users[i].rating + '</td>',
            '<td ><img id="table-image"  src=' + users[i].image + '></img></td>',
            '<td><button id= u' + i + '>Update</button><button id=d' + i + '>Delete</button></td>',
            '</tr>'
        ]);
    }
    $("table").append('</tbody>');
}

// loading data from users array (auto-complete names)
function loadTableUsingAutocompleteSearchData(name) {
    $("table").append('<tbody>');
    for (var i = 0; i < users.length; i++) {
        if (users[i].name == name) {
            $("table").append([
                '<tr>',
                '<td>' + users[i].name + '</td>',
                '<td>' + users[i].address + '</td>',
                '<td>' + users[i].rating + '</td>',
                '<td ><img id="table-image"  src=' + users[i].image + '></img></td>',
                '<td><button id= u' + i + '>Update</button><button id=d' + i + '>Delete</button></td>',
                '</tr>'
            ]);
        }
    }
    $("table").append('</tbody>');
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

    if (tempImage == undefined) {
        alert("Please provide an image");
        return false;
    }
    return true;
}

// inserting element in table
function formInsertButtonTask(name, address, rating) {
    var user = {
        name: name,
        address: address,
        rating: rating,
        image: tempImage
    };
    // pushing user object in users array
    users.push(user);
    actualUserList.push(user);
    // regenerate table
    removeTableData();
    loadTable();
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
    if (confirm("Press a button!")) {
        users.splice(rowId, 1);
        // regenerating table
        removeTableData();
        loadTable();
    }
}

// for sorting users
function sortUsers() {
    users.sort(compare);
    // regenerating table
    removeTableData();
    loadTable();
}

// comparing users to sort
function compare(user1, user2) {
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