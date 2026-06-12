import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'legacy', 'node_modules', 'codex-launch-readiness-audit']),
  {
    files: ['**/*.{js,jsx,mjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]' }],
      // Intentional non-breaking spaces in JSX copy (heading layout) — allow in JSX text/strings.
      'no-irregular-whitespace': ['error', { skipJSXText: true, skipStrings: true }],
      // Deliberate empty catch {} around localStorage / JSON (ignore failures).
      'no-empty': ['error', { allowEmptyCatch: true }],
      // This project's REQUIRED SSR-safe pattern reads client-only state (localStorage /
      // scroll / window) inside useEffect then setState — the one extra render is intentional,
      // not a cascading-render bug. The react-hooks v7 rule over-flags it.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
