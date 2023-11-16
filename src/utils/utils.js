import {format, fromUnixTime} from 'date-fns';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ToastAndroid} from 'react-native';
class Utils {
  static getDateFormated(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  static formatarDataMilissegundos(milissegundos) {
    const data = new Date(Number(milissegundos));

    return format(data, 'dd/MM/yyyy');
  }

  static formatFileSize(sizeInBytes) {
    if (sizeInBytes < 1024) {
      return sizeInBytes + ' bytes';
    } else if (sizeInBytes < 1024 * 1024) {
      return (sizeInBytes / 1024).toFixed(2) + ' KB';
    } else if (sizeInBytes < 1024 * 1024 * 1024) {
      return (sizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (sizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }
  static dateFromFirestoreToBrasilianFormat(firestoreDate) {
    const firebaseDate = firestoreDate; // Exemplo de objeto de data do Firebase Firestore
    const dataUnix = firebaseDate.seconds;
    const dataBrasileira = format(
      fromUnixTime(dataUnix),
      'dd/MM/yyyy HH:mm:ss',
    );
    // console.log(dataBrasileira); // Saída: '12/10/2023 18:49:45'
    return dataBrasileira;
  }

  static formatarCPF(cpf) {
    // Remove qualquer caractere não numérico da string
    cpf = cpf.replace(/\D/g, '');
    // Aplica a formatação do CPF (###.###.###-##)
    cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
    return cpf;
  }
  static formatarCelular(celular) {
    celular = celular.replace(/\D/g, '');
    celular = celular.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    return celular;
  }
  static formatarDataNascimento(birthDay) {
    birthDay = birthDay.replace(/\D/g, '');
    birthDay = birthDay.replace(/^(\d{4})(\d{2})(\d{2})$/, '$3/$2/$1');
    return birthDay;
  }
  static print(content) {
    console.log(content);
  }
  static leftIcon() {
    return <AntDesign name="left" color={'#fff'} size={25} />;
  }

  static calendarIcon() {
    return <AntDesign name="calendar" color={'#000'} size={25} />;
  }
  static ShowToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

export {Utils};
