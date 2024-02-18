module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          envName: "EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY",
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
