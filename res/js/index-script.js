function isEmpty(id) {
	const inputVal = document.getElementById(id).value;
	if (inputVal.length === 0) {
		feedback(id, false, "This field should not be empty.");
		return true;
	}
	return false;
}

function feedback(id, isValid, message) {
	const feedback = document.getElementById(id.concat("-feedback"));
	const formInput = document.getElementById(id);
	if(isValid) {
		feedback.classList.remove("feedback-invalid");
		formInput.classList.remove("form-red");

		feedback.classList.add("feedback-valid");
		formInput.classList.add("form-green");
	}
	else {
		feedback.classList.remove("feedback-valid");
		formInput.classList.remove("form-green");

		feedback.classList.add("feedback-invalid");
		formInput.classList.add("form-red");
	}
	while(feedback.firstChild) {
		feedback.removeChild(feedback.firstChild);
	}
	feedback.appendChild(document.createTextNode(message));
}

/* USERNAME ONCHANGE */
const usernameFormat = /^\w+$/;

function usernameIsValid() {
	const inputVal = document.getElementById("username").value;
	if(isEmpty("username")) {
		return false;
	}
	if (!inputVal.match(usernameFormat)) {
		feedback("username", false,"A username can contain letters, numbers and underscore.");
		return false;
	}
	feedback("username", true, "Looks Good.");
	return true;
}

/* PASSWORD ONCHANGE */

const passwordFormat = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

function passwordIsValid() {
	const inputVal = document.getElementById("password").value;

	if(isEmpty("password")) {
		return false;
	}

	if (!inputVal.match(passwordFormat)) {
		if(inputVal.length > 16 || inputVal.length < 8) {
			feedback("password", false, "Password should be at least 8 and at most 16 characters long.");
			return false;
		}
		else {
			feedback("password", false, "Password should contain uppercase letter, digit and special character.");
			return false;
		}
	}
	else {
		feedback("password", true, "Looks Good.");
		return true;
	}
}

let isHidden = true;

function hidePass() {
	const icon = document.getElementById("pass-vis");
	const field = document.getElementById("password");
	if (isHidden) {
		field.setAttribute("type", "password");
		icon.classList.remove("fa-eye-slash");
		icon.classList.add("fa-eye");
	}
	else {
		field.setAttribute("type", "text");
		icon.classList.remove("fa-eye");
		icon.classList.add("fa-eye-slash");
	}
	isHidden = !isHidden;
}

/* LOGIN ONCLICK */

function formIsValid() {
	const validity = usernameIsValid() & passwordIsValid();
	const username = document.getElementById("username").value;
	if (validity) {
		document.getElementById("section-login-hide").style.display = 'none';
		document.getElementById("h4-welcome").textContent = 
		"Welcome " + username + ",\nWe are so happy to see you!";
		document.getElementById("section-login-show").style.display = 'block';
	}
}