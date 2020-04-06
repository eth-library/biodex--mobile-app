import Theme from '../../theme';

export const authStyles = {
  fullScreenContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: '100%',
  },
  form: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  formTitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xSmall,
  },
  text: {
    color: Theme.colors.grey,
    width: '100%',
    textAlign: 'center',
  },
  link: {
    color: Theme.colors.link,
    width: '100%',
    textAlign: 'center',
    marginBottom: Theme.space.vertical.xxSmall,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};
