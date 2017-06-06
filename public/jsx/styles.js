import {customTheme} from './customMuiTheme';
import * as colors from './colors';

export const headline = {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
}
export const slide = {
    padding: 10,
}
export const tab = {
    height: 64,
}
export const tabs = {
    width: 400,
    height: 64,
}
export const tabsInkBar = {
    zIndex: 2,
}
export const drawerUserIcon = {
    paddingLeft: 19,
    paddingRight: 19,
    backgroundColor: customTheme.accent1Color
}
export const appbarFixed = {
    position: "fixed",
    top: 0,
    boxShadow: 'none',
}
export const drawerLogoh1 = {
    margin: 0,
    fontWeight: 300,
    backgroundColor: customTheme.accent1Color,
    color: customTheme.alternateTextColor,
    paddingLeft: 21,
}
export const drawerLogoContainer = {
    backgroundColor: customTheme.accent1Color,
    width: '100%',
    display: 'flex',
    paddingTop: 5,
    paddingBottom: 5,
}
export const appbarButtonNotLoggedIn = {
    color: customTheme.alternateTextColor,
}
export const appbarUserAvatarAndImage = {
    marginTop: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}
export const appbarUserAvatarAndImage2 = {
    padding: 0,
}
export const appbarUserName = {
    color: customTheme.alternateTextColor,
}
export const container = {
    height: '100%',
}
export const userProfileAbout = {
    marginLeft: 5,
}
export const circularLoader = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
}
export const userProfileAboutUserImage = {
    width: '80',
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    marginRight: 5,
    alignSelf: 'center',
}
export const userProfileAboutUserImageAndUsernameContainer = {
    width: '100%',
    display: 'flex',
    height: 80,
}

