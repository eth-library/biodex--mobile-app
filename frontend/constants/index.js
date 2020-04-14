import { Platform } from 'react-native';

// Android doesn't allow http requests by default and to change that, I only found a solution where I would have to eject the expo app
// An alternative is to use https://dashboard.ngrok.com/get-started to create a https tunnel to the localhost api and use the returned https address
// Somehow the email notification doesn't work anymore - test that on IOS
// After having installed ngrok, run `./ngrok http 8000` in terminal and updated the rootEndPoint for android to the given https url

const developmentAPI = Platform.OS === 'ios' ? 'http://localhost:8000/backend/api' : 'https://6dc99cb4.ngrok.io/backend/api';
const productionAPI = 'https://api.lepi.propulsion-home.ch/backend/api';

export const rootEndpoint = __DEV__ ? developmentAPI : productionAPI;
