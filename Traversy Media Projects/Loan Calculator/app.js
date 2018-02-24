// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
	// Hide Results
	document.getElementById('results').style.display = 'none';

	// Show loader
	document.getElementById('loader').style.display = 'block';

	setTimeout(calculateResults, 2000);

	e.preventDefault();	
});

// Calculate Results
function calculateResults() {
	// UI Vars
	const amount = document.getElementById('amount');
	const interest = document.getElementById('interest');
	const years = document.getElementById('years');
	const monthlyPayment = document.getElementById('monthly-payment');
	const totalPayment = document.getElementById('total-payment');
	const totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// Compute Monthly Payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal*x*calculatedInterest)/(x-1);

	if(isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
		// Show Results
		document.getElementById('results').style.display = 'block';
		// Hide loader
		document.getElementById('loader').style.display = 'none';
	} else {
		showError('Please enter the correct information below');
	}

}

// Show Error 
function showError(error) {
	// Hide Results
	document.getElementById('results').style.display = 'none';

	// Hide loader
	document.getElementById('loader').style.display = 'none';

	// Create a div
	const errorDiv = document.createElement('div');

	// Get Elements
	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	// Add Class
	errorDiv.className = 'alert alert-danger';

	// Create text node and append to div
	errorDiv.appendChild(document.createTextNode(error));

	// Insert Error above heading
	card.insertBefore(errorDiv, heading);

	// Clear error after 3 seconds
	setTimeout(clearError, 3000);

	// Clear error
	function clearError(){
		document.querySelector('.alert').remove();
	}
}