export const floatingLabelStyle = {
    color: colors.blue500,
    borderColor: colors.blue500,
}
export const underlineStyle = {
    borderColor: colors.blue500,
}
export const userProfileAboutUserType = {
    width: 250,
    background: 'none !important',
    cursor: 'default',
}
export const userProfileAboutEmailAndIsTeacherContainer = {
    display: 'flex',
    height: 72,
}
export const userProfileAboutLeftIconEmail = {
    alignSelf: 'center',
    fill: 'rgb(117, 117, 117)',
}
export const userProfileAboutEmail = {
    alignSelf: 'center',
    top: 0,
    // someone's going to be annoyed by this..
    paddingLeft: 33,
}
export const userProfileAboutUserName = {
    paddingTop: 0,
    paddingBottom: 0,
}
export const heroImage = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
}
export const heroContainer = {
    display: 'flex',
    padddingLeft: 24,
    paddingTop: 72,
    paddingBottom: 72,
    paddingRight: 24,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: customTheme.primary1Color,
}
export const heroDescription = {
    color: customTheme.alternateTextColor,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 300,
    textAlign: 'center',
}
export const heroTitle = {
    color: customTheme.alternateTextColor,
    marginTop: 0,
    fontWeight: 300,
}
export const homePurpose = {
    paddingTop: 72,
    paddingRight: 24,
    paddingBottom: 72,
    padddingLeft: 24,
    backgroundColor: customTheme.homePurposeColor,
    display: 'flex',
    justifyContent: 'center'
}
export const homePurposeText = {
    marginTop: 0,
    marginBottom: 13,
    marginLeft: 10,
    paddingTop: 19,
    paddingRight: 10,
    paddingLeft: 0,
    paddingBottom: 0,
    whiteSpace: 'wrap',
    width: 540,
}
export const heroButtonContainer = {
    width: '100%',
    height: 80,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: customTheme.primary1Color,
}
export const heroButtonGetStarted = {
    color: customTheme.alternateTextColor,
    height: 0,
}
export const aboutCardsContainer = {
    padddingLeft: 24,
    paddingTop: 72,
    paddingBottom: 72,
    paddingRight: 24,
    backgroundColor: customTheme.canvasColor,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
}
export const cardComponentTitle = {
    lineHeight: 2,
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 0,
    marginTop: 0,
    textAlign: 'center',
    fontWeight: 500,
    color: customTheme.textColor,
    backgroundColor: customTheme.homePurposeColor,
}
export const cardComponentImg = {
    height: 304,
    width: '100%',
}
export const aboutCardsComponentContainer = {
    margin: 10,
    cursor: 'pointer',
    width: 299,
    height: 351,
}
export const footerContainer = {
    padddingLeft: 24,
    paddingTop: 72,
    paddingBottom: 72,
    paddingRight: 24,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: customTheme.footerColor,
}
export const footerTextAboutMe = {
    color: customTheme.alternateTextColor,
}
export const githubIconDrawer = {
    color: 'rgb(117, 117, 117)',
    fontSize: 24,
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
export const courseListItemAvatar = {
    alignSelf: 'center',
    marginRight: 25,
    position: 'initial',
    flexShrink: 0,

}
export const courseListItemTitle = {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    width: 156,
}
export const courseListItemTitleContainer = {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
}
export const courseListItemSubTitleAuthor = {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginTop: 2,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    overflow: 'hidden',
    width: 156,
}
export const card = {
    width: 250,
    height: 250,
    cursor: 'pointer',
}
export const cardImage = {
    width: 250,
    height: 250,
    cursor: 'pointer',
}
export const userhomepage = {
    padding: 10,
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
export const userhomepagedivider = {
    marginBottom: 10,
}
export const cardTitleContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: 205,
    flexShrink: 0,
}
export const cardIndexLink = {
    width: 250,
    height: 250,
}
export const cardOverlayContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 0,
    flexStretch: 0,
    width: '100%',
}
export const appBarContainer = {
    display: 'flex',
    flexDirection: 'row',
}
export const appbarSearch = {
    alignSelf: 'center',
    color: customTheme.alternateTextColor,
    marginRight: 5,
    cursor: 'pointer',
}
export const paper = {
    margin: 20,
}
export const paperEditorContent = {
    padding: 10,
    margin: 40,
}
export const courseTitleEditor = {
    paddingRight: 5,
}
export const courseImageEditor = {
    paddingRight: 5,
}
export const chapterTitleEditor = {}
export const chapterImageEditor = {}
export const removeChapterButton = {
    color: customTheme.dangerColor,
}
export const whiteText = {
    color: customTheme.alternateTextColor
}
export const leftSideCourseTitleEditorContainer = {
    alignSelf: 'flex-start',
}
export const rightSideCourseButtonsEditorContainer = {
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}
export const marginButtonsNextToEachother = {
    margin: 5,
    height: 36
}
export const publishCourseButtonEditor = {
    color: customTheme.alternateTextColor,
    marginRight: 10,
    height: 36
}
export const courseEditorTextFieldsContainer = {
    display: 'flex',
    flexDirection: 'column',
    flexStretch: 0,
    width: '80%',
    margin: 'auto',
}
export const editorContainer = {
    display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    height: 36,
}
export const cardOverlayAvgRating = {
    color: customTheme.alternateTextColor,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
}
export const cardStar = {
    color: colors.yellow700,
}
export const cardRatingAvg = {
    alignSelf: 'center',
    position: 'relative',
    left: -13,
}
export const ViewCourseFullWidthHeader = {
    width: '100%',
    height: 200,
    backgroundColor: customTheme.footerColor,
    display: 'flex',
    flexDirection: 'row',
}
export const ViewCourseFullWidthContainer = {
    paddingBottom: 10,
    alignSelf: 'flex-end',
    display: 'flex',
    marginLeft: 40,
    marginRight: 40,
    width: '100%',
    justifyContent: 'space-between',
}
export const ViewCourseFullWidthTitle = {
    color: customTheme.alternateTextColor,
    alignSelf: 'flex-start',
}
export const ViewCourseFullWidthAuthor = {
    color: customTheme.alternateTextColor,
    alignSelf: 'flex-end',
    fontWeight: '300',
}
export const ViewCourseDivider = {
    marginBottom: 10,
}
export const ViewCourseNavigation = {
    position: 'absolute',
    marginTop: 20,
    alignSelf: 'flex-end',
}
export const ViewCourseContent = {
    display:'flex',
    flexDirection: 'column',
}
export const ViewCourseGoToCourse = {
    marginRight: 5,
}
export const errorFollowingButton = {
    backgroundColor: customTheme.dangerColor,
    color: customTheme.alternateTextColor,
}
export const followedFollowingButton = {
    backgroundColor: colors.lightGreen600,
    color: customTheme.alternateTextColor,
}
export const commentContentContainer = {
    padding: 10,
    margin: 25,
}
export const commentContainer = {
    width: '100%',
    display:'flex',

}
export const commentUserImage = {
    height: 48,
    width: 48,
    margin: 16,
}
export const createCommentContainer = {
    display:'flex',
    flexWrap: 'no-wrap',
}
export const mCreateCommentContainer = {
    display:'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    maxWidth: 710,

}
export const createCommentSubmitButton = {
    alignSelf: 'flex-end',
    marginRight: 16,
}
export const commentDateAndDescriptionContainer = {
    display:'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 16,
    width:'100%',
    maxWidth: 710,
    height: 48,
}
export const commentAuthor = {
    marginBottom: 5,
}
export const commentContent = {
    marginBottom: 5,
    marginTop: 5,
}
export const commentDate = {
    fontWeight: '300',
    alignSelf: 'flex-end',
    marginRight: 16,
    top: -16,
    position: 'relative',
}
export const commentViewMore = {
    alignSelf: 'flex-end',
}