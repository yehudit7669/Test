# Wizer App Frontend

Build beautiful, engaging online worksheets!

## Run Locally

Make sure you have the latest node.js version as app is created with v.20+

Make sure to have vscode v1.76.0+ as sometimes it throws errors with TS.

### Clone the project

```bash
  git clone https://github.com/Wizer-me/wizer-fe.git
```

### Go to the project directory

```bash
  cd wizer-fe
```

### Install dependencies

```bash
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

For local development clone BE repo and add this env var :

`VITE_REACT_APP_URL=http://localhost:3000/`

For Staging BE use this :

`VITE_REACT_APP_URL=https://wizer-be-staging-g372w7tgka-uc.a.run.app/`

`VITE_WS_URL=ws://127.0.0.1:8000`

`VITE_REACT_APP_ENV=develop`

### Start the server

```bash
  npm start
```

### To access env vars

In vite there is a different approach to access env vars see the below example:

```bash
  import.meta.env.VITE_WS_URL
```

## App Directory

![App Screenshot](https://i.ibb.co/Vt10Pgh/Screenshot-2023-07-04-at-1-08-21-PM.png)

## Defining Components

Always create a folder, add structure like this and create default export index.tsx file to export only one default component from a folder.

![App Screenshot](https://i.ibb.co/vQY1fw6/Screenshot-2023-07-04-at-1-19-08-PM.png)

Use pages directory to create different screens and make sure to create components and folder names which make mean to the functionality/screen.

![App Screenshot](https://i.ibb.co/wy2x0Qn/Screenshot-2023-07-04-at-1-29-56-PM.png)

## Defining common components

Keep the components which are completely reusable and provide props with proper error handling. Make sure to not add anything static to it always keep components contain data which is dynamic.

![App Screenshot](https://i.ibb.co/z2szytF/Screenshot-2023-07-04-at-1-25-56-PM.png)

## Routing

Example route with an layout

```javascript
import { routes } from '../constants'
import AuthLayout from '../components/layouts/AuthLayout'

function App() {
  return
  ;<Routes>
    <Route element={<AuthLayout />}>
      <Route index element={<Navigate to={`/${routes.SIGN_IN}`} replace />} />
    </Route>
  </Routes>
}
```

## Defining Redux Actions

![App Screenshot](https://i.ibb.co/RzkW9xW/Screenshot-2023-07-04-at-1-13-02-PM.png)

## Combining Redux Actions

Import all your actions as the example customerActions.

![App Screenshot](https://i.ibb.co/FHqQLKg/Screenshot-2023-07-04-at-1-23-13-PM.png)

## Defining Redux Reducers

![App Screenshot](https://i.ibb.co/gmpGwPf/Screenshot-2023-07-04-at-2-16-14-PM.png)

## Combining Reducers

![App Screenshot](https://i.ibb.co/grQNBST/Screenshot-2023-07-04-at-1-17-14-PM.png)

## Defining constants

Please make const files to define constants and export it to use it thru-out app.
Create it inside the constants directory

![App Screenshot](https://i.ibb.co/HBdR25K/Screenshot-2023-07-04-at-1-33-53-PM.png)

## Api calling

Use the services directory

Create folder as per need and create Apis.tsx and Services.tsx

![App Screenshot](https://i.ibb.co/P6G3sSp/Screenshot-2023-07-04-at-1-36-34-PM.png)

Apis.tsx example:

![App Screenshot](https://i.ibb.co/WkF1LjM/Screenshot-2023-07-04-at-1-39-02-PM.png)

Services.tsx example:

![App Screenshot](https://i.ibb.co/MC1f1Z7/Screenshot-2023-07-04-at-1-40-17-PM.png)

## Storing assets

Make sure to add images and svgs to the respected folders and app theme related css inside the styles folder.

![App Screenshot](https://i.ibb.co/pW8dmVD/Screenshot-2023-07-04-at-1-50-00-PM.png)

## Adding translations

Go to the **i18n** folder and open **en** folder and open the **en.json**

![App Screenshot](https://i.ibb.co/MB4Dgsd/Screenshot-2023-07-04-at-1-52-30-PM.png)

Add translations in the object like the example below

![App Screenshot](https://i.ibb.co/mzXsg0J/Screenshot-2023-07-04-at-1-52-48-PM.png)

To use translation consts in component follow the below steps :

Import the useTranslation and declare the hook as shown in the image below :

![App Screenshot](https://i.ibb.co/Twy4QZJ/Screenshot-2023-07-04-at-1-53-42-PM.png)

Use it like this wherever you want to use in JSX :

![App Screenshot](https://i.ibb.co/qpb8S6f/Screenshot-2023-07-04-at-1-53-11-PM.png)

## App text field validations

Go to the **validations** directory

![App Screenshot](https://i.ibb.co/4tQNS3g/Screenshot-2023-07-04-at-2-00-41-PM.png)

Add it like this :

```javascript
const emailRegex: any =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const loginValidations = (email: string, password: string) => {
  let status
  let message
  if (!email || !password) {
    status = true
    message = 'Please fill all details.'
    return { message, status }
  } else if (!emailRegex.test(email)) {
    status = true
    message = 'Please enter valid email address.'
    return { message, status }
  } else {
    status = false
    message = ''
    return { message, status }
  }
}
```
