function answer() {
	const inputVal = document.getElementById("question").value;
	if (inputVal.length === 0) {
		alert("You didn't ask a question!");
	}
	var ans;
	switch(Math.floor(Math.random() * 6)) {
		case 0:
			ans = "Yes."
			break;
		case 1:
			ans = "No."
			break;
		case 2:
			ans = "Maybe."
			break;
		case 3:
			ans = "Possible."
			break;
		case 4:
			ans = "Impossible."
			break;
		case 5:
			ans = "Don't ask me, wait ask me."
			break;
	}

	alert("You asked:\n"+ inputVal + "\nWise Owl Answer:\n" + ans);
}