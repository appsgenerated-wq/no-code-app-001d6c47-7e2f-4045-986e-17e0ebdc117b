# TomatoTracker - A Manifest & React Application

This is a full-stack application for tracking tomato varieties, built with a React frontend and powered entirely by a Manifest backend.

## Features

- **User Authentication**: Secure user sign-up and login.
- **Tomato Cataloging**: Create, read, update, and delete entries for tomato varieties.
- **Ownership**: Users can only see and manage their own tomato entries.
- **Image Uploads**: Add a picture for each tomato variety.
- **Admin Panel**: A built-in admin interface at `/admin` to manage all users and data.

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, pnpm, or yarn
- Manifest CLI (`npm install -g @mnfst/cli`)

### 1. Backend Setup (Manifest)

1.  **Save the Schema**: Save the provided `manifest.yml` content into a file named `manifest.yml` in your project root.
2.  **Deploy the Backend**: Open your terminal in the project root and run:
    ```bash
    mnfst deploy
    ```
3.  **Get your App ID**: After deployment, the Manifest CLI will output your `App ID`. You will need this for the frontend.

### 2. Frontend Setup (React)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Configure App ID**: Open `src/constants.js` and replace `'GENERATED_APP_ID_HERE'` with the actual App ID you received from the Manifest deployment.
3.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173`.

## Admin Access

-   Navigate to `/admin` on your deployed application's URL.
-   Default credentials:
    -   **Email**: `admin@manifest.build`
    -   **Password**: `admin`

