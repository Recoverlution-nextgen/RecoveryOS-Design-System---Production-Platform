module.exports = {
  extends: ["stylelint-config-standard"],
  rules: {
    "declaration-property-value-disallowed-list": {
      "/.*/": [
        "/#[0-9a-fA-F]{3,8}\\b/",
        "/\\brgb(a)?\\s*\\(/",
        "/\\bhsl(a)?\\s*\\(/"
      ]
    },
    "value-keyword-case": "lower",
    "unit-disallowed-list": [
      ["px"],
      { ignoreProperties: { px: ["border", "border-width", "outline-width"] } }
    ],
    "property-no-vendor-prefix": true,
    "value-no-vendor-prefix": true
  },
  ignoreFiles: [
    "**/dist/**",
    "**/*.min.css"
  ]
};
