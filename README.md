# SoundWave API

## Instructions
### Environments Variables
Create your `.env` file with this template

```
API_URL=yourBackEnd
CLIENT_URL=yourFrontEnd
DB_HOST=dbhost
DB_NAME=dbname
DB_PASSWORD=dbpassword
DB_PORT=dbport
DB_USER=dbuser
EMAIL_PASSWORD=password
EMAIL_USER=email
OAUTH_CLIENTID=googleOauthClientId
OAUTH_CLIENT_SECRET=googleOauthSecret
OAUTH_REFRESH_TOKEN=googleRefreshToken
STRIPE_SECRET_KEY=stripeKey
```
### Install dependencies
Run `npm install` to install all modules listed as dependencies in package.json

---

## Available Scripts
### `npm start`
Runs the app.\
Open `http://DB_HOST:PORT`

### `npm dev`
Runs the app on development mode.\
It restarts target node process when any of required files changes but shares Typescript compilation process between restarts

### `npm tsc`
Emit JS for just the index with the compiler defaults

## Documentation

### Typescript
https://www.typescriptlang.org/docs/
