# מדריך פריסה מלא - Firebase & Google Cloud Platform

## תוכן עניינים
1. [הכנת הפרויקט](#הכנת-הפרויקט)
2. [הגדרת Firebase](#הגדרת-firebase)
3. [פריסה ל-Firebase Hosting](#פריסה-ל-firebase-hosting)
4. [הגדרת Authentication](#הגדרת-authentication)
5. [הגדרת Firestore Database](#הגדרת-firestore-database)
6. [Google Cloud Platform](#google-cloud-platform)
7. [טיפים ופתרון בעיות](#טיפים-ופתרון-בעיות)

---

## הכנת הפרויקט

### שלב 1: התקנת Dependencies

```bash
npm install
```

פקודה זו מתקינה את כל החבילות הנדרשות, כולל:
- React & Vite
- Firebase SDK
- Tailwind CSS & shadcn/ui components
- וכל שאר ה-dependencies

### שלב 2: בדיקת הפרויקט מקומית

```bash
npm run dev
```

זה יריץ את הפרויקט על `http://localhost:5173`

---

## הגדרת Firebase

### שלב 1: יצירת פרויקט Firebase

1. כנס ל-[Firebase Console](https://console.firebase.google.com/)
2. לחץ על "Add project" או "הוסף פרויקט"
3. תן שם לפרויקט (למשל: `base44-app`)
4. בחר אם להשתמש ב-Google Analytics (מומלץ)
5. המתן להשלמת יצירת הפרויקט

### שלב 2: הוספת אפליקציית Web

1. במסך הראשי של הפרויקט, לחץ על סמל Web `</>`
2. תן שם ל-App (למשל: "Base44 Web App")
3. סמן את "Also set up Firebase Hosting" (נגדיר את זה מאוחר יותר)
4. לחץ "Register app"

### שלב 3: קבלת הגדרות Firebase

לאחר הרשמת האפליקציה, תקבל אובייקט תצורה:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456:web:abc123",
  measurementId: "G-ABC123"
};
```

### שלב 4: הגדרת משתני סביבה

1. העתק את הקובץ `.env.example` ל-`.env`:
```bash
cp .env.example .env
```

2. מלא את הערכים מהתצורה שקיבלת:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456:web:abc123
VITE_FIREBASE_MEASUREMENT_ID=G-ABC123
```

### שלב 5: עדכון .firebaserc

ערוך את הקובץ `.firebaserc` והחלף את `"your-project-id"` ב-project ID שלך:

```json
{
  "projects": {
    "default": "your-actual-project-id"
  }
}
```

---

## פריסה ל-Firebase Hosting

### שלב 1: התקנת Firebase CLI

```bash
npm install -g firebase-tools
```

### שלב 2: התחברות ל-Firebase

```bash
firebase login
```

זה יפתח דפדפן לאימות. התחבר עם חשבון Google שלך.

### שלב 3: אתחול Firebase Hosting

```bash
firebase init hosting
```

בחר באפשרויות הבאות:
- **What do you want to use as your public directory?** → `dist`
- **Configure as a single-page app?** → `Yes`
- **Set up automatic builds and deploys with GitHub?** → `No` (לבינתיים)
- **File dist/index.html already exists. Overwrite?** → `No`

### שלב 4: בניית הפרויקט

```bash
npm run build
```

זה יוצר את תיקיית `dist` עם הקבצים האופטימיזציה לפרודקשן.

### שלב 5: פריסה ל-Firebase

```bash
firebase deploy
```

או ספציפית רק hosting:
```bash
firebase deploy --only hosting
```

אחרי הפריסה תקבל URL כמו:
```
https://your-project-id.web.app
https://your-project-id.firebaseapp.com
```

---

## הגדרת Authentication

### שלב 1: הפעלת Authentication

1. ב-Firebase Console, עבור ל-"Authentication"
2. לחץ "Get started"
3. בחר בטאב "Sign-in method"

### שלב 2: הפעלת שיטות אימות

#### אימות באמצעות Email/Password:
1. לחץ על "Email/Password"
2. הפעל את "Enable"
3. שמור

#### אימות באמצעות Google:
1. לחץ על "Google"
2. הפעל את "Enable"
3. בחר Support email
4. שמור

### שלב 3: הוספת דומיין מורשה

ב-"Settings" → "Authorized domains", הוסף:
- `localhost` (כבר צריך להיות)
- הדומיין שלך (אם יש)
- הדומיין של Firebase Hosting

### שלב 4: שימוש ב-Authentication בקוד

הקוד כבר מוכן! קובץ `src/services/auth.js` מכיל את כל הפונקציות:

```javascript
import { signUp, signIn, signInWithGoogle, logout } from './services/auth';

// הרשמה
await signUp('user@example.com', 'password123', 'Display Name');

// התחברות
await signIn('user@example.com', 'password123');

// התחברות עם Google
await signInWithGoogle();

// התנתקות
await logout();
```

---

## הגדרת Firestore Database

### שלב 1: יצירת Database

1. ב-Firebase Console, עבור ל-"Firestore Database"
2. לחץ "Create database"

### שלב 2: בחירת מצב אבטחה

בחר אחת מהאפשרויות:

#### מצב Test (לפיתוח בלבד):
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

#### מצב Production (מומלץ):
הקובץ `firestore.rules` כבר מוכן עם כללי אבטחה בסיסיים.

### שלב 3: פריסת כללי אבטחה

```bash
firebase deploy --only firestore:rules
```

### שלב 4: בחירת Location

בחר מיקום קרוב למשתמשים שלך:
- `us-central1` - ארה"ב
- `europe-west1` - בלגיה (מומלץ לישראל)
- `asia-south1` - הודו

**שים לב:** לא ניתן לשנות את המיקום אחרי בחירה!

### שלב 5: שימוש ב-Firestore בקוד

הקוד כבר מוכן! קובץ `src/services/firestore.js` מכיל פונקציות:

```javascript
import { 
  createDocument, 
  getDocument, 
  updateDocument,
  deleteDocument,
  listenToCollection 
} from './services/firestore';

// יצירת מסמך
const docId = await createDocument('users', {
  name: 'John Doe',
  email: 'john@example.com'
});

// קריאת מסמך
const user = await getDocument('users', docId);

// עדכון מסמך
await updateDocument('users', docId, { name: 'Jane Doe' });

// מחיקת מסמך
await deleteDocument('users', docId);

// האזנה לשינויים (real-time)
const unsubscribe = listenToCollection('users', (users) => {
  console.log('Users updated:', users);
});
```

---

## Google Cloud Platform

### גישה ל-Google Cloud Console

1. עבור ל-[Google Cloud Console](https://console.cloud.google.com/)
2. בחר את הפרויקט שלך (אותו Firebase project)
3. Firebase משתמש ב-GCP מאחורי הקלעים

### שירותים נוספים שאפשר להשתמש בהם:

#### Cloud Functions
```bash
firebase init functions
```

#### Cloud Storage
כבר הוגדר! קובץ `storage.rules` מכיל כללי אבטחה.

```bash
firebase deploy --only storage
```

#### Cloud Firestore Indexes
לשאילתות מורכבות:
```bash
firebase deploy --only firestore:indexes
```

---

## טיפים ופתרון בעיות

### בעיות נפוצות

#### שגיאה: "Firebase project not found"
```bash
firebase use --add
# בחר את הפרויקט מהרשימה
```

#### שגיאה: "Permission denied"
ודא שהתחברת:
```bash
firebase logout
firebase login
```

#### שגיאה בבנייה: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Commands שימושיים

```bash
# בדיקה מקומית של הפריסה
firebase serve

# צפייה ב-logs
firebase functions:log

# מחיקת פרויקט (זהירות!)
firebase projects:delete PROJECT_ID

# רשימת כל הפרויקטים
firebase projects:list
```

### טיפים לביצועים

1. **אופטימיזציה של Build:**
```bash
npm run build -- --mode production
```

2. **Cache Control:**
הקובץ `firebase.json` כבר מוגדר עם headers לקבצים סטטיים

3. **Code Splitting:**
השתמש ב-dynamic imports:
```javascript
const Component = lazy(() => import('./Component'));
```

### אבטחה

1. **אף פעם אל תשמור .env בגרסה:**
   הקובץ `.gitignore` כבר מוגדר נכון

2. **עדכן כללי Firestore:**
   הקובץ `firestore.rules` מכיל כללים בסיסיים, התאם אותם לצרכים שלך

3. **הגבל API Keys:**
   ב-Google Cloud Console → Credentials → הגבל את השימוש ל-domains מורשים

---

## סקריפטים נוספים

הוסף ל-`package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && firebase deploy",
    "deploy:hosting": "npm run build && firebase deploy --only hosting",
    "deploy:rules": "firebase deploy --only firestore:rules,storage:rules",
    "firebase:serve": "npm run build && firebase serve"
  }
}
```

---

## תמיכה

- **Firebase Documentation:** https://firebase.google.com/docs
- **Vite Documentation:** https://vitejs.dev
- **React Documentation:** https://react.dev
- **Base44 Support:** app@base44.com

---

**בהצלחה עם הפרויקט! 🚀**
