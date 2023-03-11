import styled from 'styled-components';
import {colors} from '../../assets/colors';
const Header = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: center;
`;
const Titulo = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
`;
const HistoricoText = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  margin-right: 20px;
`;

const BtnRegristrar = styled.TouchableOpacity`
  background-color: ${colors.btn_registrar};
  align-items: center;
  justify-content: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  border-width: 0.8px;
  border-color: #fff;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export {Header, Titulo, HistoricoText, BtnRegristrar};
