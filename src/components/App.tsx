import React from "react";

import { Line } from "react-chartjs-2";

import "./app.scss";

const dis = Array(50).fill(17.5);

export default function App() {
  const [standardVariance, setStandardVariance] = React.useState(
    [] as (number | undefined)[]
  );
  const [unbiasedVariance, setUnciasedVariance] = React.useState(
    [] as (number | undefined)[]
  );
  function getAverage(target: number[]) {
    return target.reduce((acc, cur) => acc + cur);
  }

  function getSumSquaredDeviations(target: number[]) {
    const ave = getAverage(target);
    const squares = target.map(tar => tar ** 2);
    return getAverage(squares) - ave ** 2;
  }

  function dice() {
    const res = Array(50).fill(0);
    return res.map(hoge => Math.floor(Math.random() * Math.floor(6)) + 1);
  }

  function handleDice() {
    const stock = [] as number[];
    const garbage = [] as number[];
    const unbiased = [] as number[];
    const standard = [] as number[];
    const dices = dice();
    dices.forEach((num, index) => {
      stock.push(num);
      if (index == 0) {
      } else {
        standard.push(getSumSquaredDeviations(stock) / index);
      }
    });
    dices.forEach((num, index) => {
      garbage.push(num);
      if (index == 0) {
    } else {
      unbiased.push(getSumSquaredDeviations(garbage) / (index + 1));
    }
    });
    console.log(standard, unbiased);

    setStandardVariance(standard);
    setUnciasedVariance(unbiased);
  }

  return (
    <div className="reactApp">
      <div className="button" onClick={() => handleDice()}>
        ReRun!!
      </div>
      <div className="chart">
        <Line
          data={{
            datasets: [
              {
                label: "不偏分散",
                data: unbiasedVariance,
                borderWidth: 1,
                borderColor: "#3e95cd",
                backgroundColor: "#3e95cd",
                fill: true
              },
              {
                label: "標準分散",
                data: standardVariance,
                borderWidth: 1,
                borderColor: "#8e5ea2",
                backgroundColor: "#8e5ea2",
                fill: true
              },
              {
                label: "母分散",
                data: dis,
                borderWidth: 1,
                borderColor: "#3cba9f",
                backgroundColor: "#3cba9f",
                fill: true
              }
            ]
          }}
        />
      </div>
    </div>
  );
}
