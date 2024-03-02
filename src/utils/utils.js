import {format, fromUnixTime} from 'date-fns';
import {Alert, ToastAndroid} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

class Utils {
  static convertMilisecondsToMonthAndYear(milliseconds) {
    var date = new Date(milliseconds);
    var options = {year: 'numeric', month: '2-digit'};
    var formattedDate = date
      .toLocaleDateString('pt-BR', options)
      .replace(/(\d{2})\/(\d{4})/, '$1/$2');
    return formattedDate;
  }

  static showAlert(title, message, alertButtons) {
    Alert.alert(
      title,
      message,
      alertButtons,
      // {
      //   text: 'Cancel',
      //   onPress: () => console.log('Cancel Pressed'),
      //   style: 'cancel',
      // },
      // {text: 'OK', onPress: () => console.log('OK Pressed')},
    );
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

  static getDateFormated(data = new Date()) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  }

  static getMonthAndYear(data = new Date()) {
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

  static convertFirebaseDateToMonthYear(firebaseDate) {
    const dataInMilliseconds =
      firebaseDate?.seconds * 1000 + firebaseDate?.nanoseconds / 1e6;

    // Criando um objeto Date com a data em milissegundos
    const date = new Date(dataInMilliseconds);

    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    // Formatando para "mm/yyyy"
    const mesAnoFormatado = `${mes.toString().padStart(2, '0')}/${ano}`;

    return mesAnoFormatado;
  }

  static dateFromFirestoreToBrasilianFormat(firestoreDate) {
    const firebaseDate = firestoreDate; // Exemplo de objeto de data do Firebase Firestore
    const dataUnix = firebaseDate?.seconds;

    if (firebaseDate !== null) {
      const dataBrasileira = format(fromUnixTime(dataUnix), 'dd/MM/yyyy');
      // console.log(dataBrasileira); // Saída: '12/10/2023 18:49:45'
      return dataBrasileira;
    } else return '';
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

  static arredondaNumero(num) {
    var number = Number(num);

    // Verifica se o número tem mais de uma casa decimal
    if (number % 1 !== 0) {
      // Arredonda para uma casa decimal
      return parseFloat(number.toFixed(1));
    } else {
      // Mantém o número como está
      return number;
    }
  }
}

export {Utils};
