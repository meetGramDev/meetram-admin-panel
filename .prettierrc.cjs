module.exports = {
  plugins: ['prettier-plugin-tailwindcss'],
  pluginSearchDirs: false,
  tailwindFunctions: ["clsx"],
  tailwindAttributes: ["className"],
  ...require("@it-incubator/prettier-config"),
};
