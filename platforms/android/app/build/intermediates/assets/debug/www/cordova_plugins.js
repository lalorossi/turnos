cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-sqlserver.plugin",
    "file": "plugins/cordova-plugin-sqlserver/www/plugin.js",
    "pluginId": "cordova-plugin-sqlserver",
    "clobbers": [
      "SqlServer"
    ],
    "runs": true
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-sqlserver": "1.0.0"
};
// BOTTOM OF METADATA
});