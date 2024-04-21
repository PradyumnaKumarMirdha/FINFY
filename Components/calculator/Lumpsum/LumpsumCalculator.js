"use client";
import "../Loan/global.css";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Home() {
  const [P, setP] = useState(0);
  const [R, setR] = useState(1);
  const [N, setN] = useState(1);

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    initialize();
    displayDetails();
  }, [P, R, N]);

  function initialize() {
    // Destroy existing Chart instances if they exist
    if (lineChartRef.current !== null && lineChartRef.current.data) {
      lineChartRef.current.destroy();
    }

    if (pieChartRef.current !== null && pieChartRef.current.data) {
      pieChartRef.current.destroy();
    }

    // Initialize new Chart instances
    lineChartRef.current = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        datasets: [
          {
            type: "line",
            label: "Corpus Value",
            borderColor: "#36DD76",
            data: [],
          },{
            type: 'bar',
            label: "Yearly Principal paid",
            backgroundColor: "rgb(54, 162, 235)",
            data: []
          },{
            type: 'bar',
            label: "Yearly Interest paid",
            backgroundColor: "rgb(150, 96, 243)",
            data: []
          }
        ],
        labels: [],
      },
      options: {
        plugins: {
          title: {
            display: true,
          },
        },
        scales: {
          x: {
            title: {
              color: "grey",
              display: true,
              text: "Years Passed",
            },
            stacked: true,
          },
          y: {
            title: {
              color: "grey",
              display: true,
              text: "Money in Rs.",
            },
            stacked: true,
          },
        },
      },
    });

    pieChartRef.current = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            label: "Lumpsum Details",
            data: [0, 0],
            backgroundColor: ["rgb(33, 168, 218)", "rgb(150, 96, 243)"],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Payment Breakup",
            color: "#fff",
          },
          legend: {
            labels: {
              color: "#fff",
            },
          },
        },
        backgroundColor: "#fff",
      },
    });
  }

  function displayDetails() {
    const Total_return = calculateLoanDetails(P, R, N);

    document.querySelector("#cp").innerText =
      parseFloat(P).toLocaleString("en-US") + "Rs";
    document.querySelector("#ci").innerText =
      parseFloat(parseFloat(Total_return) - parseFloat(P)).toLocaleString(
        "en-US"
      ) + "Rs";
    document.querySelector("#ct").innerText =
      parseFloat(Total_return).toLocaleString("en-US") + "Rs";

    if (pieChartRef.current) {
      pieChartRef.current.data.datasets[0].data[0] = P;
      pieChartRef.current.data.datasets[0].data[1] = Total_return - P;
      pieChartRef.current.update();
    }

    // Update line chart data
    // lineChartRef.current.data.datasets[0].data = [P];
    // lineChartRef.current.update();
  }
  function calculateLoanDetails(P, R, N) {
    let E1=0;
    let E2=0;
    let E3=0;
    let yearlyInterest = [];
    let yearlyPrincipal = [];
	let yearlyCorpusvalue = [];
	let years =[]
	for(let n=0;n<=N;n++){
		E1 = (1 + R/100);
		E2 = Math.pow(E1,n);
		E3 = P * E2;
		years.push(n);
		yearlyCorpusvalue.push(parseInt(E3));
		yearlyPrincipal.push(parseInt(P));
		yearlyInterest.push(parseInt(E3-P));

	}
  if(P > 0){
    lineChartRef.current.data.datasets[0].data = yearlyCorpusvalue; // Need total Principal here 
    lineChartRef.current.data.datasets[2].data = yearlyInterest;
    lineChartRef.current.data.datasets[1].data = yearlyPrincipal;
    lineChartRef.current.data.labels =  years;
    lineChartRef.current.update();
  }
	return E3;
  }

  function calculateYearlyCorpus(P, R, N) {
    const yearlyCorpusvalue = [];
    for (let n = 0; n <= N; n++) {
      yearlyCorpusvalue.push(P * Math.pow(1 + R / 100, n));
    }
    return yearlyCorpusvalue;
  }

  const setInnerText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerText = text;
    }
  };

  const handleTotalInvestChange = (e) => {
    setInnerText(
      "#invest-amt-text",
      parseInt(e.target.value).toLocaleString("en-US")
    );
    setP(parseFloat(e.target.value));
  };

  const handleInterestRateChange = (e) => {
    setInnerText("#interest-rate-text", e.target.value + "%");
    setR(parseFloat(e.target.value));
  };

  const handleTimePeriodChange = (e) => {
    setInnerText("#time-period-text", e.target.value + " years");
    setN(parseFloat(e.target.value));
  };

  return (
    <div className="container border border-[#7042f88b] opacity-[0.9]">
      <div className="header mt-6 md:m-0">
        <h1 style={{ color: '#6258A8' }}>Lumpsum Calculator</h1>
        
      </div>

      <div className="sub-container">
        <div className="view">
          <div className="details ">
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2' }} draggable="true" onDragStart={() => setP(0)}>Amount</p>
                <input
                  type="number"
                  id="loan-amt-input"
                  style={{ width: '150px' }}
                  value={P}
                  onChange={(e) => setP(e.target.value)}
                  />
              </div>
              <input type="range" id="loan-amount" min="0" max="10000000" step="50000" value={P} onChange={(e) => setP(e.target.value)} />
            </div>
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2'}} draggable="true" onDragStart={() => setN(1)}>Tenure</p>
                <input
                  type="number"
                  id="loan-period-input"
                  style={{ width: '150px' }}
                  value={N}
                  onChange={(e) => setN(e.target.value)}
                  />
              </div>
              <input type="range" id="loan-period" min="1" max="30" step="1" value={N} onChange={(e) => setN(e.target.value)} />
            </div>
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2' }} draggable="true" onDragStart={() => setR(1)}>% Interest</p>
                <input
                  type="number"
                  id="interest-rate-input"
                  style={{width: '150px' }}
                  value={R}
                  onChange={(e) => setR(e.target.value)}
                  />
              </div>
              <input type="range" id="interest-rate" min="1" max="15" step="0.5" value={R} onChange={(e) => setR(e.target.value)} />
            </div>
          </div>
          <p style={{ color: '#9088D2', fontSize: '1.5rem' }} >Corpus Value :</p>
          <div className="footer">
            <p id="ct" className="text-[3rem] dark:text-[white] text-black"><span id="price" className=''></span></p>
          </div>
        </div>
        <div className="breakup flex justify-center md:justify-end">
          <canvas id="pieChart"></canvas>
        </div>
      </div>

      <div className="loan-details">
        <div className='chart-details'>
          <p style={{ color: '#9088D2' }}>Principal</p>
          <p id="cp" style={{ fontSize: '17px' }} className='dark:text-white text-black'></p>
        </div>
        <div className='chart-details'>
          <p style={{ color: '#9088D2' }}>Interest</p>
          <p id="ci" style={{ fontSize: '17px' }} className='dark:text-white text-black'></p>
        </div>
        <div className='chart-details'>
          <p style={{ color: '#9088D2' }}></p>
          <p id="ct" style={{ fontSize: '17px' }} className='dark:text-white text-black'></p>
        </div>
      </div>
      <canvas id="lineChart" height="200px" width="200px"></canvas>
    </div>
  );
}
