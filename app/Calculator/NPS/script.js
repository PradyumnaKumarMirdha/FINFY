var P, R, N, pie, line;
var total_invest_slider = document.getElementById("total-invest");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("time-period");

// update loan amount
total_invest_slider.addEventListener("input", (self) => {
	document.querySelector("#invest-amt-text").innerText =
		parseInt(self.target.value).toLocaleString("en-US") + "Rs";
	P = parseFloat(self.target.value);
	displayDetails();
});

// update Rate of Interest
int_rate_slider.addEventListener("input", (self) => {
	document.querySelector("#interest-rate-text").innerText =
		self.target.value + "%";
	R = parseFloat(self.target.value);
	displayDetails();
});

// update loan period
loan_period_slider.addEventListener("input", (self) => {
	document.querySelector("#time-period-text").innerText =
		self.target.value + " years";
	N = 60 - parseFloat(self.target.value);
	displayDetails();
});

// calculate total Interest payable
function calculateLoanDetails(P,R,N) {
	let TotalInvested = P*N*12;
	let M =0;
	let AnnualInvestedValues =[]
	let AnnualMaturedValues = [];
	let years = []
	for(let i=1;i<=N;i++){
		// console.clear()
		M = Math.pow((1 + (R/(1200))),12*i);
		// Debug
		testingValue = ((1 + (R/(1200))),12*i)
		M = M * P*i*12;
		AnnualInvestedValues.push(P*i*12);
		AnnualMaturedValues.push(M);
		years.push(i);
	}
	line.data.datasets[0].data = AnnualInvestedValues;
	line.data.datasets[1].data = AnnualMaturedValues;
	line.data.labels = years;
	return M;
}

// calculate details
function displayDetails() {
	let Total_return = calculateLoanDetails(P, R, N);

	let opts = '{style: "decimal", currency: "IN"}';

	document.querySelector("#cp").innerText = parseFloat(P*N*12).toLocaleString("en-US", opts);

	document.querySelector("#ci").innerText =
		parseFloat(parseFloat(Total_return) - parseFloat(P*N*12)).toLocaleString(
			"en-US",
			opts
		);

	document.querySelector("#ct").innerText =parseFloat(Total_return).toLocaleString("en-US", opts);
	pie.data.datasets[0].data[0] = P*N*12;
	pie.data.datasets[0].data[1] = Total_return - P*N*12;
	pie.update();
	line.update();
}

// Initialize everything
function initialize() {
	document.querySelector("#invest-amt-text").innerText =parseInt(total_invest_slider.value).toLocaleString("en-US");
	P = parseFloat(document.getElementById("total-invest").value);

	document.querySelector("#interest-rate-text").innerText = int_rate_slider.value + "%";
	R = parseFloat(document.getElementById("interest-rate").value);

	document.querySelector("#time-period-text").innerText = loan_period_slider.value + " years";
	N = parseFloat(document.getElementById("time-period").value);

	line = new Chart(document.getElementById("lineChart"), {
		data: {
			datasets: [
				{
					type: "line",
					label: "Invested Amount",
					fill:true,
					borderColor: "rgb(54, 162, 235)",
					backgroundColor:"rgb(54, 162, 235)",
					data: []
				},
				{
					type:"line",
					label:"Amount After Maturity",
					fill:true,
					borderColor:"rgb(255, 99, 132)",
					backgroundColor:"rgb(255, 99, 132)",
					data:[]
				}
			],
			labels: []
		},
		options: {
			plugins: {
				title: {
					display: true,
					// text: "Yearly Payment Breakdown"
				}
			},
			scales: {
				x: {
					title: {
						color: "grey",
						display: true,
						text: "Years"
					}	
				},
				y: {
					title: {
						color: "grey",
						display: true,
						text: "Amount in INR"
					}
				}
			}
		}
	});

	pie = new Chart(document.getElementById("pieChart"), {
		type: "doughnut",
		data: {
			labels: ["Total Invested", "Intrest earned"],
			datasets: [
				{
					label: "Home Loan Details",
					data: [0, 0],
					backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
					hoverOffset: 4
				}
			]
		},
		options: {
			plugins: {
				title: {
					display: true,
					// text: "Payment Breakup"
				}
			}
		}
	});
	displayDetails();
}
initialize();