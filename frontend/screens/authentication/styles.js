import Theme from '../../theme';

export const authStyles = {
  fullScreenContainer: {
    backgroundColor: 'green',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1
  },
  form: {
    height: '70%',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  formTitle: {
    fontFamily: Theme.fonts.primary,
    fontSize: Theme.fonts.sizeM,
    marginBottom: Theme.space.vertical.xSmall
  },
  text: {
    color: Theme.colors.grey,
    width: '100%',
    textAlign: 'center'
  },
  link: {
    color: Theme.colors.link,
    width: '100%',
    textAlign: 'center',
    marginBottom: Theme.space.vertical.xxSmall
  },
  textInput: {
    height: 40,
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Theme.colors.grey,
    borderRadius: Theme.borders.radius,
    marginBottom: Theme.space.vertical.xSmall
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  terms: {
    fontSize: Theme.fonts.sizeTC,
    color: Theme.colors.black
  }
};
