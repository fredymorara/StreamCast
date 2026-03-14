# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Areas for Improvement (Future Roadmap)

*   **Code Architecture & State Management:** (e.g., getting rid of prop-drilling, using custom hooks).
*   **Performance & Time Complexity:** (e.g., heavily using `useMemo` on your filtering logic so it doesn't recalculate array objects on every single render cycle, adding lazy-loading for posters).
*   **UI/UX Polish:** (e.g., adding an empty state when filters return 0 matches, persistent URL state).
*   **Error Handling & SEO:** (e.g., adding dynamic meta-tags so sports matches get indexed by Google, creating error boundaries so broken streams don't crash the UI).
