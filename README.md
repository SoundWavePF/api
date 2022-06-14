# SoundWave API

## Instructions
### Environments Variables
Create your `.env` file with this template

```
DB_USER="user"
DB_PASSWORD="password"
DB_HOST="host"
DB_NAME="database"
PORT="port"
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