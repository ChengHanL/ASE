import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import ActionButton from "../components/ActionButton";
import ConfirmationModal from "../components/ConfirmationModal";

import { firebaseAuth } from "../firebase";

import Login from "../components/Login";

import styles from "../styles/pages/Home.module.css";
import DetailCard from '../components/DetailCard';

import Table from "../components/Table"

const Home = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [showModal, setShowModal] = React.useState(false)

  return (
    <div>
      {user ? (
        <div className={styles.home}>
          <h1>Welcome to Banking Application!</h1>
          <h2>A Platform Made For You</h2>
          <ActionButton
            colour="primary"
            text="Delete"
            onClick={() => setShowModal(true)}
          />
          <DetailCard text={"$8888"} heading={'Withdrawal'} />
          <DetailCard text={"$8888"} heading={'Withdrawal'} />
          <ConfirmationModal
            show={showModal}
            onCancel={() => { setShowModal(false) }}
            onSubmit={() => console.log("submitted!")}
            title={"Testing"}
            text={"testing body"}
          />
          <Table />
        </div>
      ) : (
        <div className={styles.home}>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Home;
