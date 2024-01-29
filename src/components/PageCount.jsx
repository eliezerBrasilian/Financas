import {colors} from '../assets/colors/colors';
import {TextContent} from './TextContent';

function PageCount({currentPage}) {
  return (
    <TextContent fontSize={14} fontWeight="normal" color={colors.main_purple}>
      {currentPage}/3
    </TextContent>
  );
}

export {PageCount};
