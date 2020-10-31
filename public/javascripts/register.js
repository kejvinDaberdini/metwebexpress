const password = document.getElementById("password");
const confirm_password = document.getElementById("password2");

function validatePassword(){
  if(password.value != password2.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;