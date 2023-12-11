import AntDesign from 'react-native-vector-icons/AntDesign';
export default function Icon({name = 'left', size = 25, color = '#fff'}) {
  return <AntDesign name={name} color={color} size={size} />;
}
