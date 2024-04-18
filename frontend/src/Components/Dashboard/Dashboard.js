import React, {useEffect} from "react";
import styled from "styled-components";
import {useGlobalContext} from "../../context/globalContext";
import History from "../../History/History";
import {InnerLayout} from "../../styles/Layouts";
import {dollar} from "../../utils/Icons";
import Chart from "../Chart/Chart";

import dayjs, {Dayjs} from "dayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";

function Dashboard({active}) {
  const [dateValue, setDateValue] = React.useState(null);
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth();

  const nowDate = {
    $y: year,
    $M: Number(month) - 1,
  };

  const {
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getIncomesByDate,
    getExpenses,
    getExpensesByDate,
  } = useGlobalContext();

  const active_2 = () => {
    if (active == 2) {
      if (dateValue == null) {
        getIncomesByDate(nowDate);
        getExpensesByDate(nowDate);
      } else {
        getIncomesByDate(dateValue);
        getExpensesByDate(dateValue);
      }
    }
  };

  useEffect(() => {
    getIncomes();
    getExpenses();
    active_2();
  }, [active]);

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>所有交易</h1>
        {active != 1 ? (
          <div id="datepaker" style={{width: 300}}>
            <h4>
              {dateValue == null ? year : dateValue?.$y} 年{" "}
              {dateValue == null ? month : dateValue?.$M + 1} 月
            </h4>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "DatePicker", "DatePicker"]}
              >
                <DatePicker
                  label={'"month" and "year"'}
                  views={["month", "year"]}
                  value={dateValue}
                  onChange={(newValue) => (
                    setDateValue(newValue),
                    getIncomesByDate(newValue),
                    getExpensesByDate(newValue)
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
            <br />
          </div>
        ) : (
          ""
        )}
        <div className="stats-con">
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>总收入</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </div>
              <div className="expense">
                <h2>总支出</h2>
                <p>
                  {dollar} {totalExpenses()}
                </p>
              </div>
              <div className="balance">
                <h2>总存款</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </div>
            </div>
          </div>
          <div className="history-con">
            <History />
            <h2 className="salary-title">
              最小一笔<span>收入</span>最大一笔
            </h2>
            <div className="salary-item">
              <p>
                {dollar} {Math.min(...incomes.map((item) => item.amount))}
              </p>
              <p>
                {dollar} {Math.max(...incomes.map((item) => item.amount))}
              </p>
            </div>
            <h2 className="salary-title">
              最小一笔<span>支出</span>最大一笔
            </h2>
            <div className="salary-item">
              <p>
                {dollar} {Math.min(...expenses.map((item) => item.amount))}
              </p>
              <p>
                {dollar} {Math.max(...expenses.map((item) => item.amount))}
              </p>
            </div>
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  .stats-con {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    .chart-con {
      grid-column: 1 / 4;
      height: 400px;
      .amount-con {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income,
        .expense {
          grid-column: span 2;
        }
        .income,
        .expense,
        .balance {
          background: #fcf6f9;
          border: 2px solid #ffffff;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          border-radius: 20px;
          padding: 1rem;
          p {
            font-size: 3.5rem;
            font-weight: 700;
          }
        }

        .balance {
          grid-column: 2 / 4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            color: var(--color-green);
            opacity: 0.6;
            font-size: 4.5rem;
          }
        }
      }
    }

    .history-con {
      grid-column: 4 / -1;
      h2 {
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard;
