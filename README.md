# Efficiency

A Todo App

Uses react + redux and semantic-ui for styling.

It also uses Firebase for realtime storage and authentication so you'll have to create
a new Firebase project and copy its config into `src/config/FirbaseConfig.js` 
and export it as `firebase` together with the `reduxFirebase` config:
```javascript
export const reduxFirebase = {
    userProfile: 'users',
};
```

Use `yarn start` to launch a dev version.

Use `yarn build` to build a distributable version.

![Alt text](/public/favicon.png?raw=true)