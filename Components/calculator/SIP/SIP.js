"use client";
import "../RD/global.css";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";


export default function Home() {
  const [P, setP] = useState(0);
  const [R, setR] = useState(1);
  const [N, setN] = useState(1);
  const [InvestFrequency, setInvestFrequency] = useState("Monthly");

  const pieChartRef = useRef(null);

  useEffect(() => {
    initialize();
    displayDetails();
  }, [P, R, N, InvestFrequency]);

  function initialize() {
    // Destroy existing Chart instances if they exist


    if (pieChartRef.current !== null && pieChartRef.current.data) {
      pieChartRef.current.destroy();
    }

    // Initialize new Chart instances

    pieChartRef.current = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Invested amount", "Estimated returns"],
        datasets: [
          {
            label: "SIP Details",
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
            color: "#00B852",
          },
          legend: {
            
          },
        },
      },
    });
  }

  function displayDetails() {
    const Total_return = CalculateSIP(parseFloat(P), parseFloat(R), parseFloat(N));
    
	let n =N;
	if(InvestFrequency == "Monthly"){
		n = n * 12;
	}
	if(InvestFrequency == "Quarterly"){
		n = n * 4;
	}

    document.querySelector("#cp").innerText = "₹ " +
      parseFloat(P*n).toLocaleString("en-US") ;
    document.querySelector("#ci").innerText = "₹ " +
      parseFloat(parseFloat(Total_return) - parseFloat(P*n)).toLocaleString(
        "en-US"
      ) ;
    document.querySelector("#ct").innerText = "₹ " +
      parseFloat(Total_return).toLocaleString("en-US") ;

    if (pieChartRef.current) {
      pieChartRef.current.data.datasets[0].data[0] = P*n;
      pieChartRef.current.data.datasets[0].data[1] = Total_return - P*n;
      pieChartRef.current.update();
    }

    // Update line chart data
    // lineChartRef.current.data.datasets[0].data = [P];
    // lineChartRef.current.update();
  }
  function CalculateSIP(P, R, N) {
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

  const handleInvestmentFrequencyChange = (e) => {
    setInvestFrequency(e.target.value); // Update InvestFrequency state
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
        <h1 style={{ color: '#6258A8' }}>SIP Calculator</h1>
        
      </div>

      <div className="sub-container">
        <div className="view">
          <div className="details ">
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2' }} draggable="true" onDragStart={() => setP(0)}>Investment</p>
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
                <p style={{ color: '#9088D2'}} draggable="true" onDragStart={() => setN(1)}>Time Period</p>
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
                <p style={{ color: '#9088D2' }} draggable="true" onDragStart={() => setR(1)}>Expected return rate(p.a)</p>
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
          <div>
					<div className="detail">
						<p style={{color: "#9088D2", paddingBottom: '10px', paddingTop: '10px'}}>Investment Frequency</p>
					</div>
					<select id='invest-frequency' onChange={handleInvestmentFrequencyChange} value={InvestFrequency} style={{backgroundColor: "#E0C8E4", color: '#3E23D6', fontWeight: '600'}}>
          <option value="Monthly" style={{background: "#fff",color: '#000', fontWeight: '400'}}>Monthly</option>
						<option value="Quarterly" style={{background: "#fff",color: '#000', fontWeight: '400'}}>Quarterly</option>
						<option value="Yearly" style={{background: "#fff",color: '#000', fontWeight: '400'}}>Yearly</option>
					</select>
				</div>
          
          <p style={{ color: '#9088D2', fontSize: '1.5rem', marginTop: '50px' }} >Total Amount :</p>
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
        </div>
  );
}
