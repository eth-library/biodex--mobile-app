// Android doesn't allow http requests - a https tunnel can be created with https://dashboard.ngrok.com/get-started 
// After having installed ngrok, run `./ngrok http 8000` in the terminal and updated the devRoot with the given https url

// const devRoot = 'https://cd56e1cf.ngrok.io/backend/api';
const devRoot = 'https://biodex-test.ethz.ch/mob-api';
const prodRoot = 'https://biodex-test.ethz.ch/mob-api';

const devPredict = 'https://biodex-test.ethz.ch/pred-api/predict';
const prodPredict = 'https://biodex-test.ethz.ch/pred-api/predict';


export const rootEndpoint = __DEV__ ? devRoot : prodRoot;
export const predictEndpoint = __DEV__ ? devPredict : prodPredict;
export const predApiToken = 'Token 1cd9b82ec51934908464264423ad30aeda889a4e';