window.onload = function() {
	setInterval(function() {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
				document.getElementById("text").innerHTML = xhttp.responseText;
			}
		}
		xhttp.open("GET", "text", true);
		xhttp.send();
	}, 100);
}