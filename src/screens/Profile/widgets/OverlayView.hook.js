import {InternalStorage} from '../../../classes/InternalStorage';
import {useUserContext} from '../../../contexts/UserContext';

function useOverlay() {
  const {setUser} = useUserContext();
  var myStorage = new InternalStorage();

  async function signOut() {
    var cleared = await myStorage.clearDataFromDevice();
    if (cleared) setUser(null);
  }

  return {signOut};
}

export {useOverlay};
