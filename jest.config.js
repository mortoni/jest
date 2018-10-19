module.exports = {
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
    },
    transform: {
      "^.+\\.jsx$": "babel-jest",
      "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: [
      "js",
      "jsx"
    ],
    moduleDirectories: [
      "node_modules",
      "bower_components"
    ],
    transformIgnorePatterns: [
      "!node_modules/react-runtime"
    ]
  }
