# CarePlus deployment

The project has three separate apps: the backend API, the public Vite frontend,
and the Vite admin panel. Deploy each as a separate Vercel project, or deploy
the backend to another Node.js host that supports Express.

## 1. Deploy the backend

1. Create a Vercel project for the `Careplus-Backend` repository and set its
   root directory to the repository root.
2. Add the backend variables from `Careplus-Backend/.env.example` in the
   hosting provider's environment settings. Do not commit `.env` or put
   backend secrets in either frontend's environment.
3. Use your MongoDB Atlas connection string and allow the deployed backend to
   connect in the Atlas network access settings.
4. Configure Cloudinary, SMTP/email, Stripe, and Razorpay credentials for the
   features you intend to use. For payment testing, use matching test-mode
   credentials; switch to live credentials only for launch.
5. Redeploy after changing environment variables. The API health check is the
   backend origin itself (`/`), which should respond with `API Working`.

`CLIENT_URLS` must be a comma-separated list of the exact origins of the public
frontend and admin panel, for example:

```text
https://careplus.vercel.app,https://careplus-admin.vercel.app
```

For local development, use
`http://localhost:5173,http://localhost:5174`. Origins must not include a path
or trailing slash. If `CLIENT_URLS` is unset, the API preserves permissive CORS
behavior for local development.

## 2. Deploy the public frontend

1. Create a Vercel project for the `Careplus-frontend` repository.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Add `VITE_BACKEND_URL` with the deployed backend's origin, for example
   `https://careplus-api.vercel.app`. Do not append `/api`.
4. Deploy and add the resulting frontend origin to the backend's `CLIENT_URLS`.

Copy `.env.example` to `.env.local` for local work. Vite variables are public
and embedded in the built JavaScript; never put secrets in `VITE_*` variables.

## 3. Deploy the admin panel

1. Create a Vercel project for the `careplus-admin` repository.
2. Set the build command to `npm run build` and output directory to `dist`.
3. Add `VITE_BACKEND_URL` with the same backend origin and set `VITE_CURRENCY`
   to `INR`.
4. Deploy and add the resulting admin origin to the backend's `CLIENT_URLS`.

## Local development

Copy each app's `.env.example` to `.env.local` in the frontend and admin
repositories, and to `.env` in the backend repository. Use
`VITE_BACKEND_URL=http://localhost:4000` for both Vite apps and set
`CLIENT_URLS=http://localhost:5173,http://localhost:5174` in the backend.
Provide real local backend credentials in `Careplus-Backend/.env`; never commit
that file.

Run `npm install` and `npm run dev` in each project. The frontend and admin use
ports 5173 and 5174 by default; the backend uses port 4000.
