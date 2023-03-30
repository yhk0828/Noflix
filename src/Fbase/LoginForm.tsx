
import React from "react";
import {createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,} from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import * as L from "../StyledComponents/StyledLogIn"




const LoginForm = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const { email, password } = inputs;
  const onChange = (e:any) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const onSubmit = async (e:any) => {
    e.preventDefault();
    try {
      let data;
      const auth = getAuth();
      if (newAccount) {
        // 계정 생성
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        // 로그인
        data = await signInWithEmailAndPassword(auth, email, password);
      }
      console.log(data);
    } catch (error:any) {
      setError(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      {newAccount ? <L.Sign>회원가입</L.Sign> : <L.Sign>로그인</L.Sign>}
      <L.LForm onSubmit={onSubmit} className="container">
        <L.LInput
          name="email"
          type="text"
          placeholder="Email"
          minLength={10}
          required
          value={email}
          onChange={onChange}
        />
        <L.LInput
          name="password"
          type="password"
          placeholder="Password"
          minLength={8}
          required
          value={password}
          onChange={onChange}
        />
        <L.LSubmit
          type="submit"
          value={newAccount ? "Create Account" : "Log in"}
        />
        {error && <span className="authError">{error}</span>}
      </L.LForm>
      <L.LoginorAccount onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Log in" : "Create Account"}
      </L.LoginorAccount>
    </>
  )

}
export default LoginForm;