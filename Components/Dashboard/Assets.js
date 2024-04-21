'use client'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

const styles = {
  wrapper: 'flex justify-between p-5  hover:bg-gray-200 duration-300',
  container: 'flex flex-col text-black items-center justify-center',
  name: 'font-bold',
  chart: 'w-36 h-full',
  price: 'flex flex-col text-black',
  percent: 'text-green-400',
};

const Asset = ({ coin, price }) => {
  const setGraphColor = () => {
    return coin.change < 0 ? '#ef4b09' : '#00ff1a';
  };

  // Prepare labels based on the length of sparkline data
  const labels = Array.from({ length: coin.sparkline.length }, (_, i) => i);

  const data = {
    labels: labels,
    datasets: [
      {
        fill: false,
        lineTension: 0.01,
        backgroundColor: setGraphColor(),
        borderColor: setGraphColor(),
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: setGraphColor(),
        pointBackgroundColor: setGraphColor(),
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: setGraphColor(),
        pointHoverBorderColor: setGraphColor(),
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: coin.sparkline.map(value => parseFloat(value)),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.name}>{coin.symbol}</div>
      </div>
      <div>
        <div className={styles.chart}>
          <Line data={data} options={options} width={450} height={140} />
        </div>
      </div>
      <div className={styles.price}>
        <div>{price}</div>
        <div
          className={styles.percent}
          style={{ color: coin.change < 0 ? '#ef4b09' : 'green' }}
        >
          {coin.change}%
        </div>
      </div>
    </div>
  );
};

export default Asset;