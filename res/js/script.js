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

/* NAME-SURNAME ONCHANGE */

const letters = /^[a-zA-Z]+$/;

function hasOnlyLetters(id) {
	const inputVal = document.getElementById(id).value;
	let validity = true;
	for (let i = inputVal.length - 1; i >= 0; i--) {
		if(!checkLetter(inputVal[i])) {
			validity = false;
			break;
		}
	}
	if (!validity) {
		feedback(id, validity, "This field should contain only letters.");
		return false;
	}
	return true;
}

function checkLetter(letter) {
	return !!letter.match(letters);
}

function isValid(id) {
	const validity = hasOnlyLetters(id) & !isEmpty(id);
	if (validity)
		feedback(id, validity, "Looks Good.");
	return validity;
}

/* TELEPHONE ONCHANGE */

const numbers = /^[0-9]+$/;

function checkLength(id, len) {
	const inputVal = document.getElementById(id).value;
	if (!(inputVal.length === len)) {
		feedback(id, false, "This field should contain exactly 11 digits.");
		return false;
	}
	return true;
}

function hasOnlyNumbers(id) {
	const inputVal = document.getElementById(id).value;
	let validity = true;
	for (let i = inputVal.length - 1; i >= 0; i--) {
		if(!checkNumber(inputVal[i])) {
			validity = false;
			break;
		}
	}
	if (!validity) {
		feedback(id, validity, "This field should contain only numbers.");
		return false;
	}
	return true;
}

function checkNumber(number) {
	return !!number.match(numbers);
}

function telIsValid() {
	const validity = checkLength("telephone",11) & hasOnlyNumbers("telephone") & !isEmpty("telephone");
	if (validity)
		feedback("telephone", validity, "Looks Good.");
	return validity;
}

/* DATE ONCHANGE */

const dateFormat = /^\d{1,2}-\d{1,2}-\d{4}$/;

function checkDateFormat() {
	const inputVal = document.getElementById("date").value;

	if (!inputVal.match(dateFormat)) {
		feedback("date", false, "Date format is not valid.");
		return false;
	}

	const dateStr = inputVal.split('-');
	const dd = parseInt(dateStr[0], 10);
	const mm  = parseInt(dateStr[1], 10);
	const yyyy = parseInt(dateStr[2], 10);

	if(yyyy < 1919 || yyyy > 2019 || mm === 0 || mm > 12) {
		feedback("date", false, "This is not a real date.");
		return false;
	}

	let monthLen = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	if(yyyy % 400 === 0 || (yyyy % 100 !== 0 && yyyy % 4 === 0))
		monthLen[1] = 29;

	if(dd > 0 && dd <= monthLen[mm - 1])
		return true;

	feedback("date", false, "This is not a real date.");
	return false;
}

function dateIsValid() {
	const validity = checkDateFormat() & !isEmpty("date");
	if (validity)
		feedback("date", validity, "Looks Good.");
	return validity;
}

/* EMAIL ONCHANGE */

const mailFormat = /^[\w.]+(?=.*[@])([@]?[\w.]+)?$/;
const idFormat = /^\w+$/;
const domainFormat = /^(?!\.)(?!.*\.$)(?!.*?\.\.)[a-zA-Z.]+$/;

function emailIsValid() {
	const inputVal = document.getElementById("email").value;

	if(isEmpty("email")) {
		return false;
	}

	if (!inputVal.match(mailFormat)) {
		feedback("email", false,"An email address should be in (id)@(domain) pattern");
		return false;
	}

	const emailStr = inputVal.split('@');
	const id = emailStr[0];
	const domain = emailStr[1];

	if ( !id.match(idFormat) || !domain.match(domainFormat) ) {
		feedback("email", false, "E-mail format is not valid.");
		return false;
	}

	feedback("email", true, "Looks Good.");
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

/* MESSAGE ONCHANGE */

function messageIsValid() {
	if (isEmpty("message"))
		return false;
	feedback("message", true, "Looks Good.");
	return true;
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

/* LOGIN ONCLICK */

function login() {
	const validity = usernameIsValid() & passwordIsValid();
	const username = document.getElementById("username").value;
	if (validity) {
		document.getElementById("section-login-hide").style.display = 'none';
		document.getElementById("h4-welcome").textContent =
		"Welcome " + username;
		document.getElementById("h5-welcome").textContent =
		"We are so happy to see you!";
		document.getElementById("section-login-show").style.display = 'block';
	}
}

/* CONTACT-SEND ONCLICK */

function contactSend() {
	const validity = isValid('name') & isValid('surname') &
		emailIsValid() & telIsValid() & messageIsValid();
	if (validity)
		document.getElementById("contact-form").submit();
}

/* REGISTRATION-SEND ONCLICK */

function registerSend() {
	const validity = isValid('name') & isValid('surname') &
		emailIsValid() & passwordIsValid() & dateIsValid() & telIsValid();
	if (validity)
		document.getElementById("register-form").submit();
}

/* RESET ONCLICK */

function resetForm() {
	var items = document.getElementsByClassName("form-control");

	for (var item of items) {
		item.value = "";
		if (item.classList.contains("form-red"))
			item.classList.remove("form-red");
		if (item.classList.contains("form-green"))
			item.classList.remove("form-green");

		const divId = item.id.concat("-feedback");
		const divEl = document.getElementById(divId);
		while(divEl.firstChild) {
			divEl.removeChild(divEl.firstChild);
		}

	}
}