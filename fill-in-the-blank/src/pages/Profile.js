import React from "react";
import Textfield from "../components/Textfield";
import styled from "styled-components";
import Container from "../components/Container"

const Profile = () => {


  return (
    <>
     <Container />
     <Wrapper className="full-page">
      <form className="form">
        <h3>your contact details</h3>
        <div className="form-center">
          <Textfield
            name="Username"
            labelText="username"
            // value={values?.email}
            // handleChange={handleChange}
          />
          <Textfield
            name="Password"
            labelText="password"
            // value={values?.email}
            // handleChange={handleChange}
          />
          <Textfield
            name="First Name"
            labelText="firstName"
            // value={values?.email}
            // handleChange={handleChange}
          />
          <Textfield
            name="Last Name"
            labelText="lastName"
            // value={values?.email}
            // handleChange={handleChange}
          />
          <Textfield
            name="Email Address"
            labelText="email"
            // value={values?.email}
            // handleChange={handleChange}
          />
          <Textfield
            name="Home Address"
            labelText="address"
            // value={values?.email}
            // handleChange={handleChange}
          />
        </div>
      </form>
    </Wrapper></>
    
  );
};
const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }

  p {
    color: var(--grey-500);
  }

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }

  .form-row {
    /* padding-left:35%; */
    margin-bottom: 1.38rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Profile;
