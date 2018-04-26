$(document).ready(function(){
    $("input,select").css('margin-top','20px');
    $("#divId").css( {"width":"20%", "background-color": "#F1F1F1", "margin-left": "40%", "padding": "10px", "border": "1px solid black", "margin-top": "100px"} );
    $("#formButton").click(function(){
        validation();
    });
});

function validation(){
    event.stopPropagation();
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    var ddListValue = $("#dropDownList").prop("selectedIndex");
    var maleCheck=$("#genderMale").prop("checked");
    var feMaleCheck=$("#genderFemale").prop('checked');    
    var dateOfBirth=$("#dateOfBirth").val();
    var error=0;
    if(fName=="") 
    {
        alert("Please Provide Your First Name");
        error++;
    }
    if(lName==""){
        alert("Please Provide Your Last Name");
        error++;
    }
    if(ddListValue==0){
        alert("Please Select Your Nationality");
        error++;
    }
    if(!maleCheck && !feMaleCheck){
        alert("Please select your gender");
        error++;
    }

    if(!checkDOB(dateOfBirth))error++;
    if(error!=0)return;
   
    //if(maleCheck)gender="Male";
    //else gender="Female";
    
    // If no error
    alert("Success");
}

function checkDOB(dateOfBirth){
    var dateArray=dateOfBirth.split('/');

    if(dateArray.length!=3){
        alert("Please Use The Sample Format In Date of Birth");
        return;
    }

    if(dateArray.length!=3){
        alert("Please Use The Sample Format In Date of Birth");
        return;
    }

    var month=parseInt(dateArray[0]);
    var day=parseInt(dateArray[1]);
    var year=parseInt(dateArray[2]);

    var dayOfMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var months=["January","February","March","April","May","June","July", "August", "September","October", "November","December"];

    if(isNaN(month) || isNaN(day) || isNaN(year)){
        alert("Please Use Number Only In Date of Birth");
        return false;
    }

        
    if(month<=0 || month>12){
        alert("Invalid Month");
        return false;
    }

    if(month==2 && (year%100!=0) && (year%4==0) && day<=29 && day>0){
        return true;
    }

    if(day> dayOfMonths[month-1] || day<1){
        alert("Invalid Day In Month "+months[month-1]);
        return false;
    }

    return true;
    
}