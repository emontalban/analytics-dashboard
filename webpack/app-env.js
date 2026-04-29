const fs = require("fs");
const path = require("path");

function parseEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith("#")) {
        return env;
      }

      const separatorIndex = trimmed.indexOf("=");

      if (separatorIndex === -1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const value = trimmed.slice(separatorIndex + 1).trim();

      env[key] = value;
      return env;
    }, {});
}

const localEnv = parseEnvFile(path.resolve(__dirname, "../.env.local"));

function getAppEnv(nodeEnv) {
  return {
    NODE_ENV: JSON.stringify(nodeEnv),
    APP_API_TOKEN: JSON.stringify(process.env.APP_API_TOKEN || localEnv.APP_API_TOKEN || ""),
    APP_NAME: JSON.stringify(process.env.APP_NAME || localEnv.APP_NAME || ""),
    APP_ENDPOINT: JSON.stringify(process.env.APP_ENDPOINT || localEnv.APP_ENDPOINT || "")
  };
}

module.exports = getAppEnv;
