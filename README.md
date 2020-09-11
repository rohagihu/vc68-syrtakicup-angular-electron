
# VC68 Syrtaki-Cup - Game Schedule

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.
Powered by Electron & SQLite3

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The angular app will automatically reload if you change any of the source files.

For an active SQLite Database also run `node dev.db.js` in a separate terminal. This database node server runs on `http://localhost:3000`

## Build

To build the electron-angular app run the command `npm run start:electron`. This will build the angular app to the `dist/` directory and starts the electron preview. Close this preview and finally run `npm run pack`. A new directory will be created in the root directory depending on which OS you build the app. 


## Issues

There is a problem with the database file `data.db` in the root directory of the angular app when building the electron app and you want to use the file from the development. For a first workaround on windows: 

Copy the database from `.\electron-test-win32-x64\resources\app\data.db` and paste it into `.\electron-test-win32-x64\data.db`.
