import React from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, deleteDoc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import styles from "../styles/pages/GFModClassPage.module.css";
import ProfileCard from "../components/ProfileCard";
import { useState } from "react";
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import UserAvatar from "../components/UserAvatar";
import {Modal} from 'react-bootstrap';  
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase";



const GFModClassPage = () => {
  const { moduleCode, classIndex } = useParams();
  const [ moduleNameHolder, setModuleName] = useState("");
  const [user, loading, error] = useAuthState(firebaseAuth);
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [intro, setIntro] = useState("");
  const [buttonClick, setButtonClick] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [ShowSecondModal, setShowSecondModal] = useState(false);


  async function addProfile() {
    const docRef = await addDoc(collection(db, "Group-Finder"), {
      "Email": user.email,
      "Index": classIndex,
      "Intro": intro,
      "Module Code": moduleCode,
      "Name" : name
    });
    window.alert("Creation of profile is successful!");

    setRefresh(!refresh);
  };

  async function deleteProfile(profileId) {
    const docRef = doc(db, "Group-Finder", profileId);

    await deleteDoc(docRef);
    getSearchModuleData();
    setShowProfileCreation(false);
  }




  const [mailState, setMailState] = useState({
    subject: "You have someone who wants to group with you for CZ1015!",
    sendEmail: user.email,
    recvEmail: "chenghanlee98@gmail.com",
    message: "Hi, I would like to group with you for CZ1015! Kindly respond if interested. My telegram handle is @perry. Thanks."
 });
  const submitRequest = async (e) => {
    console.log( mailState , "this is mailState");
    const response = await fetch("http://localhost:3001/sendRequest", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mailState }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        console.log(resData, "this is response data");
        if (resData.status === "success") {
          await alert("Message Sent");
        } else if (resData.status === "fail") {
          await alert("Message failed to send");
        }
      })
  };
  //query module name
  const ModuleNameQuery = query(
    collection(db, "Module"),
    where("Module Code", "==", moduleCode.toUpperCase())
  );

  async function queryInfo() {
    const querySnapshot = await getDocs(ModuleNameQuery);
    const res = await querySnapshot["_snapshot"]["docs"]["keyedMap"]["root"]["value"]["data"]["value"]["mapValue"]["fields"]["Module Name"]
    //sessionStorage.setItem("moduleName",JSON.stringify(res))
    setModuleName(res);
    //console.log(sessionStorage.getItem("moduleName"))
  }

  const searchQuery = query(
    
    collection(db, "Group-Finder"),
    where("Email", "==", user.email),
    where("Module Code", "==", moduleCode),
    where("Index", "==", classIndex)
  );

  async function getSearchModuleData() {
    let result = [];
    const querySnapshot = await getDocs(searchQuery);
    console.log(moduleCode, classIndex);

    querySnapshot.forEach((doc) => {
      result.push({id: doc.id, data: doc.data()});
    });
    setUserData(result);
  }



  useEffect(() => {
    queryInfo();
    getSearchModuleData();
  }, [refresh])

  //var moduleName = sessionStorage.getItem("moduleName");
  var moduleName = JSON.stringify(moduleNameHolder)
  moduleName = moduleName.slice(16,-2)

  const [showInfo, setShowInfo] = useState(false);
  const [showProfileCreation, setShowProfileCreation] = useState(false);
  return(     
    <div className={styles.groupFinder} style = {{marginLeft:65, marginTop: 32}}>
      <h1 className={styles.groupFinderTitle}>Profile</h1>
      <h2 className={styles.groupFinderModuleName}> { moduleName } </h2>
      <h5> Your Profile</h5>

          {userData.length === 0 ? (
                  <Card variant="outlined" style = {{width: '20rem' }}>
                  <AspectRatio minHeight="50px" maxHeight="1px" sx={{ my: 2 }}>
                    {/* <img
                      src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
                      alt=""
                    /> */}
                  <UserAvatar
                    userName={"Empty"}
                  />
                  </AspectRatio>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography fontSize="3g" fontWeight="lg" level="h2" sx={{ alignSelf: 'flex-start' }}>
                      Empty Profile
                    </Typography>
                    <Typography level="body2">Create your Profile</Typography>
                  </Box>
                  <IconButton
                    aria-label="bookmark Bahamas Islands"
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                  >
                  </IconButton>
            
                  <Box sx={{ display: 'flex' }}>
                    <Button
                      variant="outlined"
                      size="sm"
                      color="primary"
                      aria-label="Explore Bahamas Islands"
                      sx={{ ml: 'auto', fontWeight: 600 }}
                      onClick={()=> setShowProfileCreation(true)}
                    >
                      Create
                    </Button>
                  </Box>
                  <Modal show={showProfileCreation}>
                    <Modal.Header handleShow>
                      <Modal.Title>Create Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                      <label>
                        Name:  
                      </label>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <input type="text" name="name" onChange={(e)=> setName(e.target.value)}/>
                      <label>
                        Short Intro:
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="text" name="intro" onChange={(e)=> setIntro(e.target.value)}/>
                      </label>
                    </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowProfileCreation(false)}>
                          Close
                        </Button>
                      <Button variant="outlined" onClick={()=>{addProfile()}}>Create</Button>
                    </Modal.Footer>
                  </Modal>
                </Card>
          ) : (
            <Card variant="outlined" style = {{width: '20rem' }}>
            <AspectRatio minHeight="50px" maxHeight="1px" sx={{ my: 2 }}>
              {/* <img
                src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
                alt=""
              /> */}
            <UserAvatar
              userName={userData[0].data.Name}
            />
            </AspectRatio>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography fontSize="3g" fontWeight="lg" level="h2" sx={{ alignSelf: 'flex-start' }}>
                {userData[0].data.Name}
              </Typography>
              <Typography level="body2">{userData[0].data.Intro}</Typography>
            </Box>


      
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="body3">{user.email}</Typography>
              </div>
            </Box>
            <Button
            variant="outlined"
            size="sm"
            color="primary"
            sx={{ ml: 'auto', fontWeight: 600 }}
            onClick={() => {deleteProfile(userData[0].id)}}
        >
          Delete
        </Button>
          </Card>
          )
          }
            <Modal show={showInfo}>
                <Modal.Header handleShow>
                  <Modal.Title>Clementine Trinetta </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                  <label>
                    Introduction:
                  </label>
                  <label>
                    I am good at programming and is finding people to group with in DSAI.
                  </label>
                  <label>
                    Email:
                  </label>
                  &nbsp;&nbsp;
                  <label>
                    Clementrine_Trinetta@gmail.com
                  </label>
                </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=> setShowInfo(false)}>
                      Close
                    </Button>
                  <Button disabled={buttonClick} variant="outlined" onClick={() => {setShowInfo(false);setShowSecondModal(true)}}>Email</Button>
                </Modal.Footer>
              </Modal>
            <Modal
      show={ShowSecondModal}
      backdrop="static"
      keyboard={false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        closeButton={false}
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        }
      >
        <Modal.Title id="contained-modal-title-vcenter">
          Are you sure?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        }
      >
        <div>
          &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Are you sure you want to group with this person?
          <p style={{fontWeight: "bold"}}>
            An E-mail containing your contact and your E-mail address will be sent to the person.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer
        style={
          {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }
        }
      >
        <Button variant="secondary" onClick={() =>setShowSecondModal(false)} disabled={buttonClick}>Cancel</Button>
        &emsp;&emsp;
        <Button variant="primary" onClick={()=>{submitRequest();setShowSecondModal(false) }}disabled={buttonClick}>Confirm</Button>
      </Modal.Footer>
              </Modal> 

      <h5> Peers Profile</h5>
      <div style={{display: "flex", flexWrap:"wrap"}}>
      <Card variant="outlined" style = {{width: '20rem' }}>
      <AspectRatio minHeight="50px" maxHeight="1px" sx={{ my: 2 }}>
        {/* <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
          alt=""
        /> */}
      <UserAvatar
        userName={"Clementine Trinetta"}
      />
      </AspectRatio>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography fontSize="3g" fontWeight="lg" level="h2" sx={{ alignSelf: 'flex-start' }}>
          Clementine Trinetta
        </Typography>
        <Typography level="body2">Looking for Group</Typography>
      </Box>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
      </IconButton>

      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Clementine_Trinetta@gmail.com</Typography>
        </div>
        <Button
            variant="outlined"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: 'auto', fontWeight: 600 }}
            onClick={()=> setShowInfo(true)}
        >
          Group
        </Button>
      </Box>
    </Card>
    <span>&nbsp;&nbsp;</span>
    <Card variant="outlined" style = {{width: '20rem' }}>
      <AspectRatio minHeight="50px" maxHeight="1px" sx={{ my: 2 }}>
        {/* <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
          alt=""
        /> */}
      <UserAvatar
        userName={"Carmela Wareing"}
      />
      </AspectRatio>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography fontSize="3g" fontWeight="lg" level="h2" sx={{ alignSelf: 'flex-start' }}>
          Carmela Wareing
        </Typography>
        <Typography level="body2">Looking for Group</Typography>
      </Box>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
      </IconButton>

      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Carmela_Wareing@gmail.com</Typography>
        </div>
        <Button
          variant="outlined"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Group
        </Button>
      </Box>
    </Card>
    <span>&nbsp;&nbsp;</span>
    <Card variant="outlined" style = {{width: '20rem' }}>
      <AspectRatio minHeight="50px" maxHeight="1px" sx={{ my: 2 }}>
        {/* <img
          src="https://images.unsplash.com/photo-1527549993586-dff825b37782?crop=entropy&auto=format&fit=crop&w=3270"
          alt=""
        /> */}
      <UserAvatar
        userName={"Latisha Posner"}
      />
      </AspectRatio>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography fontSize="3g" fontWeight="lg" level="h2" sx={{ alignSelf: 'flex-start' }}>
          Latisha Posner
        </Typography>
        <Typography level="body2">Looking for Group</Typography>
      </Box>
      <IconButton
        aria-label="bookmark Bahamas Islands"
        variant="plain"
        color="neutral"
        size="sm"
        sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
      >
      </IconButton>

      <Box sx={{ display: 'flex' }}>
        <div>
          <Typography level="body3">Latisha_Posner@gmail.com</Typography>
        </div>
        <Button
          variant="outlined"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', fontWeight: 600 }}
        >
          Group
        </Button>
      </Box>
    </Card>
    <span>&nbsp;&nbsp;</span>
    
    </div>
      {/* <ProfileCard></ProfileCard> */}
    </div>
    
  )
};

export default GFModClassPage;
