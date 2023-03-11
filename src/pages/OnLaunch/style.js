import styled from 'styled-components';
import {colors} from '../../assets/colors';
const Icone = styled.Image`
  height: 300px;
  width: 90%;
`;

const H1 = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;

const P = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.p};
  margin-top: 9px;
`;

export {Icone, H1, P};
