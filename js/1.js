const displayResults = document.getElementById("display-results");
const modal = document.getElementById('modal');
const modalPersonDetails = document.getElementsByClassName("modal-person-details")[0];
let closeModal = document.getElementsByClassName("close")[0];

// Gets data from api
const userData = fetch('https://randomuser.me/api/?results=12')
	.then(res => res.json())
	.then(data => generateResults(data))

// Helper function that capitalizes each word in a string
function capitalize(str) {
    return str.replace(/\w\S*/g, function(word){
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    });
}

// Populates results from API data using template literal
function generateResults(data)	 {
	const results = data.results.map(result => `
			<li class="person-result">
				<img src="${result.picture.large}" class="person-detail" alt>
				<p class="person-detail"><span class="person-detail">${capitalize(result.name.first)} ${capitalize(result.name.last)}</span><br/>
				${result.email}<br/>
				${capitalize(result.location.city)}</p>
				<div class='extra-details' hidden>
					<hr>
					<p>Phone: ${result.phone}</p>
					<p>${capitalize(result.location.street)}, ${capitalize(result.location.state)} ${result.location.postcode}</p>
					<p>Birthday: ${result.dob.date.slice(5,10).replace("-", "/")}/${result.dob.date.slice(0,4)}</p>
				</div>
			</li>
		`).join('')
	// Show results
	displayResults.innerHTML = results;
}

displayResults.onclick = e => {
	// Checks if target clicked is result li element or one of its children
	if (e.target.className == "person-result" || e.target.className == "person-detail") {
		let personDetails = e.target;
		// Sets personDetails to the result li element, regardless of what event.target is clicked
		while (! personDetails.parentNode.id) {
			personDetails = personDetails.parentNode;
		}
		// Resets modal content to empty string
		modalPersonDetails.innerHTML = "";
		// Sets modal content to li result content and removes hidden property to show extra details
		modalPersonDetails.innerHTML += personDetails.innerHTML.replace("hidden", "");
		// Displays modal
		modal.style.display = "block";
	}
}

// Closes modal window when x is clicked
closeModal.onclick = function() {
    modal.style.display = "none";
}

// Closes modal window when area outside modal window is clicked
window.onclick = function(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}