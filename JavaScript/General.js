/*Search*/
function myFunction() {
  var input, filter, ul, li, a, i, txtValue; // Declare variables
  input = document.getElementById('myInput'); // Get the input element by its ID
  filter = input.value.toUpperCase(); // Get the input value and convert it to uppercase
  ul = document.getElementById("myUL"); // Get the ul element by its ID
  li = ul.getElementsByTagName('li'); // Get all li elements within the ul

  if (filter === "") { // Check if the filter is an empty string
    ul.style.display = "none"; // Hide the ul element
    return; // Exit the function
  } else {
    ul.style.display = "block"; // Show the ul element
  }

  for (i = 0; i < li.length; i++) { // Loop through each li element
    a = li[i].getElementsByTagName("a")[0]; // Get the first a element within the li
    txtValue = a.textContent || a.innerText; // Get the text content of the a element
    if (txtValue.toUpperCase().indexOf(filter) > -1) { // Check if the text matches the filter
      li[i].style.display = ""; // Show the li element
    } else {
      li[i].style.display = "none"; // Hide the li element
    }
  }
}