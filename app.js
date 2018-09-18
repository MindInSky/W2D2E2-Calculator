// listen for submit button
document.getElementById("results").style.display = "none";
document.getElementById("loader").style.display = "none";

submitBtn = document.getElementById("loan-form");
submitBtn.addEventListener("submit", function(e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loader").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

function calculateResults(e) {
  // retreive values
  const loanAmountUI = document.getElementById("amount");
  const interestRateUI = document.getElementById("interest");
  const yearsUI = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  //  console.log(loanAmountUI.value, interestRateUI.value, yearsUI.value);
  //Calculate Values
  const principal = parseFloat(loanAmountUI.value);
  const calculatedInterest = parseFloat(interestRateUI.value) / 100 / 12;
  const calculatedPayments = parseFloat(yearsUI.value) * 12;
  //  console.log(principal, calculatedInterest, calculatedPayments);

  // Compute MOnthly Payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Validate that teh value is not Infinite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // display results
    document.getElementById("results").style.display = "block";
    document.getElementById("loader").style.display = "none";
  } else {
    manageError("Error, check your numbers");
    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "none";
  }
}

function manageError(errorMsg) {
  //get Node where the error windows will be displayed
  const card = document.querySelector(".card-body");
  const heading = document.querySelector(".heading");

  //create div to show error
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.id = "customAlert";

  // create text node and append it to div
  const errorTextNode = document.createTextNode(errorMsg);
  errorDiv.appendChild(errorTextNode);

  // instert error msgs above heading
  card.insertBefore(errorDiv, heading);

  window.setTimeout(clearError, 3000);
}

// clear the msg
function clearError() {
  document.getElementById("customAlert").remove();
}

//reset button
resetBtn = document.getElementById("results-form");
resetBtn.addEventListener("submit", function(e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loader").style.display = "none";
  let loanAmountUI = document.getElementById("amount");
  let interestRateUI = document.getElementById("interest");
  let yearsUI = document.getElementById("years");
  loanAmountUI.value = "";
  interestRateUI.value = "";
  yearsUI.value = "";
  e.preventDefault();
});
