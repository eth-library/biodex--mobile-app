# Mobile App for Lepi
The application is built with React-Native and the Expo framework.

- [Intro  Guide](#intro--guide)
- [Authentication](#authentication)
- [Predictions](#predictions)
- [Run the project locally](#run-the-project-locally)

## Intro / Guide

- A swipeable guide on how to use the app will be shown when the user loads the app for the first time
- This guide can be accessed again through the drawer navigation, after being logged in

## Authentication

- Authentication is done with JWT tokens.
- Currently, users need to get invited to create a new account. Invitation can be sent from any logged in user, via the 'invitation' tab in the drawer navigator.
- After receiving an email with a registration code, the new user can sign up.
- Also resetting the password is in 2 steps. First the user requests a reset pw token and then can reset his password.

## Predictions

- An image can be taken with the camera or be selected via gallery. The image needs to be cropped to a square image, containing only the butterfly.
- By clicking on crop, it will send the image to the predictions API and get the predictions in return.
- The user will be redirected to the results screen, where he can select the prediction that matches the uploaded image.

## Run the project locally

- After having cloned the project, through the terminal, navigate inside the frontend folder where the package.json is located

- Run `npm install`
- Run `npm start`
  - In case you use Firefox and it hangs at "Opening DevTools in the browser", run `env BROWSER=firefox expo start`

- Connect your phone or use an emulator to see the app
  - Phone: https://docs.expo.io/versions/latest/get-started/installation/#2-mobile-app-expo-client-for-ios
  - Emulator: https://docs.expo.io/versions/latest/get-started/installation/#running-the-expo-client-on-your-computer

> The previous steps are to make the mobile app run on your device or emulator. To connect it to the REST API, following steps are needed.

- Run the backend application locally. Check the README.md in /backend
- Android doesn't allow http connections. For this reasons, ngrok can be used for tunnelling your localhost through a https connection. https://ngrok.com/
- After having installed ngrok, run `./ngrok http 8000` from your terminal
- Copy the forwarding https url which displays in your terminal and update the devRoot in /frontend/constants/index.js
