import styled from 'styled-components';
import {colors} from '../assets/colors';

const BtnFundo = styled.TouchableOpacity`
  margin-top: 40px;
  background-color: ${colors.btn_fundo};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
`;

const BtnText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

export {BtnFundo, BtnText};
