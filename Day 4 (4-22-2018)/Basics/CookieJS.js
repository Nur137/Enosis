document.write("Hello");
var browsername=navigator.appName;

// document.write(browsername);
// if( browsername == "Netscape" )
// {
//    window.location="http://www.google.com";
// }
// else if ( browsername =="Microsoft Internet Explorer")
// {
//    window.location="http://www.location.com/ie.htm";
// }
// else
// {
//    window.location="http://www.google.com";
// }

function WriteCookie() {
    if (document.myform.customer.value == "") {
        alert("Enter some value!");
        return;
    }
    cookievalue = escape(document.myform.customer.value) + ";";
    document.cookie = "name=" + cookievalue;
    document.write("Setting Cookies : " + "name=" + cookievalue);
}

function Redirect() {

    window.location="http://www.tutorialspoint.com";
 }