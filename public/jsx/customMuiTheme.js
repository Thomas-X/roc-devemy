import * as colors from './colors';

import {fade} from 'material-ui/utils/colorManipulator';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export const muiTheme = getMuiTheme({
    palette: {
        primary1Color: colors.deepOrange500,
        primary2Color: colors.deepOrange700,
        primary3Color: colors.grey400,
        accent1Color: colors.lightBlue500,
        accent2Color: colors.grey100,
        accent3Color: colors.grey500,
        textColor: colors.darkBlack,
        alternateTextColor: colors.white,
        canvasColor: colors.white,
        borderColor: colors.grey300,
        disabledColor: fade(colors.darkBlack, 0.3),
        pickerHeaderColor: colors.lightBlue500,
        clockCircleColor: fade(colors.darkBlack, 0.07),
        shadowColor: colors.fullBlack,
    }

})
// seperate javascript object used for styling from styles.js
export const customTheme = {
    primary1Color: colors.deepOrange500,
    primary2Color: colors.deepOrange700,
    primary3Color: colors.grey400,
    accent1Color: colors.lightBlue500,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: fade(colors.darkBlack, 0.3),
    pickerHeaderColor: colors.lightBlue500,
    clockCircleColor: fade(colors.darkBlack, 0.07),
    shadowColor: colors.fullBlack,
    floatingLabelTextColor: colors.grey900,
    homePurposeColor: colors.grey300,
    footerColor: colors.grey900,
    dangerColor: colors.red600,
}