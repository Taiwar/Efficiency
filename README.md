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

### Firebase Database Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".write": "$uid === auth.uid",
        ".read": "$uid === auth.uid"
      }
    },
    "lists": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### Running Efficiency

Use `yarn start` to launch a dev version.

Use `yarn build` to build a distributable version.

![Alt text](/public/favicon.png?raw=true)[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTaiwar%2FEfficiency.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FTaiwar%2FEfficiency?ref=badge_shield)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FTaiwar%2FEfficiency.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FTaiwar%2FEfficiency?ref=badge_large)