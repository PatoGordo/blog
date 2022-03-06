# PatoGordo Blog

## Stack
- Vue 3
- Vue Router 4
- Lesscss
- Iconify
- Firebase

## Firebase rules
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      match /posts/{post} {
        allow read
        allow create, delete, update: if request.auth.uid == '1DA3osrsytSVEZLErON6jhQxjO72'
        allow create, delete, update: if request.auth.uid == 'oTbWyKZAh8VyzzTJ6UuS4YP3Iea2'
      }
      
      match /comments/{comment} {
        allow read
        allow create: if request.auth != null
        allow delete: if  request.auth.uid == resource.data.uid
      }
    }
  }
}
```
