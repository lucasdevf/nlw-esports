import { StyleSheet } from 'react-native';

import { THEME } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  logo: {
    width: 214,
    height: 120,
    marginTop: 74,
    marginBottom: 48
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLORS.PRIMARY,
    padding: 16,
    borderRadius: 4,
    width: 360
  },
  signInButtonText: {
    color: THEME.COLORS.TEXT,
    marginLeft: 16
  }
});