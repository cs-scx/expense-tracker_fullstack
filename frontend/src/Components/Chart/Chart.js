import React from "react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import {Line} from "react-chartjs-2";
import styled from "styled-components";
import {useGlobalContext} from "../../context/globalContext";
import {dateFormat} from "../../utils/dateFormat";

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

function compare(a, b) {
  if (a.date < b.date) {
    return -1;
  }
  if (a.date > b.date) {
    return 1;
  }
  return 0;
}

function Chart() {
  const {incomes, expenses} = useGlobalContext();
  let dateSet = [];
  let itemSet = [];
  incomes.forEach((item) => {
    itemSet.push(item);
    let {date} = item;
    dateSet.push(date);
  });
  expenses.forEach((item) => {
    itemSet.push(item);
    let {date} = item;
    dateSet.push(date);
  });
  //console.table(dateSet);
  itemSet = itemSet.sort(compare);
  console.table(itemSet);

  const data = {
    labels: dateSet.sort().map((date) => {
      return dateFormat(date);
    }),
    datasets: [
      {
        label: "收入",
        data: [
          ...itemSet.map((item) => {
            const {type, amount} = item;
            return type === "income" ? amount : 0;
          }),
        ],
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "支出",
        data: [
          ...itemSet.map((item) => {
            const {type, amount} = item;
            return type === "expense" ? amount : 0;
          }),
        ],
        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <ChartStyled>
      <Line data={data} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  height: 100%;
`;

export default Chart;
