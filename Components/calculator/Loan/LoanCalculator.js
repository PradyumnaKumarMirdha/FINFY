'use client'
import { useState, useEffect, useRef } from 'react';
import "./global.css"
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';
import { slideInFromBottom } from '../../../utils/motion';

export default function Home() {
  const [P, setP] = useState(0);
  const [R, setR] = useState(1);
  const [N, setN] = useState(1);

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    initializeCharts();
    displayDetails();
  }, [P, R, N]);

  function calculateLoanDetails(p, r, emi) {
    let totalInterest = 0;
    let yearlyInterest = [];
    let yearPrincipal = [];
    let years = [];
    let year = 1;
    let [counter, principal, interes] = [0, 0, 0];
    while (p > 0) {
      let interest = parseFloat(p) * parseFloat(r);
      p = parseFloat(p) - (parseFloat(emi) - interest);
      totalInterest += interest;
      principal += parseFloat(emi) - interest;
      interes += interest;
      if (++counter == 12) {
        years.push(year++);
        yearlyInterest.push(parseInt(interes));
        yearPrincipal.push(parseInt(principal));
        counter = 0;
      }
    }
    lineChartRef.current.data.datasets[0].data = yearPrincipal;
    lineChartRef.current.data.datasets[1].data = yearlyInterest;
    lineChartRef.current.data.labels = years;
    return totalInterest;
  }

  function displayDetails() {
    let r = parseFloat(R) / 1200;
    let n = parseFloat(N) * 12;

    let num = parseFloat(P) * r * Math.pow(1 + r, n);
    let denom = Math.pow(1 + r, n) - 1;
    let emi = parseFloat(num) / parseFloat(denom);

    let payabaleInterest = calculateLoanDetails(P, r, emi);

    document.querySelector("#cp").innerText = parseFloat(P).toLocaleString("en-US") + "Rs";
    document.querySelector("#ci").innerText = parseFloat(payabaleInterest).toLocaleString("en-US") + "Rs";
    document.querySelector("#ct").innerText = parseFloat(parseFloat(P) + parseFloat(payabaleInterest)).toLocaleString("en-US") + "Rs";
    document.querySelector("#price").innerText = parseFloat(emi).toLocaleString("en-US") + "Rs";

    pieChartRef.current.data.datasets[0].data[0] = P;
    pieChartRef.current.data.datasets[0].data[1] = payabaleInterest;
    pieChartRef.current.update();
    lineChartRef.current.update();
  }

  function initializeCharts() {
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
            label: "Yearly Principal paid",
            borderColor: "rgb(54, 162, 235)",
            data: []
          },
          {
            label: "Yearly Interest paid",
            borderColor: "rgb(150, 96, 243)",
            data: []
          }
        ],
        labels: []
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Yearly Payment Breakdown",
            color: "#9088D2"
          },
          legend: {
            labels: {
              color: 'grey' // Set legend font color to white
            }
          }
        },
        scales: {
          x: {
            title: {
              color: "grey",
              display: true,
              text: "Years Passed"
            }
          },
          y: {
            title: {
              color: "grey",
              display: true,
              text: "Money in Rs."
            }
          }
        },
      }
    });
    
    pieChartRef.current = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Principal", "Interest"],
        datasets: [
          {
            label: "Home Loan Details",
            data: [0, 0],
            backgroundColor: ["rgb(33, 168, 218)", "rgb(150, 96, 243)"],
            hoverOffset: 4,
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Payment Breakup",
            color: "#fff"
          },
          legend: {
            labels: {
              color: '#fff' // Set legend font color to white
            }
          }
        },
        backgroundColor: '#fff'
      }
    });
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromBottom(0.5)} // Apply slideInFromLeft animation variant
    >

    <div className="container border border-[#7042f88b] opacity-[0.9]">
      <div className="header mt-6 md:m-0">
        <h1 style={{ color: '#6258A8' }}>Loan Calculator</h1>
        
      </div>

      <div className="sub-container">
        <div className="view">
          <div className="details ">
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2' }} draggable="true" onDragStart={() => setP(0)}>Amount</p>
                <input
                  type="number"
                  id="loan-amt-input "
                  style={{ color: '#6258A8', width: '150px' }}
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
                  style={{ color: '#6258A8', width: '150px' }}
                  value={R}
                  onChange={(e) => setR(e.target.value)}
                  />
              </div>
              <input type="range" id="interest-rate" min="1" max="15" step="0.5" value={R} onChange={(e) => setR(e.target.value)} />
            </div>
          </div>
          <div className="footer">
            <p id="price-container" ><span id="price" className='dark:text-[white] text-black'>0</span>/mo</p>
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
          <p style={{ color: '#9088D2' }}>Total Payable</p>
          <p id="ct" style={{ fontSize: '17px' }} className='dark:text-white text-black'></p>
        </div>
      </div>
      <canvas id="lineChart" height="200px" width="200px"></canvas>
    </div>
    </motion.div>
  );
}
