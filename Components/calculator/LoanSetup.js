'use client'
import { useState, useEffect, useRef, createContext } from 'react';
import Chart from 'chart.js/auto';

//  create context object
export const LoanContext = createContext({});

// create the provider component
export const LoanProvider = ({children}) => {
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
    <LoanContext.Provider value={{P, N, R, setP, setN, setR, cp, ct, ci}}>
      {children}
    </LoanContext.Provider>
    );
};
