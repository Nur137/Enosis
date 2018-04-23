
// Printing
document.write("Hello World");

// Initializing variable
var var1 = 20;
var var2 = 10;

// Addition
document.write("</br>")
document.write(var1 + var2 + "</br>")
document.write(var2 % var1 + "</br>")
document.write(var2 | var1)
document.write("</br>")
document.write("Hello ");


document.write("((a > b) ? 100 : 200) => ");
result = (var1 > var2) ? 100 : 200;
document.write(result);
document.write("</br>")

document.write(typeof checkscope);
document.write("</br>")


var grade='A';
document.write("Entering switch block<br />");
switch (grade)
{
   case 'A': document.write("Good job<br />");
   break;

   case 'B': document.write("Pretty good<br />");
   break;

   case 'C': document.write("Passed<br />");
   break;

   case 'D': document.write("Not so good<br />");
   break;

   case 'F': document.write("Failed<br />");
   break;

   default:  document.write("Unknown grade<br />")
}
document.write("Exiting switch block");
document.write("</br>");


// For loop check
var iterator
for(iterator=0;iterator<5;iterator++){
    document.write(iterator+1);
    document.write("</br>");
}

// Pattern printing
for(var i=0;i<5;i++){
    for(var j=0;j<=i;j++){
        document.write("*");
    }
    document.write("</br>");
}

var arr = new Array(1,2,3,"Hello",5);

for(i in arr){
    document.write(arr[i]);
    document.write("</br>");
}


// sayHello() function definition
function sayHello() {
    alert("Hello World" + ++var1);
}

myVar = "global"; // Declare a global variable
function checkscope() {
    myVar = "local";  // Declare a local variable
    document.write("</br>")
    document.write(myVar);
}

