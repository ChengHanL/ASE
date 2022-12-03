import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import SearchBar from "../components/SearchBar";

import styles from "../styles/pages/Forum.module.css";
import ForumModuleTable from "../components/ForumModuleTable";

const Forum = () => {
  const [moduleData, setModuleData] = useState([]);
  const [searchModuleCode, setSearchModuleCode] = useState("");
  const [searchState, setSearchState] = useState(false);

  const queryAll = query(collection(db, "Module"));
  const searchQuery = query(
    collection(db, "Module"),
    where("Module Code", "==", searchModuleCode.toUpperCase())
  );

  const clickSearchButton = () => {
    setSearchState(!searchState);
    console.log(searchModuleCode);
  };

  async function getModuleData() {
    let result = [];
    const querySnapshot = await getDocs(queryAll);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setModuleData(result);
  }

  async function getSearchModuleData() {
    let result = [];
    const querySnapshot = await getDocs(searchQuery);

    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setModuleData(result);
  }

  useEffect(() => {
    if (searchModuleCode === "") {
      getModuleData();
    } else {
      getSearchModuleData();
    }
  }, [searchState]);

  return (
    <>
    <div className={styles.forum}>
      <h1 className={styles.forumHeader}>Transaction</h1>

      <div className={styles.forumBody}>
        <SearchBar
          searchModuleCode={searchModuleCode}
          setSearchModuleCode={setSearchModuleCode}
          clickSearchButton={clickSearchButton}
        />
        <ForumModuleTable moduleData={moduleData} />
      </div>
    </div></>
    
  );
};

export default Forum;
