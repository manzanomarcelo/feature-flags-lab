const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "playwright-report/**",
      "test-results/**"
    ]
  },
  {
    files: [
      "server.js",
      "jest.config.js",
      "eslint.config.js",
      "playwright.config.js",
      "tests/**/*.js"
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        console: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        process: "readonly",
        test: "readonly",
        expect: "readonly"
      }
    }
  },
  {
    files: ["public/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        console: "readonly",
        document: "readonly",
        fetch: "readonly",
        window: "readonly"
      }
    }
  }
];
