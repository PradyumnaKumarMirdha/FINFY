var P, R, N, pie;
var total_invest_slider = document.getElementById("total-invest");
var int_rate_slider = document.getElementById("interest-rate");
var loan_period_slider = document.getElementById("time-period");

// update loan amount
total_invest_slider.addEventListener("input", (self) => {
	document.querySelector("#invest-amt-text").innerText =
	  parseInt(self.target.value).toLocaleString("en-US");
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
	N = parseFloat(self.target.value);
	displayDetails();
});

document.getElementById('invest-frequency').addEventListener('change',(self) => {
	displayDetails();
});

// calculate total Interest payable
function CalculateSIP(P,R,N) {
	let InvestFrequency = document.getElementById('invest-frequency').value;
	let r =R;
	let n =N;
	if(InvestFrequency == "Monthly"){
		r = r/(1200);
		n = N*12;
	}
	else{
		if(InvestFrequency == "Quarterly"){
			r = r / (400)
			n = N * 4;
		}
		else{
			r = r/100;
		}
	}
	let M = Math.pow((1+r),n);
	M = P * ((M - 1)/ r) * (1+r);
	return M;
}

// calculate details
function displayDetails() {
	let Total_return = CalculateSIP(P, R, N);
	let InvestFrequency = document.getElementById('invest-frequency').value;
	let opts = '{style: "decimal", currency: "IN"}';
	let n =N;
	if(InvestFrequency == "Monthly"){
		n = n * 12;
	}
	if(InvestFrequency == "Quarterly"){
		n = n * 4;
	}

	document.querySelector("#cp").innerText =  parseFloat(P*n).toLocaleString("en-US", opts);

	document.querySelector("#ci").innerText =
		parseFloat(parseFloat(Total_return) - parseFloat(P*n)).toLocaleString(
			"en-US",
			opts
		);

	document.querySelector("#ct").innerText = parseFloat(Total_return).toLocaleString("en-US", opts);

	pie.data.datasets[0].data[0] = P*n;
	pie.data.datasets[0].data[1] = Total_return - P*n;
	pie.update();
}

// Initialize everything
function initialize() {
	document.querySelector("#invest-amt-text").innerText = parseInt(total_invest_slider.value).toLocaleString("en-US");
	P = parseFloat(document.getElementById("total-invest").value);

	document.querySelector("#interest-rate-text").innerText = int_rate_slider.value + "%";
	R = parseFloat(document.getElementById("interest-rate").value);

	document.querySelector("#time-period-text").innerText = loan_period_slider.value + " years";
	N = parseFloat(document.getElementById("time-period").value);

	pie = new Chart(document.getElementById("pieChart"), {
		type: "doughnut",
		data: {
			labels: ["Invested amount", "Estimated returns"],
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