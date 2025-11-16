# PNPM Monorepo Template

The template to quickly build a Full-Stack TypeScript App.

## Technologies

#### Frontend

1. React@19
2. Tanstack Router
3. Tanstack Query
4. Tailwind

#### Backend

1. Express

## Start the dev server

Run `pnpm dev` in the root of the project. It spins up the frontend and backend at the same. The frontend is configured to communicate with the backend.

## Start the production build

Run `pnpm build` in the root project. It builds the backend to the `apps/backend/dist` directory and the frontend to the `apps/backend/dist/public` directory.

Then run `pnpm start`, it will spin up a node server at port 4001. The express app serves the react frontend.