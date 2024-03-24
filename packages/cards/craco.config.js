const path = require("path");
const deps = require("./package.json").dependencies;
const { ModuleFederationPlugin } = require("webpack").container;
const {
  NativeFederationTypeScriptRemote,
} = require("@module-federation/native-federation-typescript/webpack");

const moduleFederationConfig = {
  name: "cards",
  filename: "remoteEntry.js",
  exposes: {
    "./components": "./src/components",
    "./Cards": "./src/components/Cards",
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
    port: 3001,
    static: {
      directory: path.join(__dirname, "dist"),
    },
  },
  webpack: {
    configure: {
      output: {
        publicPath: "auto",
      },
    },

    plugins: {
      add: [
        new ModuleFederationPlugin(moduleFederationConfig),
        NativeFederationTypeScriptRemote({
          moduleFederationConfig,
          compiledTypesFolder: "",
          deleteTypesFolder: true,
        }),
      ],
    },
  },
};
