const path = require("path");
const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
require("dotenv").config();
const {
  NativeFederationTypeScriptHost,
} = require("@module-federation/native-federation-typescript/webpack");

const { CARDS_URL, REGISTRIES_URL } = process.env;

const moduleFederationConfig = {
  name: "host",
  runtime: "app",
  remotes: {
    "@cards": `cards@${CARDS_URL}/remoteEntry.js`,
    "@registries": `registries@${REGISTRIES_URL}/remoteEntry.js`,
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};

module.exports = {
  eslint: null,
  devServer: {
    port: 3000,
    static: [
      { directory: path.join(__dirname, "dist") },
      { directory: path.join(__dirname, "public") },
    ],
  },
  webpack: {
    configure: {
      output: {
        publicPath: "/",
      },
    },
    plugins: {
      add: [
        new ModuleFederationPlugin(moduleFederationConfig),
        NativeFederationTypeScriptHost({
          moduleFederationConfig,
          compiledTypesFolder: "",
        }),
      ],
    },
  },
};
