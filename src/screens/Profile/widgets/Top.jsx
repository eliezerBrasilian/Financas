import React, {useMemo, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {DateTime} from '../../../classes/DateTime';
import Header from '../../../components/Header';
import Icon from '../../../components/Icon';
import {Loading} from '../../../components/Loading';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useProfilePicture} from '../../../contexts/ProfilePictureContext';
import {useUserContext} from '../../../contexts/UserContext';
import {Ifinancas} from '../../../utils/Ifinancas.utils';

export function Top() {
  const {user, isPremium} = useUserContext();

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
        isPremium={isPremium}
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
  const [profilePicture_, setProfilePicture] = useState(profilePicture);

  useMemo(() => {
    setProfilePicture(profilePicture);
  }, [profilePicture]);

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
            profilePhoto={profilePicture_}
            isAsynchronous={true}
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

const BottomStatus = ({activeSince, isPremium}) => {
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
        description={isPremium ? 'Conta premium' : 'Conta gratuita'}
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
