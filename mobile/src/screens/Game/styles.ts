import { StyleSheet } from 'react-native';
import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 28,
    justifyContent: 'space-between'
  },
  logo: {
    width: 72,
    height: 40,
    alignSelf: 'center'
  },
  right: {
    width: 20,
    height: 20
  },
  containerCover: {
    width: '100%',
  },
  cover: {
    height: 160,
    borderRadius: 8,
    marginHorizontal: 32,
    marginVertical: 28
  },
  containerList: {
    width: '100%',
  }, 
  contentList: {
    paddingLeft: 32,
    paddingRight: 64,
    alignItems: 'flex-start'
  },
  emptyListContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    color: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.SM,
    fontFamily: THEME.FONT_FAMILY.REGULAR
  }
});