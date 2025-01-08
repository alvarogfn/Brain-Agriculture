# Brain Agriculture (Web Package)

Frontend web application built with React and TypeScript for agricultural management.

## Quick Start

1. Install dependencies:
```bash
pnpm install
```

2. Start development server:
```bash
pnpm dev
```

3. Build for production:
```bash
pnpm build
```

## Tech Stack

### Core Technologies
- **React 18**: Modern UI library with the latest features
- **TypeScript**: Static typing for better code quality
- **Styled Components with XStyled**: CSS-in-JS solution combining styled-components' modularity with Tailwind-like atomic approach. Props-based styling enables declarative and atomic design while maintaining CSS-in-JS advantages. Note: Consider performance implications for TypeScript server and runtime CSS injection.

### Data Management & Forms
- **React Query**: Request caching, pagination, and data refetching library. Optimizes API calls for form fields with server-side search. In this project, mutations were replaced with simpler actions.
- **React Hook Form**: Form state management
- **Yup**: Schema validation
- **IMask**: Input masking
  Together, these libraries create a consistent pattern for form handling across t[tests](src/tests)he application.

#### Why not Context API or Redux?

This application is form-based with server-side state management, eliminating the need for global state management solutions like Redux or Context API. All data state is maintained on the server, with minimal client-side processing.

Global state management would be necessary for:
- Offline-first applications
- Applications with complex client-side state (e.g., financial dashboards with config updates)

For these scenarios, solutions like Redux or Zustand would be appropriate.


### UI Components
- **Floating UI**: Library for creating floating elements (tooltips, popovers)
- **Downshift**: Accessible select/autocomplete components
  These complement each other well for creating accessible menu, select, and combobox components.

### Internationalization
- **i18next**: Text internationalization library. Implemented early to avoid costly post-implementation translation issues.

### Development & Testing
- **RSBuild**: Rust-based build tool with Webpack plugin compatibility for easier migration
- **Jest & React Testing Library**: Unit and integration testing
- **FakerJS**: Realistic mock data generation for tests

## Project Structure

### Core Directories

#### `src/api`
HTTP calls with axios and React Query query options definitions.

#### `src/components`
Base components (buttons, inputs, etc.) structured as:
- `[component-name]`: Main component source
- `types`: Component type definitions using `ComponentPropsWithRef<typeof StyledComponent>`
- `styles`: Styled component definitions and types
- `index`: Export file

#### `src/pages`
Page components follow a modular structure:
- `page`: Main page component
- `error`: Error boundary page
- `route`: React Router configuration with lazy loading
- `loader`: React Query data fetching (parallel loading with page)

For larger applications, the structure can be scaled following a features/modules approach:
```
/feature
  /components - Feature-specific components
  /hooks - Feature-specific hooks
  /page.tsx - Main page (typically listing)
  /create/page.tsx - Creation page
  /subpage/page.tsx - Detail pages
  /edit/page.tsx - Edit page
  /route.tsx - Route configuration
```

Note: This project currently implements a single form page, but the structure above shows how it can be scaled for larger applications.

### Supporting Directories

#### `src/config`
Build tool configurations, environment variables, and constants.

#### `src/helpers`
Utility functions for data formatting, object transformations, etc.

#### `src/hooks`
Custom React hooks.

#### `src/icons`
Project icons with auto-reflecting index.ts for Icon.tsx component.

#### `src/lib`
Library configurations (React Query client, axios instance).

#### `src/providers`
Application providers (Theme, Query, etc.).

#### `src/tests`
Test configurations, custom render utilities.

#### `src/themes`
Theme variables (colors, fonts) and global styles.

#### `src/types`
TypeScript declarations (I18n, styled-components, env variables).

#### `src/validators`
Yup form validation schemas. Naming pattern: `[entity][Method]Schema.ts`

## Environment Variables

Public environment variables are stored in `.env.development`, containing non-secret project configurations such as:
- Public API URL
- Server port
- Other environment-specific settings