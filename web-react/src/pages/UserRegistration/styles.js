import styled from "styled-components";

export const TitleContainer = styled.div`
  height: 63px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
`;

export const TitleBox = styled.div`
  background-color: #6486ff;
  border: 2px solid #a7a7a7;
  box-shadow: 0px 4px 8.1px -2px #00000040;
  height: 63px;
  position: absolute;
  left: 10px;
  top: 35px;
  width: 1880px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleText = styled.div`
  color: #ffffff;
  font-family: "Impact", Helvetica;
  font-size: 30px;
  font-weight: 400;
  white-space: nowrap;
`;

export const FormBackground = styled.div`
  background-color: #e9ecef;
  border-radius: 20px;
  box-shadow: 0px 4px 8.1px -2px #00000040;
  width: 700px;
  height: 600px;
  margin: 80px auto;
  position: relative;
  padding: 20px;
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
`;

export const FormContainer = styled.div`
  margin-top: 160px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const InputGroup = styled.div`
  position: relative;
  width: 431px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const InputRectangle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e9ecef;
  border: 1px solid #b2b2b2;
  border-radius: 8px;
`;

export const InputFrame = styled.div`
  position: absolute;
  top: -10px;
  left: 15px;
  background-color: #e9ecef;
  color: #1c4eff;
  font-family: "Inter-Regular", Helvetica;
  font-size: 17px;
  font-weight: 400;
  padding: 0 5px;
`;

export const InputField = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  font-family: "Inter-Regular", Helvetica;
  color: #3d3d3d;

  &[type="date"] {
    padding-right: 30px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;

    &::-webkit-calendar-picker-indicator {
      position: absolute;
      right: 60px;
      cursor: pointer;
      opacity: 0.8;
    }
  }

  &:focus {
    outline: none;
  }
`;

export const SelectField = styled.select`
  position: relative;
  width: 100%;
  height: 100%;
  background: none;
  border: none;
  padding: 0 15px;
  font-size: 16px;
  font-family: "Inter-Regular", Helvetica;
  color: #3d3d3d;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &::-ms-expand {
    display: none;
  }
`;