import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import {DateTime} from '../../../classes/DateTime';
import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
import {Loading} from '../../../components/Loading';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';
import {useProfilePicture} from '../../../contexts/ProfilePictureContext';
import {Ifinancas} from '../../../utils/Ifinancas.utils';

export function Top() {
  const {user} = useFirebase();

  return (
    <View style={{marginBottom: 10, padding: 15}}>
      <Header title={'Perfil'} color="#fff" />
      <ViewCenteredInTheMiddle>
        <EditableImageProfile uid={user.uid} />
        <TextContent fontSize={20} fontWeight="bold" color="#fff">
          {user.name}
        </TextContent>
        <TextContent fontSize={15} color="#fff">
          {user.email}
        </TextContent>
      </ViewCenteredInTheMiddle>
      <BottomStatus
        activeSince={DateTime.convertMilisecondsToMonthAndYear(user?.createdAt)}
      />
    </View>
  );
}

const ViewCenteredInTheMiddle = ({children}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 7,
        marginTop: 20,
      }}>
      {children}
    </View>
  );
};

const EditableImageProfile = ({uid}) => {
  const {savePhoto, profilePicture, savingPhoto} = useProfilePicture();
  const [profileImage, setProfileImage] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = loadProfilePictureFromDevice();
    return () => unsubscribe;
  }, [profilePicture]);

  async function loadProfilePictureFromDevice() {
    var profilePictureFromDevice = await Ifinancas.getImageFromDevice();
    setProfileImage(profilePictureFromDevice);
  }

  async function updateProfilePicture() {
    var imagePath =
      await Ifinancas.LaunchSelectorOfImageAndRetriveImageSelected();
    await savePhoto(imagePath, uid);
  }
  return (
    <TouchableOpacity onPress={updateProfilePicture}>
      {savingPhoto ? (
        <Loading isFlex={false} backgroundColor="transparent" />
      ) : (
        <View>
          <ProfileImage
            hasBorderRadius={true}
            size={70}
            profilePhoto={profileImage == null ? null : {uri: profileImage}}
          />
          <Pencil />
        </View>
      )}
    </TouchableOpacity>
  );
};

const Pencil = () => {
  return (
    <View
      style={{
        backgroundColor: '#2A0C4E',
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}>
      <Icon name="edit" size={20} />
    </View>
  );
};

const BottomStatus = ({activeSince}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#0B032D',
        borderRadius: 20,
        marginTop: 20,
      }}>
      <BottomItem
        icon={require('../../../assets/images/crown_status.png')}
        title={'Status'}
        description={'Conta gratuita'}
      />
      <BottomItem
        icon={require('../../../assets/images/calendar.png')}
        title={'Conta ativa desde'}
        description={activeSince}
      />
    </View>
  );
};

const BottomItem = ({icon, title, description}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 5,
      }}>
      <ProfileImage profilePhoto={icon} size={20} />
      <View style={{}}>
        <TextContent textAlign="left" fontSize={12} color="#fff">
          {title}
        </TextContent>
        <TextContent textAlign="left" fontSize={14} color="#fff">
          {description}
        </TextContent>
      </View>
    </View>
  );
};
