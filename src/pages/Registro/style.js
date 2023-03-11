import {StyleSheet} from 'react-native';
import styled from 'styled-components';
import {colors} from '../../assets/colors';
const tamanho = 70;
const largura = 100;
const margin_top = 40;

const s = StyleSheet.create({
  Container: {
    marginTop: margin_top,
    width: largura + '%',
  },
  Label: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 700,
  },
  PickerContainer: {
    backgroundColor: '#fff',
    height: tamanho,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 6,
  },
  Titulo: {
    fontSize: 20,
    color: '#000',
    fontWeight: 700,
  },
});

const BtnFundo = styled.TouchableOpacity`
  margin-top: ${margin_top}px;
  background-color: ${colors.btn_fundo};
  width: ${largura}%;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  padding: 8px;
  height: ${tamanho}px;
`;

const BtnText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #000;
`;

export {s, BtnFundo, BtnText};
