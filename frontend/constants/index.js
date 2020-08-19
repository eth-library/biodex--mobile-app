// Android doesn't allow http requests - a https tunnel can be created with https://dashboard.ngrok.com/get-started 
// After having installed ngrok, run `./ngrok http 8000` in the terminal and updated the devRoot with the given https url

const devRoot = 'https://cd56e1cf.ngrok.io/backend/api';
const prodRoot = 'https://biodex-test.ethz.ch/mob-api';

export const rootEndpoint = __DEV__ ? devRoot : prodRoot;
