//Get values from form
function getValues(){
    let principleAmt = document.getElementById("loanAmt").value;
    let termsOfLoan = document.getElementById("numMonths").value;
    let interestRate = document.getElementById("interest").value;

    let principle = parseFloat(principleAmt);
    let terms = parseInt(termsOfLoan);
    let interest = parseFloat(interestRate);

    if (Number.isInteger(principle) && Number.isInteger(terms) && Number.isInteger(interest))
    {
        let monthlyPayment = calculateMonthlyPayment(principle, terms, interest);
        let totalCostOfLoan =  calculateTotalCostOfLoan(monthlyPayment, terms);
        let totalInterest = calculateTotalInterst(principle, totalCostOfLoan);

        displayLoanDetails(monthlyPayment, principle, totalInterest, totalCostOfLoan);
        displayAmortizationTable(principle, monthlyPayment, terms, interest);
    } else {
        alert("You must enter a valid number!! Please try again!!");
    }

}


//Calculate Total Monthly Payments
function calculateMonthlyPayment(principle, terms, interest){
    let paymentMultiplier = ((interest / 1200)/(1 - ((1 + interest / 1200) ** (terms * -1))));
    return principle * paymentMultiplier;
}

//Calculate Total Interest 
function calculateTotalCostOfLoan(monthlyPayment, terms){
    let totalCost = monthlyPayment * terms;
    return totalCost;
}

//Calculate Total Cost of Loan
function calculateTotalInterst(principle, totalCostOfLoan){
    let totalInterest = totalCostOfLoan - principle;
    return totalInterest;
}


//Display Calc'd values
function displayLoanDetails(monthlyPayment, principle, totalInterest, totalCost){
    let monthlyPaymentDisplay = `${monthlyPayment.toFixed(2)}`;
    let totalPrincipalDisplay = `${principle.toFixed(2)}`;
    let totalInterestDisplay = `${totalInterest.toFixed(2)}`;
    let totalCostDisplay = `${totalCost.toFixed(2)}`;

    document.getElementById("monthlyPayment").innerHTML = monthlyPaymentDisplay;
    document.getElementById("totalPrincipal").innerHTML = totalPrincipalDisplay;
    document.getElementById("totalInterest").innerHTML = totalInterestDisplay;
    document.getElementById("totalCost").innerHTML = totalCostDisplay;
}

//display amortization Table
function displayAmortizationTable(principle, monthlyPayment, terms, interest){
    let newBalance = principle;
    let totalInterest = 0;
    let tablebody = document.getElementById("results");
    let templateRow = document.getElementById("amortTemplate");

    tablebody.innerHTML = "";

    for(let i = 1; i <= terms; i++){
        let tableRow = document.importNode(templateRow.content, true);

        let interestPayment = newBalance * (interest/1200);
        totalInterest += interest;
        let principalPayment = monthlyPayment - interestPayment;
        newBalance = newBalance - principalPayment;
     
        //grab number of tds and put into an array
        let rowCols = tableRow.querySelectorAll("td");
        rowCols[0].classList.add(i);
        rowCols[0].textContent = i;

        rowCols[1].classList.add(monthlyPayment);
        rowCols[1].textContent = monthlyPayment.toFixed(2);

        rowCols[2].classList.add(principalPayment);
        rowCols[2].textContent = principalPayment.toFixed(2);

        rowCols[3].classList.add(interestPayment);
        rowCols[3].textContent = interestPayment.toFixed(2);

        rowCols[4].classList.add(totalInterest);
        rowCols[4].textContent = totalInterest.toFixed(2);

        rowCols[5].classList.add(newBalance);
        rowCols[5].textContent = newBalance.toFixed(2);

        tablebody.appendChild(tableRow);
    }
}