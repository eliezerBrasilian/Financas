class DateTime {
  constructor() {
    this.months = [
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
    this.monthsThatCanBeSelected = {
      CURRENT: 'current',
      PAST_MONTH: 'pastMonth',
      THREE_MONTHS_AGO: 'threeMonthsAgo',
      FOUR_MONTHS_AGO: 'fourMonthsAgo',
      FIVE_MONTHS_AGO: 'fiveMonthsAgo',
    };
  }

  static getMonth(monthInNumber) {
    switch (monthInNumber) {
      case 1:
        return 'Janeiro';
      case 2:
        return 'Fevereiro';
      case 3:
        return 'Março';
      case 4:
        return 'Abril';
      case 5:
        return 'Maio';
      case 6:
        return 'Junho';
      case 7:
        return 'Julho';
      case 8:
        return 'Agosto';
      case 9:
        return 'Setembro';
      case 10:
        return 'Outubro';
      case 11:
        return 'Novembro';
      case 12:
        return 'Dezembro';
    }
  }

  static getPastFiveMonths() {
    const currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1;
    var lastMonth = currentDate.getMonth() + 0;
    var threeMonthsAgo = currentDate.getMonth() - 1;
    var fourMonthsAgo = currentDate.getMonth() - 2;
    var fiveMonthsAgo = currentDate.getMonth() - 3;

    var pastFiveMonths = [
      this.getMonth(fiveMonthsAgo),
      this.getMonth(fourMonthsAgo),
      this.getMonth(threeMonthsAgo),
      this.getMonth(lastMonth),
      this.getMonth(currentMonth),
    ];

    return pastFiveMonths;
  }

  getMonthAndYear(monthSelected = this.monthsThatCanBeSelected.CURRENT) {
    var month;
    var date = new Date();

    if (monthSelected == this.monthsThatCanBeSelected.CURRENT) {
      month = date.getMonth() + 1;
    } else if (monthSelected == this.monthsThatCanBeSelected.PAST_MONTH) {
      month = date.getMonth() + 0;
    } else if (monthSelected == this.monthsThatCanBeSelected.THREE_MONTHS_AGO) {
      month = date.getMonth() - 1;
    } else if (monthSelected == this.monthsThatCanBeSelected.FOUR_MONTHS_AGO) {
      month = date.getMonth() - 2;
    } else if (monthSelected == this.monthsThatCanBeSelected.FIVE_MONTHS_AGO) {
      month = date.getMonth() - 3;
    }

    const mes = String(month).padStart(2, '0');
    const ano = date.getFullYear();

    return `${mes}/${ano}`;
  }
}

export {DateTime};
