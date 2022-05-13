const path = require("path");

// constructing root directory for all operating system
module.exports = path.dirname(require.main.filename);
