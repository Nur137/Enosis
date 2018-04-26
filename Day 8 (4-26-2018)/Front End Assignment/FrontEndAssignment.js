var names = [];
var addresses = [];
var pictures = [];
var ratings = [];
var images = [];
var tempImage;

// On page load
$(document).ready(function () {
    $("#formButton").click(function () {
        var name = $("#inputName").val();
        var address = $("#inputAddress").val();
        var ratingListValue = $("#ratingList").prop("selectedIndex");
        //fruits.push("Mango");
        //alert(fruits);
        if (name == "") {
            alert("Name Field Can Not Be Empty");
            return;
        }
        if (address == "") {
            alert("Address Field Can Not Be Empty");
            return;
        }
        if (!ratingListValue) {
            alert("Please Provide a Rating For the Place");
            return;
        }

        //Adding in array;
        names.push(name);
        addresses.push(address);
        ratings.push(ratingListValue);
        images.push(tempImage);
       
        removeTableData();
        loadtable();
       
        // For preventing page load
        return false;
    });

    
    $("#select-image").change(function (e) {
        readURL(this);
    });

    $("table").on( "click","button",function() {
        var id=this.id;
        var rowId;
        // update
        if(id.charAt(0)=='u'){
            rowId=id.substr(1,id.length-1);
            //alert("Update");
        }
        // delete
        if(id.charAt(0)=='d'){
            removeTableData();
            loadtable();
            rowId=id.substr(1,id.length-1);
            names.splice(rowId,1);
            addresses.splice(rowId,1);
            images.splice(rowId,1);
            ratings.splice(rowId,1);
            //alert("Delete");
         }
         //alert(rowId);

         return false;
    });
})


function removeTableData() {
    $("table tbody").remove();
}

function loadtable() {
   $("table").append('<tbody>');
    for (var i = 0; i < names.length; i++) {    
        $("table").append([
            '<tr>',
            '<td>' + names[i] + '</td>',
            '<td>' + addresses[i] + '</td>',
            '<td>' + ratings[i] + '</td>',
            '<td ><img id="table-image"  src='+ images[i]  + '></img></td>',
            '<td><button id= u'+i+'></button><button id=d'+i+'></button></td>',
            '</tr>'
        ]);
    }
    $("table").append('</tbody>');
    
}

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#tourist-img').attr('src', e.target.result);
            tempImage = e.target.result;
            //alert(tempImage);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
