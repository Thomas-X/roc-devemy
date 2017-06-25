import {customTheme} from './customMuiTheme';
import * as colors from './colors';

// we can't export this to our SASS because material-ui NEEDS inline styling for some reason.
/*
*
*    EXCLUDES
*
* */
export const floatingLabelStyle = {
    color: colors.blue500,
    borderColor: colors.blue500,
}
export const underlineStyle = {
    borderColor: colors.blue500,
    color: colors.blue500,
}
export const courseListItem = {
    marginLeft: 18,
    paddingTop: 10,
    paddingRight: 16,
    paddingBottom: 10,
    paddingLeft: 10,
    position: 'relative',
    display: 'flex',
}
export const cardTitleStyle = {
    width: 150,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    color: customTheme.alternateTextColor
}
export const cardSubtitleStyle = {
    width: 205,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    color: customTheme.alternateTextColor
}

////////////////////////////////////////////
