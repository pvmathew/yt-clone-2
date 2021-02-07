const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  plugins: [{ plugin: require("@semantic-ui-react/craco-less") }],
  eslint: {
    mode: ESLINT_MODES.extends,
    configure: () => {
      // Workaround for broken ESLINT_MODES.file mode
      return require("./.eslintrc");
    },
  },
};
