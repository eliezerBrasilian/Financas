import {colors} from '../assets/colors/colors';
import {tags} from '../enums/Tag';

class BackgroundColor {
  public static getBackgrouncColor(tag: string) {
    if (tag == tags.REVENUE) return colors.main_green;
    else if (tag == tags.RESERVATION) return colors.purple_for_selected_screen;
    else return colors.main_red;
  }
}

export {BackgroundColor};
