import styled from "styled-components";
import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { StatsContainer } from "../components";
import Table from "../components/Table"

const Account = () => {
  const { showStats, isLoading, monthlyTransactions } = useAppContext();

  const cols = [
    { field: 'AccountID', headerName: 'Account ID', width: 200 },
    { field: 'AccountType', headerName: 'Receiving Account ID', width: 200 },
    { field: 'AcccountBalance', headerName: 'Date', width: 200 }
];

  const rows = [
    {
        "AccountID": 621156213,
        "UserID": 1,
        "AccountType": "Saving",
        "AcccountBalance": 70200.71
    },
    {
        "AccountID": 958945214,
        "UserID": 1,
        "AccountType": "Current",
        "AcccountBalance": 99720.46
    },
  ];

  return (
    <>
      <Wrapper>
        <section className="section-center">
          <h3>YOUR ACCOUNTS</h3>
          <p>Let's work together to keep your finances in check!</p>
        </section>
        <StatsContainer />
        <Table
          rows={rows}
          cols={cols}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.main`
   padding: 3rem;
  .chart-overview {
    margin: 0 auto;
    width: 300px;
    margin-bottom: 2rem;
  }
`;

export default Account;
