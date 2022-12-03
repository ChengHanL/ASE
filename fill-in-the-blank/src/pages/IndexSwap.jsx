import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";

import styles from "../styles/pages/IndexSwap.module.css";
import IndexSearchBars from "../components/IndexSearchBars";
import IndexSwapTable from "../components/IndexSwapTable";

import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";

import Table from "../components/Table"


const IndexSwap = () => {
  const [user, loading, error] = useAuthState(firebaseAuth);

  const [moduleData, setModuleData] = useState([]);
  const [searchModuleCode, setSearchModuleCode] = useState("");
  const [searchCurrentIndex, setSearchCurrentIndex] = useState("");
  const [searchDesiredIndex, setSearchDesiredIndex] = useState("");

  const [searchState, setSearchState] = useState(false);

  const navigate = useNavigate();

  const searchQuery = query(
    collection(db, "Index-Swap"),
    where("Email", "==", user.email)
  );

  async function getIndexSwapData() {
    let result = [];
    const querySnapshot = await getDocs(searchQuery);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setModuleData(result);
  };

  async function validateCourseCode() {
    let result = [];
    const courseCodeSearchQuery = query(
      collection(db, "Module"),
      where("Module Code", "==", searchModuleCode)
    );
    const querySnapshot = await getDocs(courseCodeSearchQuery);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  };

  async function validateCurrentIndexNum() {
    let result = [];
    const currentIndexNumSearchQuery = query(
      collection(db, "Module"),
      where("Module Code", "==", searchModuleCode),
      where("Index", "array-contains", searchCurrentIndex)
    );
    const querySnapshot = await getDocs(currentIndexNumSearchQuery);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  };

  async function validateDesiredIndexNum() {
    let result = [];
    const desiredIndexNumSearchQuery = query(
      collection(db, "Module"),
      where("Module Code", "==", searchModuleCode),
      where("Index", "array-contains", searchDesiredIndex)
    );
    const querySnapshot = await getDocs(desiredIndexNumSearchQuery);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  };

  async function checkInputs(){
    if (searchModuleCode === "" || searchCurrentIndex==="" || searchDesiredIndex===""){
        window.alert("Please fill up all search fields!");
    }
    else {
      let checkCourseData = await validateCourseCode();
      let checkCurrentIndex = await validateCurrentIndexNum();
      let checkDesiredIndex = await validateDesiredIndexNum();
      //console.log(currentIndexData.length);

      if (checkCourseData.length === 0){
          window.alert("Invalid Course Code!")
      }
      else if (checkCurrentIndex.length === 0){
          window.alert("Invalid Current Index Number!")
      }
      else if (checkDesiredIndex.length === 0){
          window.alert("Invalid Desired Index Number!")
      }
      else if (searchCurrentIndex===searchDesiredIndex){
          window.alert("You have already obtained the index that you want!")
      }
      else {
          navigate(`/indexSwap/${searchModuleCode}/${searchCurrentIndex}/${searchDesiredIndex}`);
      }
    }
  }

  const clickSearchButton = (searchModuleCode,searchCurrentIndex,searchDesiredIndex) => {
    setSearchState(!searchState);
    checkInputs();
    console.log(searchModuleCode+";"+searchCurrentIndex+";"+searchDesiredIndex);
  };


  useEffect(() => {
    if (searchState===false){
      getIndexSwapData();
    }
  }, [searchState]);


  return (
    <div className={styles.indexSwap}>

    <Table />
    </div>
  );
};

export default IndexSwap;
