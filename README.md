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
   git clone https://github.com/iamafansev/vite-spa-template.git
   cd vite-spa-template
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

## Env variables

`.env.development` - variables for the development environment
`.env.production` - variables for the production environment

After adding or removing a variable, you need to duplicate the changes from interface in the `./src/@types/vite-env.d.ts` file for correct typing.

### Accessing variables

`console.log(import.meta.env.YOUR_VARIABLE);`

More information in the [documents](https://main.vitejs.dev/guide/env-and-mode.html)

## Graphql codegen

To generate types from the graphql schema, [graphql codegen](https://the-guild.dev/graphql/codegen) is used and integrated via [vite-plugin-graphql-codegen](https://github.com/danielwaltz/vite-plugin-graphql-codegen#readme).
Generation occurs when files containing the graphql tag are changed.

All types of graphkl schema will be generated in the directory `./src/shared/api/models`.

Example:

```ts
import { graphql } from "@/shared/api/models";

export const GetHomePageDataQuery = graphql(/* GraphQL */ `
  query GetHomePageData {
    getAllPokemon(offset: 0, take: 10) {
      key
    }
  }
`);
```

## Localization

This app supports multiple languages. To add a new language, you need to:

1. Create a new directory with the desired language `./public/locales/{lng}`
2. Support all namespaces used in the app `./public/locales/{lng}/{ns}` and add your translations to them
3. Configure react-i18next to include the new language `src/entities/i18n/config/init.ts` -> `supportedLngs`.

### Current locale

The current locale is determined from the local storage if it was saved by the user's choice. Otherwise, the current locale will be set based on the browser language.

### Adding namespace

The namespace needs to be added to the path `./public/locales/{lng}/your-namespace.json`

Then the translations will be available in the application:

```tsx
import { useTranslation } from "react-i18next";

export const YourComponent = () => {
  const { t } = useTranslation("your-namespace");

  return <h1>{t("key")}</h1>;
};
```

Note: Hot reloading is not available within locales. Therefore, in order to see the changes, you need to reload the page.

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

import { mapResultSourseToPromise } from "@/shared/api/utils";

export const loader = makeLoader(async ({ request }, context) => {
  const resultSource = context.client.query(YOUR_QUERY, {});

  return mapResultSourseToPromise(resultSource);
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

import { mapResultSourseToPromise } from "@/shared/api/utils";

export const action = makeAction(async ({ request }, context) => {
  const formData = new URLSearchParams(await request.text());
  const resultSource = await context.client.mutation(YOUR_MUTATION, {
    input: formData.get("inputField"),
  });

  return mapResultSourseToPromise(resultSource);
});

export type ActionData = typeof action;
```

## Testing

### Writing Tests

Create your test files with the `.spec.ts` or `.spec.tsx` extension. Here is an example of a simple test for a React component:

```tsx
// ./src/components/YourComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import YourComponent from "./YourComponent";

describe("YourComponent", () => {
  it("renders correctly", () => {
    render(<YourComponent />);
    expect(screen.getByText("Your Component Text")).toBeInTheDocument();
  });
});
```

### Running Tests

To run your tests, use the following command:

```bash
npm run unit
```

You can also run tests in watch mode:

```bash
npm run unit:watch
```

## Docker

To build and run the application using Docker, follow these steps:

1. Build the Docker image:

   ```sh
   docker build -t your-image-name .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 8082:8082 your-image-name
   ```

This will build the application and serve it using Nginx on port 8082.

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
