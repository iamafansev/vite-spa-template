# React SPA template

## Description

This is a client application built with Vite, React, React Router DOM, React-i18next, URQL, and following the Feature-Sliced Design (FSD) architecture. The application is designed to be modular, scalable, and easily maintainable.

## Technologies Used

- **Vite**: A fast front-end build tool that provides a modern development experience.
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A library for routing in React applications with support for data fetching and mutations using `loader` and `action` methods.
- **React-i18next**: An internationalization framework for React that provides i18n capabilities.
- **URQL**: A highly customizable and flexible GraphQL client for React.
- **Feature-Sliced Design (FSD)**: An architectural approach that emphasizes slicing the application into features for better organization.

## Features

- Dynamic routing with `react-router-dom` using `loader` and `action` methods for data fetching and mutations.
- Internationalization support using `react-i18next`.
- State management and data fetching with `URQL`.
- FSD architecture for improved scalability and maintainability.

## Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/project-name.git
   cd project-name
   ```
2. Install dependencies:

```bash
 npm install
 # или
 yarn install
```

### Running the Application

To run the application in development mode, use the following command:

```bash
npm run dev
# или
yarn dev
```

Open your browser and go to http://localhost:5173 to view the application.

### Building for Production

To create a production build, run:

```bash
npm run build
# или
yarn build
```

This will generate the optimized files in the dist directory.

## Localization

This application supports multiple languages. To add a new language, you need to:

1. Create a new JSON file in the locales directory for the language.
2. Add translations for all necessary keys used in the application.
3. Configure react-i18next to include the new language.

## Router Context

- **Problem**: the loader and action do not have access to the react context, for example, to get the client to fetch data from the provider.
- **Solution**: when creating createBrowserRouter, a context object is formed, which is inserted into all router handlers (loader and action) via dataStrategy as the second argument.

See usage in the next section.

## Data Fetching and Mutations

### Using Loader and Action Methods

In this application, loader and action methods from react-router-dom are utilized for data fetching and mutations, respectively. These methods can accept a context argument, which is used to access the URQL client.

Here’s a brief overview of how to implement them:

- Loader: The loader function is used to fetch data before rendering a route.

```javascript
// ./pages/your-page/api/loader.ts
import { makeLoader } from "react-router-typesafe";

import { makeResult } from "@/shared/api/utils";

export const loader = makeLoader(async ({ request }, context) => {
  const resultSource = context.client.query(YOUR_QUERY, {});

  return makeResult(resultSource);
});

export type Data = typeof loader;
```

```javascript
// ./pages/your-page/ui/YourPage.tsx
import { makeLoader } from "react-router-typesafe";

import type { Data } from "../api/loader";

export const YourPage = () => {
  const data = useLoaderData<Data>();

  return JSON.stringify(data);
};
```

- Action: The action function is used for handling form submissions or other mutations.

```javascript
import { makeAction } from "react-router-typesafe";

import { makeResult } from "@/shared/api/utils";

export const action = makeAction(async ({ request }, context) => {
  const formData = new URLSearchParams(await request.text());
  const resultSource = await context.client.mutation(YOUR_MUTATION, {
    input: formData.get("inputField"),
  });

  return makeResult(resultSource);
});

export type ActionData = typeof action;
```

## Directory Structure

```
public/                # Assets
├── ...
└── locales/
│   ├── {lng}/         # Lng
│       ├── {ns}.json  # Namespace
│       └── ...
│   └── ...
src/
├── app/               # Main application
│   ├── routes/
│       └── index      # App routes
│   ├── entry.css      # Application entry styles
│   └── index.ts       # Application component
├── pages/             # Pages displayed by the router
│   ├── page1/
│       ├── api/       # Methods for loading and mutating data, as well as queries
│       ├── ui/        # Components and styles related to the page
│       └── index      # Export only the keys you would define in the route object, such as `loader`, `action`, `Component`, `ErrorBoundary`, etc.
│   └── ...
├── features/          # Feature slices
│   ├── feature1/
│   ├── feature2/
│   └── ...
├── shared/            # Shared components and utilities
├── init.tsx           # Init application
└── index.ts           # Application entry point
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
