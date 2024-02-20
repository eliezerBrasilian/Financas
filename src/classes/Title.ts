import {tags} from '../enums/Tag';

class Title {
  public static getTitle(tag: string) {
    if (tag == tags.REVENUE) return 'Receitas';
    else if (tag == tags.RESERVATION) return 'Reservas';
    else return 'Despesas';
  }
}

export {Title};
