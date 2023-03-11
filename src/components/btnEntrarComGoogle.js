import styled from 'styled-components';
import {colors} from '../assets/colors';

const IconeBtnGoogle = styled.Image`
  height: 40px;
  width: 40px;
  margin-right: 10%;
`;
const BtnFundoGoogle = styled.TouchableOpacity`
  flex-direction: row;
  margin-top: 15px;
  background-color: ${colors.btn_fundo};
  width: 90%;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
`;

const BtnTextGoogle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

export {BtnFundoGoogle, IconeBtnGoogle, BtnTextGoogle};
