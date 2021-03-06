import React from 'react';
import LoginForm from './LoginForm';
import styled from 'styled-components';

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-family: 'Malgun Gothic';
  background-color: #f3f3f3;
`;

const LoginTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
`;

const LoginComponent = () => {
  return (
    <LoginContainer>
      <LoginTitle>이슈 트래커</LoginTitle>
      <LoginForm></LoginForm>
    </LoginContainer>
  );
};

export default LoginComponent;
