import {View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../assets/colors/colors';
import {Navigation} from '../classes/Navigation';
import {Spacer} from './Spacer';
import {TextContent} from './TextContent';
import {Button} from './buttons/Button';

function BluerPremium() {
  const nav = new Navigation();
  return (
    <View
      style={{
        zIndex: 3,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
      <View
        style={{
          backgroundColor: '#fff',
          padding: 20,
          height: 90,
          width: 90,
          borderRadius: 90 / 2,
          overflow: 'hidden',
        }}>
        <MaterialCommunityIcons
          name="lock"
          size={50}
          color={colors.main_purple}
        />
      </View>
      <Spacer />
      <TextContent fontWeight="bold">
        Ative o iFinanças Premium e tenha
      </TextContent>
      <TextContent fontWeight="500">acesso a todos os recursos</TextContent>

      <Spacer />

      <Button
        title={'Ativar Premium'}
        backgroundColor="#2ff460"
        onClick={() => nav.navigateTo(nav.tabs.PREMIUM)}
      />
    </View>
  );
}

export {BluerPremium};
