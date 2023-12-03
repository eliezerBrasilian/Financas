import {format, fromUnixTime} from 'date-fns';

import {ToastAndroid} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';

class Utils {
  static getUsefulInformationsAboutCurrentBalance(tag, strong = false) {
    const tagToLowerCase = tag?.toLowerCase();
    if (tagToLowerCase == 'receita')
      return {
        backgroundColor: strong ? 'green' : '#C5E6A6',
        title: 'Receita',
        icon: require('../assets/images/increase.png'),
      };
    else if (tagToLowerCase === 'reserva')
      return {
        backgroundColor: strong ? 'blue' : colors.main_gray,
        title: 'Reserva',
        icon: require('../assets/images/growth.png'),
      };
    return {
      backgroundColor: strong ? 'red' : colors.main_pink,
      title: 'Despesa',
      icon: require('../assets/images/decrease.png'),
    };
  }

  static getBrazilianCurrency(value) {
    const formatedCurrency = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value + 0.0);
    return formatedCurrency;
  }

  static increaseMonth(data) {
    const newDate = new Date(data);

    // Adiciona 1 ao mês
    newDate.setMonth(newDate.getMonth() + 1);

    return newDate;
  }
  static decreaseMonth(data) {
    const newDate = new Date(data);

    newDate.setMonth(newDate.getMonth() - 1);

    return newDate;
  }

  static getDateFormated(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }
  static getMonthAndYear(data) {
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${mes}/${ano}`;
  }
  static getMonth(data) {
    const meses = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const numberOfMonth = data.getMonth();

    return meses[numberOfMonth];
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

  static calendarIcon() {
    return <AntDesign name="calendar" color={'#000'} size={25} />;
  }
  static ShowToast(message) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}

export {Utils};
