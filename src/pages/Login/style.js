import styled from 'styled-components';
import {colors} from '../../assets/colors';

const P = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.p};
  margin-top: 9px;
  width: 90%;
  text-align: center;
`;
const InputContainer = styled.View`
  width: 90%;
  align-items: flex-start;
`;
const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-top: 9px;
`;

const Input = styled.TextInput`
  color: #000;
  font-weight: 600;
  font-size: 19px;
  background-color: #fff;
  width: 100%;
  border-radius: 6px;
  padding: 8px;
`;

const EsqueceuSenha = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.esqueceu_senha};
  margin-top: 9px;
`;
const Ou = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin-top: 9px;
`;

export {P, InputContainer, Label, Input, EsqueceuSenha, Ou};
