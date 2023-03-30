import LoginForm from "../Fbase/LoginForm";
import { authService, firebaseInstance } from "../Fbase/fbase";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import * as L from "../StyledComponents/StyledLogIn"


  
  
const LogIn = () => {
  const onSocialClick = async (event:any) => {
    const {
      target: { name },
    } = event;
    //위의 코드는 ES6이다. 모두를 위한 ES6코드를 찾아보라
    let provider : any;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <L.Container>
      <L.AContainer>
        <LoginForm />
      </L.AContainer>
      <L.SocialAccount onClick={onSocialClick} name="google" className="authBtn">
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </L.SocialAccount>
      <L.SocialAccount2 onClick={onSocialClick} name="github" className="authBtn">
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </L.SocialAccount2>
    </L.Container>
  );
};

export default LogIn;
