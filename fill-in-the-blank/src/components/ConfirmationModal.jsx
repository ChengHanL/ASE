import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css"
import ActionButton from './ActionButton';

const ConfirmationModal = ( props ) => {
  // const [user, loading, error] = useAuthState(firebaseAuth);
  // const moduleCode = props.moduleCode
  // const currentIndex = props.currentIndex
  // const desiredIndex = props.desiredIndex
  const { show, onCancel, onSubmit, title, text } = props

  async function addData() {
    // const docRef = await addDoc(collection(db, "Index-Swap"), {
    //   "Email": user.email,
    //   "IndexObtained": currentIndex,
    //   "IndexWanted": desiredIndex,
    //   "Module Code": moduleCode
    // });
    // window.alert("Creation of request is successful!");
  };



  return (
    <Modal
      show={show}
      onHide={onCancel}
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
          <p>{title}</p>
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
        <p>{text}</p>
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
        <ActionButton
            colour="error"
            text="Cancel"
            onClick={onCancel}
        />
        <ActionButton
            colour="primary"
            text="Confirm"
            onClick={onSubmit}
          />
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
