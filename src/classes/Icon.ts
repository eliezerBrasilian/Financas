import { Category as alias } from "../enums/Category";

class Icon {
  public static getIcons() {
    const icons = [
      {key: '1',  iconName: 'casino', iconPack: 'MaterialIcon'},
      {key: '2',  iconName: 'monetization-on', iconPack: 'MaterialIcon'},
      {key: '3',  iconName: 'home', iconPack: 'AntDesign'},
      {key: '4',  iconName: 'fastfood', iconPack: 'MaterialIcon'},
      {key: '5',  iconName: 'Trophy', iconPack: 'AntDesign'},
      {key: '6',  iconName: 'tool', iconPack: 'AntDesign'},
      {key: '7', iconName: 'barchart', iconPack: 'AntDesign'},
      {key: '8',  iconName: 'smileo', iconPack: 'AntDesign'},
      {key: '9',  iconName: 'health-and-safety', iconPack: 'MaterialIcon'},
    ];
    return icons;
  }
}

export {Icon};
