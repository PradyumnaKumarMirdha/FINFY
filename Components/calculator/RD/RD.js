'use client'
import { useState, useEffect, useRef } from 'react';
import "./global.css";
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

  function calculateLoanDetails(P,R,N) {
    let M = (1 + R/4);
	let FDreturn = 0;
	let i = 1;
	let val;
	while(i<=N){
		val = Math.pow(M,(4*i/12));
		val = P * val;
		FDreturn = FDreturn + (val - P);
		i =i + 1;
	}
	return FDreturn;
  }

  function displayDetails() {

    let FDreturn = calculateLoanDetails(P,R/100,N);

    document.querySelector("#cp").innerText = "₹ " + parseFloat(P*N).toLocaleString("en-US") ;

    document.querySelector("#ci").innerText = "₹ " + parseFloat(FDreturn).toLocaleString("en-US");

    document.querySelector("#ct").innerText = "₹ " + parseFloat(parseFloat(P * N) + parseFloat(FDreturn)).toLocaleString("en-US");


    pieChartRef.current.data.datasets[0].data[0] = P * N;
    pieChartRef.current.data.datasets[0].data[1] = FDreturn;
    pieChartRef.current.update();
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
    
    pieChartRef.current = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Investment Amount", "Return Amount"],
        datasets: [
          {
            label: "RD Details",
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
            color: "#00B852"
          },
          legend: {
            labels: {
            }
          }
        },
      }
    });
  }
  const setInnerText = (selector, text) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerText = text;
    }
  };

  // update loan amount
  const handleTotalInvestChange = (e) => {
    setInnerText(
      "#invest-amt-text",
      parseInt(e.target.value).toLocaleString("en-US")
    );
    setP(parseFloat(e.target.value));
  };

  const handleLoanPeriodChange = (e) => {
    setInnerText(
      "#time-period-text",
      parseInt(e.target.value).toLocaleString("en-US")
    );
    setN(parseFloat(e.target.value));
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromBottom(0.5)} // Apply slideInFromLeft animation variant
    >

    <div className="container border border-[#7042f88b] opacity-[0.9]">
      <div className="header mt-6 md:m-0">
        <h1 style={{ color: '#6258A8' }}>RD Calculator</h1>
        
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
                  max = "10000000"
                  onChange={(e) => setP(e.target.value)}
                  />
              </div>
              <input type="range" id="loan-amount" min="0" max="10000000" step="50000" value={P} onChange={(e) => setP(e.target.value)} />
            </div>
            <div>
              <div className="detail items-center md:items-start">
                <p style={{ color: '#9088D2'}} draggable="true" onDragStart={() => setN(1)}>Tenure in Months</p>
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
          
        </div>
        <div className="breakup flex justify-center md:justify-end">
          <canvas id="pieChart" className='dark:text-white text-black'></canvas>
        </div>
      </div>

      <div className="loan-details ">
        <div className='chart-details'>
          <p style={{ color: '#9088D2' , fontSize: "1.5rem"}}>Investment Amount</p>
          <p id="cp" className='dark:text-white text-black text-lg font-medium'></p>
        </div>
        <div className='chart-details'>
          <p style={{ color: '#9088D2' , fontSize: "1.5rem"}}>Return Amount</p>
          <p id="ci" className='dark:text-white text-black text-lg font-medium'></p>
        </div>
        <div className='chart-details'>
          <p style={{ color: '#9088D2' , fontSize: "1.5rem"}}>Total Value</p>
            <p id="ct" className='dark:text-white text-black text-lg font-medium'></p>
        </div>
      </div>
     
    </div>
    </motion.div>
  );
}
