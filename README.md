# Cookie Stand Admin 2
## Lab 39
### Maddie Amelia Lewis

## Version

**Version 1**
- Creation of components folder
- Creation of form 
- Styling of main page

**Version 2**
- Form changed to CreateForm
- Fake state in main app to update ReportTable
- ReportTable app created
- Data.js added
- Index.js updated with CookieStandAdmin component

**Version 3**
- Use demo code from lab39 to create the front end
- Update styling
- Create env files
- Connect to remote repo - Cookie Stand API

**Version 4**

**Lab 37 & 38 Frontend Repo**
[Cookie Stand Admin 1](https://github.com/maddieamie/cookie-stand-admin)

## Frontend ENV Sample

NEXT_PUBLIC_API_URL=url + api/v1/cookie_stands
NEXT_PUBLIC_LOGIN_URL=url + api/token/
NEXT_PUBLIC_REFRESH_URL=url + api/token/refresh/


## Remote API Repo

[Cookie Stand API](https://github.com/maddieamie/cookie-stand-api)

Docker and Postgres hosted locally for version 3. 

**API ENV**
DEBUG=True
ENVIRONMENT=development or production 
ALLOWED_HOSTS=localhost or production
ALLOWED_ORIGINS=http://localhost:3000

SECRET_KEY=your_secret_key
DB_NAME=cookie_stand_db
DB_USER=cookie_user
DB_PASSWORD=your_password
DB_HOST=db
DB_PORT=5432

## Next JS info

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
