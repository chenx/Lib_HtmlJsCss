# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


## Screenshots of included Apps

### Timer
<kbd>
<img width="534" height="249" alt="image" src="https://github.com/user-attachments/assets/45b81654-7659-4499-8f3c-7cc6d29edcea" />
</kbd>

### Redux Counter
<kbd>
<img width="544" height="233" alt="image" src="https://github.com/user-attachments/assets/8456647d-42ca-4955-a155-5d9f6b04dc7f" />
</kbd>

### Tic Tac Toe
<kbd>
<img width="497" height="273" alt="image" src="https://github.com/user-attachments/assets/f032a1dd-b06b-4f8c-9dac-3fc8adbda6e4" />
</kbd>

### Form
<kbd>
<img width="949" height="277" alt="image" src="https://github.com/user-attachments/assets/ff3ccee3-32b1-411f-a2d2-286827db25f1" />
</kbd>

### Form (2)
<kbd>
<img width="1135" height="490" alt="image" src="https://github.com/user-attachments/assets/53f04d14-daad-4ceb-a08b-50f3af127ad2" />
</kbd>

### Guess Words
<kbd>
<img width="347" height="535" alt="image" src="https://github.com/user-attachments/assets/7235d0df-b79a-4037-b2a8-6740641eb545" />
</kbd>

### Hungrey Snake
<kbd>
<img width="349" height="422" alt="image" src="https://github.com/user-attachments/assets/bbe295a1-1b03-4fd9-af15-20557b53720a" />
</kbd>
