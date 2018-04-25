window.onload=init;

function init(){

}
function validation(){
    event.stopPropagation();
    var fName = document.getElementById("firstName").value;
    var lName = document.getElementById("lastName").value;
    var ddListValue = document.getElementById("dropDownList").selectedIndex;
    var maleCheck=document.getElementById("genderMale").checked;
    var feMaleCheck=document.getElementById("genderFemale").checked;
    var dateOfBirth=document.getElementById("dateOfBirth");
    
    var gender;


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

    if(!checkDOB(dateOfBirth.value))error++;
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