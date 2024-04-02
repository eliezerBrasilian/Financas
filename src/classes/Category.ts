import { Category as alias } from "../enums/Category";
import { IconPack } from "../enums/IconPack";

class Category {
  public static getCategories() {
    const categories = [
      {key: '1', value: alias.APOSTAS, iconName: 'casino', iconPack: IconPack.MATERIAL_ICONS},
      {key: '2', value: alias.ASSINATURA, iconName: 'monetization-on', iconPack: IconPack.MATERIAL_ICONS},
      {key: '3', value: alias.CASA, iconName: 'home', iconPack: IconPack.ANT_DESIGN},
      {key: '4', value: alias.LANCHE_FASTFOOD, iconName: 'fastfood', iconPack: IconPack.MATERIAL_ICONS},
      {key: '5', value: alias.LAZER, iconName: 'Trophy', iconPack: IconPack.ANT_DESIGN},
      {key: '6', value: alias.TRABALHO, iconName: 'tool', iconPack: IconPack.ANT_DESIGN},
      {key: '7', value: alias.INVESTIMENTO, iconName: 'barchart', iconPack: IconPack.ANT_DESIGN},
      {key: '8', value: alias.OUTROS, iconName: 'smileo', iconPack: IconPack.ANT_DESIGN},
      {key: '9', value: alias.SAUDE, iconName: 'health-and-safety', iconPack: IconPack.MATERIAL_ICONS},
    ];
    return categories;
  }
}

export {Category};
