# aniszewski.com

This repository contains the source code for **aniszewski.com**, a personal portfolio site built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). The project showcases skills and experience using modern TypeScript and Tailwind CSS.

## Features

- React + TypeScript front‑end
- Tailwind CSS styling with custom animations
- Responsive layout with a mobile sidebar
- GitHub activity calendar integration

## Development

1. Install dependencies (requires Node.js 18 or newer):
   ```bash
   npm install
   ```
2. Start a local development server with hot reload:
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/` by default.
3. Lint the codebase with ESLint:
   ```bash
   npm run lint
   ```
4. Run the unit tests with [Vitest](https://vitest.dev/):
   ```bash
   npm test
   ```

## Building for Production

Generate an optimized build:

```bash
npm run build
```

Preview the built site locally:

```bash
npm run preview
```

The output is written to the `dist/` directory.

## Project Structure

- `src/` – Application source code
  - `App.tsx` – Main application component
  - `index.css` – Tailwind CSS configuration and custom styles
  - `assets/` – Images and static assets (avatar and résumé)
- `index.html` – Entry HTML template used by Vite
- `vite.config.ts` – Vite configuration

Feel free to fork this project and adapt it to your own needs. Pull requests and issues are welcome!
