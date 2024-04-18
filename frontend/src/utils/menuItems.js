import {dashboard, expenses, transactions, trend} from "../utils/Icons";

export const menuItems = [
  {
    id: 1,
    title: "总览",
    icon: dashboard,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "查看交易",
    icon: transactions,
    link: "/dashboard",
  },
  {
    id: 3,
    title: "收入",
    icon: trend,
    link: "/dashboard",
  },
  {
    id: 4,
    title: "支出",
    icon: expenses,
    link: "/dashboard",
  },
];
