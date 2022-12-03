import { useAppContext } from "../context/appContext";
import StatItem from "./Item";
import { FaMoneyBillAlt } from "react-icons/fa";
import { BsPiggyBankFill } from "react-icons/bs";
import { CgTrendingDown } from "react-icons/cg";
import styled from "styled-components";

const StatsContainer = () => {
  const { stats } = useAppContext();
  const defaultStats = [
    {
      title: "savings",
      count: stats?.pending || 0,
      icon: <BsPiggyBankFill />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title: "Deposits",
      count: stats?.interview || 0,
      icon: <FaMoneyBillAlt />,
      color: "#157357",
      bcg: "#d4faef",
    },
    {
      title: "Withdrawals",
      count: stats?.declined || 0,
      icon: <CgTrendingDown />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 1rem;
  }
`;

export default StatsContainer;
