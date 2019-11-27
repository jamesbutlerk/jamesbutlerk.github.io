
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*Go through the elements*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with the include attribute:*/
    file = elmnt.getAttribute("include");
    /*If it is an external file run the code */
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      /*Handle errors*/
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("include");
          includeHTML();
        }
      }
      /*Make get request*/
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
};
