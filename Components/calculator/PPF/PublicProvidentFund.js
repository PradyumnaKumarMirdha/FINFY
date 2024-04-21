"use client";
import "../Loan/global.css";
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PublicProvidentFund = () => {
  const [P, setP] = useState(0);
  const [N, setN] = useState(0);

  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    initialize();
    displayDetails();
  }, [P, N]);

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
      type: "bar",
      data: {
        datasets: [
          {
            label: "Total Invested Amount",
            borderColor:"rgb(54, 162, 235)",
            backgroundColor:"rgb(54, 162, 235)",
            data: [],
          },
          {
            label: "Interest Earned",
            borderColor:"rgb(150, 96, 243)",
            backgroundColor:"rgb(150, 96, 243)",
            data: [],
          },
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
              text: "Years",
            },
            stacked: true
          },
          y: {
            title: {
              color: "grey",
              display: true,
              text: "Money in  INR",
            },
            stacked: true
          },
        },
      },
    });

    pieChartRef.current = new Chart(document.getElementById("pieChart"), {
      type: "doughnut",
      data: {
        labels: ["Total Invested", "Intrest earned"],
        datasets: [
          {
            label: "PPF Details",
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
    const Total_return = calculateLoanDetails(parseFloat(P), parseFloat(N));

    // Update innerText
    document.querySelector("#cp").innerText =
    parseFloat(P * N).toLocaleString("en-US") + "Rs";
    document.querySelector("#ci").innerText =
      parseFloat(parseFloat(Total_return) - parseFloat(parseFloat(P)*parseFloat(N))).toLocaleString(
        "en-US"
      ) + "Rs";
    document.querySelector("#ct").innerText =
      parseFloat(Total_return).toLocaleString("en-US") + "Rs";
    

    if (pieChartRef.current) {
      pieChartRef.current.data.datasets[0].data[0] = (P) * (N);
      pieChartRef.current.data.datasets[0].data[1] = (Total_return) - (P) * (N);
      pieChartRef.current.update();
    }


    // Update line chart data
    // lineChartRef.current.data.datasets[0].data = [P];
  }
  function calculateLoanDetails(P, N) {
    let eq1 = Math.pow(1.071, N);
    let eq2 = eq1 - 1;
    let eq3 = eq2 / 0.071;
    let FinalShow = eq3 * P * 1.071;
    let years = [];
    let AmountDeposited = [];
    let InterestEarned = [];
    let YearendBalance = [];
    for (let i = 1; i <= N; i++) {
      years.push(i);
      AmountDeposited.push(parseFloat(P * i));
      if (i == 1) {
        InterestEarned.push(parseFloat(P * 0.071));
      } else {
        InterestEarned.push(
            parseFloat( parseFloat(InterestEarned[i - 2]) + (parseFloat(P + YearendBalance[i - 2])) * 0.071)
        );
      }
      YearendBalance.push(parseFloat(parseFloat(AmountDeposited[i - 1]) + parseFloat(InterestEarned[i - 1])));
    }
      lineChartRef.current.data.datasets[0].data = AmountDeposited;
      lineChartRef.current.data.datasets[1].data = InterestEarned;
      lineChartRef.current.data.labels = years;
      lineChartRef.current.update();
    
    return FinalShow;
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
    <div className="container border border-[#7042f88b] opacity-[0.9]">
      <div className="header mt-6 md:m-0">
        <h1 style={{ color: "#6258A8" }}>PPF Calculator</h1>
      </div>

      <div className="sub-container">
        <div className="view">
          <div className="details ">
            <div>
              <div className="detail items-center md:items-start">
                <p
                  style={{ color: "#9088D2" }}
                  draggable="true"
                  onDragStart={() => setP(0)}
                >
                  Amount
                </p>
                <input
                  type="number"
                  id="loan-amt-input"
                  style={{ width: "150px" }}
                  value={P}
                  onChange={(e) => setP(e.target.value)}
                />
              </div>
              <input
                type="range"
                id="loan-amount"
                min="0"
                max="10000000"
                step="50000"
                value={P}
                onChange={(e) => setP(e.target.value)}
              />
            </div>
            <div>
              <div className="detail items-center md:items-start">
                <p
                  style={{ color: "#9088D2" }}
                  draggable="true"
                  onDragStart={() => setN(1)}
                >
                  Tenure
                </p>
                <input
                  type="number"
                  id="loan-period-input"
                  style={{ width: "150px" }}
                  value={N}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>
              <input
                type="range"
                id="loan-period"
                min="1"
                max="30"
                step="1"
                value={N}
                onChange={(e) => setN(e.target.value)}
              />
            </div>
          </div>
          <p style={{ color: "#9088D2", fontSize: "1.5rem" }}>Corpus Value :</p>
          <div className="footer">
            <p id="ct" className="text-[3rem] dark:text-[white] text-black">
              <span id="price" className=""></span>
            </p>
          </div>
        </div>
        <div className="breakup flex justify-center md:justify-end">
          <canvas id="pieChart"></canvas>
        </div>
      </div>

      <div className="loan-details">
        <div className="chart-details">
          <p style={{ color: "#9088D2" }}>Principal</p>
          <p
            id="cp"
            style={{ fontSize: "17px" }}
            className="dark:text-white text-black"
          ></p>
        </div>
        <div className="chart-details">
          <p style={{ color: "#9088D2" }}>Interest</p>
          <p
            id="ci"
            style={{ fontSize: "17px" }}
            className="dark:text-white text-black"
          ></p>
        </div>
        <div className="chart-details">
          <p style={{ color: "#9088D2" }}></p>
          <p
            id="ct"
            style={{ fontSize: "17px" }}
            className="dark:text-white text-black"
          ></p>
        </div>
      </div>
      <canvas id="lineChart" height="200px" width="200px"></canvas>
    </div>
  );
};

export default PublicProvidentFund;
