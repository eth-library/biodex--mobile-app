import { Platform } from 'react-native';

// Android doesn't allow http requests by default and to change that, I only found a solution where I would have to eject the expo app
// An alternative is to use https://dashboard.ngrok.com/get-started to create a https tunnel to the localhost api and use the returned https address
// Somehow the email notification doesn't work anymore - test that on IOS

export const rootEndpoint = Platform.OS === 'ios' ? 'http://localhost:8000/backend/api' : 'https://d2ccadd9.ngrok.io/backend/api';
