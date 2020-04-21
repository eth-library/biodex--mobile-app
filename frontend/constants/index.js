// Android doesn't allow http requests - a https tunnel can be created with https://dashboard.ngrok.com/get-started 
// After having installed ngrok, run `./ngrok http 8000` in the terminal and updated the devRoot with the given https url

const devRoot = 'https://a885671a.ngrok.io/backend/api';
const prodRoot = 'https://api.lepi.propulsion-home.ch/backend/api';

export const rootEndpoint = __DEV__ ? devRoot : prodRoot;
