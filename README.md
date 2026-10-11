# বাজার দর (BazarDor)

**BazarDor** is a web application designed to help users access market price information through a simple, user-friendly interface. It includes user authentication and profile management, allowing users to manage their account information.

## 🚀 Technologies Used

- **Next.js** — Building the user interface and application.
- **Next.js App Router** — Managing routes and page navigation.
- **TypeScript / JavaScript** — Application logic and type safety (depending on the files used).
- **Tailwind CSS** — Styling and creating responsive layouts.
- **Better Auth** — Handling user authentication and account management.
- **UI Component Library** — DaisyUI or Hero UI, if used in the project.

## ✨ Key Features

1. **User Authentication** — Allows users to authenticate and access their account.
2. **My Profile** — Provides a dedicated page to view user profile information.
3. **Update User Information** — Allows users to navigate to an update page from their profile.
4. **Update Name** — Provides a form with a name input field and an Update Information button.
5. **Responsive UI** — Uses Tailwind CSS to create a user-friendly interface across different screen sizes.

## 📂 Project Structure

The application uses the Next.js App Router to organize pages and handle navigation.

```text
app/
├── page.tsx
├── my-profile/
│   └── page.tsx
└── update-information/
    └── page.tsx
```

*Note: This is an example structure. Adjust it to match your actual project directories.*

## 🔐 Authentication & User Updates

BazarDor uses Better Auth for authentication and user account management.

The Update Information feature follows the Better Auth documentation for updating user details.

Documentation: [Better Auth — Update User](https://better-auth.com/docs/concepts/users-accounts#update-user)

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_DIRECTORY
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and add the environment variables required by your Better Auth configuration and database setup. Generate a unique secret (for example, with `openssl rand -base64 32`) and make it available during production builds and at runtime. Production builds fail if `BETTER_AUTH_SECRET` is missing.

```env
BETTER_AUTH_SECRET=your_unique_random_secret
BETTER_AUTH_URL=http://localhost:3000
```

*Use the exact variable names required by your existing configuration. Additional database or provider variables may be necessary.*

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Project Status

The project includes user authentication and profile management requirements, including the ability to update a user's name.

---

**Built with Next.js, Tailwind CSS, and Better Auth.**
