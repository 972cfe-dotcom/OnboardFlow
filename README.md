# Base44 App

This app was created automatically by Base44.
It's a Vite+React app that communicates with the Base44 API.

## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Firebase Deployment

### Prerequisites
1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase (if not already done):
```bash
firebase init hosting
```

### Deploy to Firebase
```bash
npm run build
firebase deploy
```

## Google Cloud Platform Setup

### Configure Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Update `.firebaserc` with your project ID
4. Enable Firebase Hosting

### Firebase Authentication Setup
1. In Firebase Console, go to Authentication
2. Enable Sign-in methods (Email/Password, Google, etc.)
3. Add your domain to authorized domains

### Firestore Database Setup
1. In Firebase Console, go to Firestore Database
2. Create database (Start in production mode or test mode)
3. Set up security rules
4. Create collections as needed

### Cloud Functions (Optional)
1. Install Firebase Functions:
```bash
npm install -g firebase-tools
firebase init functions
```

2. Deploy functions:
```bash
firebase deploy --only functions
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Project Structure for Firebase

```
base44-app/
├── src/
│   ├── config/
│   │   └── firebase.js         # Firebase configuration
│   ├── services/
│   │   ├── auth.js             # Authentication service
│   │   └── firestore.js        # Firestore service
│   └── ...
├── firebase.json                # Firebase hosting config
├── .firebaserc                  # Firebase project config
└── firestore.rules              # Firestore security rules
```

For more information and support, please contact Base44 support at app@base44.com.
