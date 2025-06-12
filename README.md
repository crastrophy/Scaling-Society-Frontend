# Scaling Society Frontend

This project is a dashboard for tracking sales and performance metrics for SDRs and closers.

## Prerequisites

- Node.js (v14 or later)
- npm
- A Firebase project

## Getting Started

### 1. Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd scaling-society-frontend
npm install
```

### 2. Firebase Configuration

1.  Navigate to `src/firebase/config.ts`.
2.  Replace the placeholder Firebase configuration with your actual project configuration. You can find this in your Firebase project settings.

### 3. Running the Project

To start the development server, run:

```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## User Management (Admin)

User access is controlled by Firebase Custom Claims. Only users with the `internal` role are allowed to access the dashboard.

### Seeding the Allow-List (Setting Custom Claims)

To grant a user access, you need to set a custom claim on their Firebase user account. This must be done from a trusted server environment using the Firebase Admin SDK.

**1. Set up the Admin script:**

Create a new directory `scripts` in your project root. Inside `scripts`, create a file named `set-admin-claim.js`.

```javascript
// scripts/set-admin-claim.js

// Make sure to install firebase-admin: npm install firebase-admin
const admin = require('firebase-admin');

// IMPORTANT: Path to your service account key JSON file.
// Download this from your Firebase project settings -> Service accounts.
// DO NOT commit this file to your repository.
const serviceAccount = require('../path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const email = 'user-to-authorize@example.com';
const makeAdmin = true; // Set to true to grant admin privileges

async function setCustomClaims(email, isAdmin) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    
    const claims = { role: 'internal' };
    if (isAdmin) {
      claims.admin = true;
    }

    await admin.auth().setCustomUserClaims(user.uid, claims);
    console.log(`Successfully set claims for ${email}:`, claims);
  } catch (error) {
    console.error('Error setting custom claim:', error);
  }
  process.exit();
}

setCustomClaims(email, makeAdmin);
```

**2. Run the script:**

Before running, make sure to:

-   Install the Firebase Admin SDK: `npm install firebase-admin`.
-   Download your service account key from the Firebase console and update the path in the script.
-   Replace the placeholder email with the email of the user you want to authorize.
-   Set `makeAdmin` to `true` if you want to grant the user admin privileges, which are required for inviting other users.

Then, run the script from your terminal:

```bash
node scripts/set-admin-claim.js
```

## Deployment

To deploy the application, you can use any static site hosting service like Vercel, Netlify, or Firebase Hosting.

### Example: Deploying with Vercel

1.  Push your code to a Git repository (e.g., GitHub).
2.  Import your project into Vercel.
3.  Vercel will automatically detect that it's a React application and configure the build settings.
4.  Add your Firebase configuration as environment variables in the Vercel project settings to keep them secure.
5.  Deploy.

---

## ✨ Features
- **Premium, Figma-accurate UI** with bento/boxed layout
- **Design system**: tokenized colors, spacing, typography, and reusable UI primitives (`Button`, `Input`, `Card`, etc.)
- **Dashboard, SDR Sales, and Closer Sales** pages with charts, tables, and metrics
- **Date range picker** with custom styling
- **Ready for backend integration** (Node.js/Python API for Google Sheets)
- **Dark mode** and responsive design

---

## 🛠 Tech Stack
- **React** + **TypeScript**
- **Tailwind CSS** (with custom tokens)
- **Recharts** (charts)
- **react-day-picker** (date picker)
- **react-query** (data fetching, ready for live metrics)
- **Vite** (build tool)

---

## 🎨 Design System
- All colors, spacing, and typography are defined in [`src/theme.ts`](src/theme.ts)
- UI primitives in [`src/components/ui/`](src/components/ui/)
- See [`src/docs/Primitives.md`](src/docs/Primitives.md) for usage and examples
- Extend the system by adding new tokens and components as needed

---

## 📊 Data Integration
- The app is ready to connect to a backend API (Node.js or Python) that fetches data from Google Sheets
- Use the `useGoogleSheetsData` hook as a pattern for data fetching
- All metrics, charts, and tables are prop-driven and ready for live data

---

## 🧑‍💻 Contributing
1. Fork the repo and create your feature branch (`git checkout -b feature/your-feature`)
2. Commit your changes (`git commit -am 'Add new feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a Pull Request

---

## 📄 License
[MIT](LICENSE)

---

## 🙏 Credits
- Inspired by [21st.dev](https://21st.dev), [Linear](https://linear.app), and [Framer](https://framer.com)
- Built with love by the Scaling Society team
