/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/[...nextauth]/route";
exports.ids = ["app/api/auth/[...nextauth]/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("bcrypt");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CMyCode%5CGameMantine%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CMyCode%5CGameMantine&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CMyCode%5CGameMantine%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CMyCode%5CGameMantine&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_MyCode_GameMantine_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/[...nextauth]/route.ts */ \"(rsc)/./app/api/auth/[...nextauth]/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/[...nextauth]/route\",\n        pathname: \"/api/auth/[...nextauth]\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/[...nextauth]/route\"\n    },\n    resolvedPagePath: \"D:\\\\MyCode\\\\GameMantine\\\\app\\\\api\\\\auth\\\\[...nextauth]\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_MyCode_GameMantine_app_api_auth_nextauth_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGJTVCLi4ubmV4dGF1dGglNUQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkYlNUIuLi5uZXh0YXV0aCU1RCUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDTXlDb2RlJTVDR2FtZU1hbnRpbmUlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUQlM0ElNUNNeUNvZGUlNUNHYW1lTWFudGluZSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZ0I7QUFDN0Y7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFudGluZS1uZXh0LXRlbXBsYXRlLz83OTQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxNeUNvZGVcXFxcR2FtZU1hbnRpbmVcXFxcYXBwXFxcXGFwaVxcXFxhdXRoXFxcXFsuLi5uZXh0YXV0aF1cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvWy4uLm5leHRhdXRoXVwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiRDpcXFxcTXlDb2RlXFxcXEdhbWVNYW50aW5lXFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxbLi4ubmV4dGF1dGhdXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CMyCode%5CGameMantine%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CMyCode%5CGameMantine&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/auth/[...nextauth]/route.ts":
/*!*********************************************!*\
  !*** ./app/api/auth/[...nextauth]/route.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ handler),\n/* harmony export */   POST: () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _lib_auth_authOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth/authOptions */ \"(rsc)/./lib/auth/authOptions.ts\");\n//app/api/auth/[...nextauth]/route.ts\n\n // 根据您的项目结构调整路径\nconst handler = next_auth__WEBPACK_IMPORTED_MODULE_0___default()(_lib_auth_authOptions__WEBPACK_IMPORTED_MODULE_1__.authOptions);\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHFDQUFxQztBQUNKO0FBQ29CLENBQUMsZUFBZTtBQUVyRSxNQUFNRSxVQUFVRixnREFBUUEsQ0FBQ0MsOERBQVdBO0FBRU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tYW50aW5lLW5leHQtdGVtcGxhdGUvLi9hcHAvYXBpL2F1dGgvWy4uLm5leHRhdXRoXS9yb3V0ZS50cz9jOGE0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vYXBwL2FwaS9hdXRoL1suLi5uZXh0YXV0aF0vcm91dGUudHNcclxuaW1wb3J0IE5leHRBdXRoIGZyb20gXCJuZXh0LWF1dGhcIjtcclxuaW1wb3J0IHsgYXV0aE9wdGlvbnMgfSBmcm9tIFwiQC9saWIvYXV0aC9hdXRoT3B0aW9uc1wiOyAvLyDmoLnmja7mgqjnmoTpobnnm67nu5PmnoTosIPmlbTot6/lvoRcclxuXHJcbmNvbnN0IGhhbmRsZXIgPSBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XHJcblxyXG5leHBvcnQgeyBoYW5kbGVyIGFzIEdFVCwgaGFuZGxlciBhcyBQT1NUIH07Il0sIm5hbWVzIjpbIk5leHRBdXRoIiwiYXV0aE9wdGlvbnMiLCJoYW5kbGVyIiwiR0VUIiwiUE9TVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/[...nextauth]/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth/authOptions.ts":
/*!*********************************!*\
  !*** ./lib/auth/authOptions.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/facebook */ \"(rsc)/./node_modules/next-auth/providers/facebook.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @next-auth/prisma-adapter */ \"(rsc)/./node_modules/@next-auth/prisma-adapter/dist/index.js\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.tsx\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_5__);\n//lib/auth/authOptions.ts\n\n\n\n\n // 根据您的项目结构调整路径\n // 用于密码加密和验证\nconst authOptions = {\n    providers: [\n        // Google 登录提供者\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID,\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET\n        }),\n        // Facebook 登录提供者\n        (0,next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            clientId: process.env.FACEBOOK_CLIENT_ID,\n            clientSecret: process.env.FACEBOOK_CLIENT_SECRET\n        }),\n        // 自定义认证提供者（电子邮件和密码）\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_2__[\"default\"])({\n            name: \"Credentials\",\n            credentials: {\n                email: {\n                    label: \"电子邮件\",\n                    type: \"email\",\n                    placeholder: \"your@email.com\"\n                },\n                password: {\n                    label: \"密码\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials, req) {\n                if (!credentials?.email || !credentials.password) {\n                    return null;\n                }\n                // 查询数据库以验证用户\n                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (user && user.password) {\n                    // 檢查 emailVerified\n                    if (!user.emailVerified) {\n                        throw new Error('請先驗證您的電子郵件');\n                    }\n                    // 使用 bcrypt 比较密码\n                    const isValid = await bcrypt__WEBPACK_IMPORTED_MODULE_5___default().compare(credentials.password, user.password);\n                    if (isValid) {\n                        return user;\n                    }\n                }\n                // 如果认证失败，返回 null\n                return null;\n            }\n        })\n    ],\n    adapter: (0,_next_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_3__.PrismaAdapter)(_lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma),\n    session: {\n        strategy: \"jwt\"\n    },\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token && session.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        },\n        async signIn ({ user, account, profile }) {\n            if (account?.provider === \"google\" || account?.provider === \"facebook\") {\n                if (!user.email) {\n                    // 如果沒有 email，拒絕登入\n                    return false;\n                }\n                const existingUser = await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.findUnique({\n                    where: {\n                        email: user.email\n                    },\n                    include: {\n                        accounts: true\n                    }\n                });\n                if (existingUser) {\n                    const accountExists = existingUser.accounts.some((acc)=>acc.provider === account.provider && acc.providerAccountId === account.providerAccountId);\n                    if (!accountExists) {\n                        // 自动连接新账户到现有用户\n                        await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.account.create({\n                            data: {\n                                userId: existingUser.id,\n                                type: account.type,\n                                provider: account.provider,\n                                providerAccountId: account.providerAccountId,\n                                refresh_token: account.refresh_token,\n                                access_token: account.access_token,\n                                expires_at: account.expires_at,\n                                token_type: account.token_type,\n                                scope: account.scope,\n                                id_token: account.id_token,\n                                session_state: account.session_state\n                            }\n                        });\n                    }\n                    // 確保第三方登入的用戶 emailVerified 為 true\n                    if (existingUser.email && !existingUser.emailVerified) {\n                        await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.update({\n                            where: {\n                                email: existingUser.email\n                            },\n                            data: {\n                                emailVerified: new Date()\n                            }\n                        });\n                    }\n                } else {\n                    // 如果用戶不存在，創建新用戶並設置 emailVerified 為 true\n                    await _lib_prisma__WEBPACK_IMPORTED_MODULE_4__.prisma.user.create({\n                        data: {\n                            email: user.email,\n                            name: user.name || null,\n                            emailVerified: new Date(),\n                            accounts: {\n                                create: {\n                                    type: account.type,\n                                    provider: account.provider,\n                                    providerAccountId: account.providerAccountId,\n                                    refresh_token: account.refresh_token,\n                                    access_token: account.access_token,\n                                    expires_at: account.expires_at,\n                                    token_type: account.token_type,\n                                    scope: account.scope,\n                                    id_token: account.id_token,\n                                    session_state: account.session_state\n                                }\n                            }\n                        }\n                    });\n                }\n            }\n            return true;\n        }\n    },\n    pages: {\n        signIn: '/login'\n    },\n    secret: process.env.NEXTAUTH_SECRET,\n    logger: {\n        error (code, metadata) {\n            console.error('NextAuth error:', code, metadata);\n        },\n        warn (code) {\n            console.warn('NextAuth warning:', code);\n        },\n        debug (code, metadata) {\n            console.debug('NextAuth debug:', code, metadata);\n        }\n    }\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG1CQUFtQlQsUUFBUVMsaUJBQWlCO29DQUM1Q0ksZUFBZWIsUUFBUWEsYUFBYTtvQ0FDcENDLGNBQWNkLFFBQVFjLFlBQVk7b0NBQ2xDQyxZQUFZZixRQUFRZSxVQUFVO29DQUM5QkMsWUFBWWhCLFFBQVFnQixVQUFVO29DQUM5QkMsT0FBT2pCLFFBQVFpQixLQUFLO29DQUNwQkMsVUFBVWxCLFFBQVFrQixRQUFRO29DQUMxQkMsZUFBZW5CLFFBQVFtQixhQUFhO2dDQUN0Qzs0QkFDRjt3QkFDRjtvQkFDRjtnQkFDRjtZQUNGO1lBQ0EsT0FBTztRQUNUO0lBQ0Y7SUFDQUcsT0FBTztRQUNMdkIsUUFBUTtJQUNWO0lBQ0F3QixRQUFRdEQsUUFBUUMsR0FBRyxDQUFDc0QsZUFBZTtJQUNuQ0MsUUFBUTtRQUNOQyxPQUFNQyxJQUFJLEVBQUVDLFFBQVE7WUFDbEJDLFFBQVFILEtBQUssQ0FBQyxtQkFBbUJDLE1BQU1DO1FBQ3pDO1FBQ0FFLE1BQUtILElBQUk7WUFDUEUsUUFBUUMsSUFBSSxDQUFDLHFCQUFxQkg7UUFDcEM7UUFDQUksT0FBTUosSUFBSSxFQUFFQyxRQUFRO1lBQ2xCQyxRQUFRRSxLQUFLLENBQUMsbUJBQW1CSixNQUFNQztRQUN6QztJQUNGO0FBQ0YsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL21hbnRpbmUtbmV4dC10ZW1wbGF0ZS8uL2xpYi9hdXRoL2F1dGhPcHRpb25zLnRzP2M1MGMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9saWIvYXV0aC9hdXRoT3B0aW9ucy50c1xyXG5pbXBvcnQgeyBOZXh0QXV0aE9wdGlvbnMgfSBmcm9tIFwibmV4dC1hdXRoXCI7XHJcbmltcG9ydCBHb29nbGVQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGVcIjtcclxuaW1wb3J0IEZhY2Vib29rUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvZmFjZWJvb2tcIjtcclxuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSBcIm5leHQtYXV0aC9wcm92aWRlcnMvY3JlZGVudGlhbHNcIjtcclxuaW1wb3J0IHsgUHJpc21hQWRhcHRlciB9IGZyb20gXCJAbmV4dC1hdXRoL3ByaXNtYS1hZGFwdGVyXCI7XHJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIjsgLy8g5qC55o2u5oKo55qE6aG555uu57uT5p6E6LCD5pW06Lev5b6EXHJcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0JzsgLy8g55So5LqO5a+G56CB5Yqg5a+G5ZKM6aqM6K+BXHJcblxyXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcclxuICBwcm92aWRlcnM6IFtcclxuICAgIC8vIEdvb2dsZSDnmbvlvZXmj5DkvpvogIVcclxuICAgIEdvb2dsZVByb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfSUQhLFxyXG4gICAgICBjbGllbnRTZWNyZXQ6IHByb2Nlc3MuZW52LkdPT0dMRV9DTElFTlRfU0VDUkVUISxcclxuICAgIH0pLFxyXG4gICAgLy8gRmFjZWJvb2sg55m75b2V5o+Q5L6b6ICFXHJcbiAgICBGYWNlYm9va1Byb3ZpZGVyKHtcclxuICAgICAgY2xpZW50SWQ6IHByb2Nlc3MuZW52LkZBQ0VCT09LX0NMSUVOVF9JRCEsXHJcbiAgICAgIGNsaWVudFNlY3JldDogcHJvY2Vzcy5lbnYuRkFDRUJPT0tfQ0xJRU5UX1NFQ1JFVCEsXHJcbiAgICB9KSxcclxuICAgIC8vIOiHquWumuS5ieiupOivgeaPkOS+m+iAhe+8iOeUteWtkOmCruS7tuWSjOWvhuegge+8iVxyXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XHJcbiAgICAgIG5hbWU6IFwiQ3JlZGVudGlhbHNcIixcclxuICAgICAgY3JlZGVudGlhbHM6IHtcclxuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCLnlLXlrZDpgq7ku7ZcIiwgdHlwZTogXCJlbWFpbFwiLCBwbGFjZWhvbGRlcjogXCJ5b3VyQGVtYWlsLmNvbVwiIH0sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwi5a+G56CBXCIsIHR5cGU6IFwicGFzc3dvcmRcIiB9LFxyXG4gICAgICB9LFxyXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xyXG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscy5wYXNzd29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDmn6Xor6LmlbDmja7lupPku6Xpqozor4HnlKjmiLdcclxuICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XHJcbiAgICAgICAgICB3aGVyZTogeyBlbWFpbDogY3JlZGVudGlhbHMuZW1haWwgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHVzZXIgJiYgdXNlci5wYXNzd29yZCkge1xyXG4gICAgICAgICAgLy8g5qqi5p+lIGVtYWlsVmVyaWZpZWRcclxuICAgICAgICAgIGlmICghdXNlci5lbWFpbFZlcmlmaWVkKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcign6KuL5YWI6amX6K2J5oKo55qE6Zu75a2Q6YO15Lu2Jyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8g5L2/55SoIGJjcnlwdCDmr5TovoPlr4bnoIFcclxuICAgICAgICAgIGNvbnN0IGlzVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShjcmVkZW50aWFscy5wYXNzd29yZCwgdXNlci5wYXNzd29yZCk7XHJcbiAgICAgICAgICBpZiAoaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXNlcjtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIOWmguaenOiupOivgeWksei0pe+8jOi/lOWbniBudWxsXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGFkYXB0ZXI6IFByaXNtYUFkYXB0ZXIocHJpc21hKSxcclxuICBzZXNzaW9uOiB7XHJcbiAgICBzdHJhdGVneTogXCJqd3RcIixcclxuICB9LFxyXG4gIGNhbGxiYWNrczoge1xyXG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRva2VuLmlkID0gdXNlci5pZDtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdG9rZW47XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgc2Vzc2lvbih7IHNlc3Npb24sIHRva2VuIH0pIHtcclxuICAgICAgaWYgKHRva2VuICYmIHNlc3Npb24udXNlcikge1xyXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZztcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc2Vzc2lvbjtcclxuICAgIH0sXHJcbiAgICBhc3luYyBzaWduSW4oeyB1c2VyLCBhY2NvdW50LCBwcm9maWxlIH0pIHtcclxuICAgICAgaWYgKGFjY291bnQ/LnByb3ZpZGVyID09PSBcImdvb2dsZVwiIHx8IGFjY291bnQ/LnByb3ZpZGVyID09PSBcImZhY2Vib29rXCIpIHtcclxuICAgICAgICBpZiAoIXVzZXIuZW1haWwpIHtcclxuICAgICAgICAgICAgLy8g5aaC5p6c5rKS5pyJIGVtYWls77yM5ouS57WV55m75YWlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgZW1haWw6IHVzZXIuZW1haWwgfSxcclxuICAgICAgICAgIGluY2x1ZGU6IHsgYWNjb3VudHM6IHRydWUgfSxcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGV4aXN0aW5nVXNlcikge1xyXG4gICAgICAgICAgY29uc3QgYWNjb3VudEV4aXN0cyA9IGV4aXN0aW5nVXNlci5hY2NvdW50cy5zb21lKFxyXG4gICAgICAgICAgICAoYWNjKSA9PlxyXG4gICAgICAgICAgICAgIGFjYy5wcm92aWRlciA9PT0gYWNjb3VudC5wcm92aWRlciAmJlxyXG4gICAgICAgICAgICAgIGFjYy5wcm92aWRlckFjY291bnRJZCA9PT0gYWNjb3VudC5wcm92aWRlckFjY291bnRJZFxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAoIWFjY291bnRFeGlzdHMpIHtcclxuICAgICAgICAgICAgLy8g6Ieq5Yqo6L+e5o6l5paw6LSm5oi35Yiw546w5pyJ55So5oi3XHJcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS5hY2NvdW50LmNyZWF0ZSh7XHJcbiAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgdXNlcklkOiBleGlzdGluZ1VzZXIuaWQsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBhY2NvdW50LnR5cGUsXHJcbiAgICAgICAgICAgICAgICBwcm92aWRlcjogYWNjb3VudC5wcm92aWRlcixcclxuICAgICAgICAgICAgICAgIHByb3ZpZGVyQWNjb3VudElkOiBhY2NvdW50LnByb3ZpZGVyQWNjb3VudElkLFxyXG4gICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogYWNjb3VudC5yZWZyZXNoX3Rva2VuLFxyXG4gICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiBhY2NvdW50LmFjY2Vzc190b2tlbixcclxuICAgICAgICAgICAgICAgIGV4cGlyZXNfYXQ6IGFjY291bnQuZXhwaXJlc19hdCxcclxuICAgICAgICAgICAgICAgIHRva2VuX3R5cGU6IGFjY291bnQudG9rZW5fdHlwZSxcclxuICAgICAgICAgICAgICAgIHNjb3BlOiBhY2NvdW50LnNjb3BlLFxyXG4gICAgICAgICAgICAgICAgaWRfdG9rZW46IGFjY291bnQuaWRfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICBzZXNzaW9uX3N0YXRlOiBhY2NvdW50LnNlc3Npb25fc3RhdGUsXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8g56K65L+d56ys5LiJ5pa555m75YWl55qE55So5oi2IGVtYWlsVmVyaWZpZWQg54K6IHRydWVcclxuICAgICAgICAgIGlmIChleGlzdGluZ1VzZXIuZW1haWwgJiYgIWV4aXN0aW5nVXNlci5lbWFpbFZlcmlmaWVkKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLnVwZGF0ZSh7XHJcbiAgICAgICAgICAgICAgd2hlcmU6IHsgZW1haWw6IGV4aXN0aW5nVXNlci5lbWFpbCB9LFxyXG4gICAgICAgICAgICAgIGRhdGE6IHsgZW1haWxWZXJpZmllZDogbmV3IERhdGUoKSB9LFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8g5aaC5p6c55So5oi25LiN5a2Y5Zyo77yM5Ym15bu65paw55So5oi25Lim6Kit572uIGVtYWlsVmVyaWZpZWQg54K6IHRydWVcclxuICAgICAgICAgIGF3YWl0IHByaXNtYS51c2VyLmNyZWF0ZSh7XHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbCEsXHJcbiAgICAgICAgICAgICAgbmFtZTogdXNlci5uYW1lIHx8IG51bGwsXHJcbiAgICAgICAgICAgICAgZW1haWxWZXJpZmllZDogbmV3IERhdGUoKSxcclxuICAgICAgICAgICAgICBhY2NvdW50czoge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlOiB7XHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6IGFjY291bnQudHlwZSxcclxuICAgICAgICAgICAgICAgICAgcHJvdmlkZXI6IGFjY291bnQucHJvdmlkZXIsXHJcbiAgICAgICAgICAgICAgICAgIHByb3ZpZGVyQWNjb3VudElkOiBhY2NvdW50LnByb3ZpZGVyQWNjb3VudElkLFxyXG4gICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiBhY2NvdW50LnJlZnJlc2hfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogYWNjb3VudC5hY2Nlc3NfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgIGV4cGlyZXNfYXQ6IGFjY291bnQuZXhwaXJlc19hdCxcclxuICAgICAgICAgICAgICAgICAgdG9rZW5fdHlwZTogYWNjb3VudC50b2tlbl90eXBlLFxyXG4gICAgICAgICAgICAgICAgICBzY29wZTogYWNjb3VudC5zY29wZSxcclxuICAgICAgICAgICAgICAgICAgaWRfdG9rZW46IGFjY291bnQuaWRfdG9rZW4sXHJcbiAgICAgICAgICAgICAgICAgIHNlc3Npb25fc3RhdGU6IGFjY291bnQuc2Vzc2lvbl9zdGF0ZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgfSxcclxuICBwYWdlczoge1xyXG4gICAgc2lnbkluOiAnL2xvZ2luJywgLy8g5oyH5a6a6Ieq5a6a5LmJ55m75b2V6aG16Z2iXHJcbiAgfSxcclxuICBzZWNyZXQ6IHByb2Nlc3MuZW52Lk5FWFRBVVRIX1NFQ1JFVCxcclxuICBsb2dnZXI6IHtcclxuICAgIGVycm9yKGNvZGUsIG1ldGFkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ05leHRBdXRoIGVycm9yOicsIGNvZGUsIG1ldGFkYXRhKTtcclxuICAgIH0sXHJcbiAgICB3YXJuKGNvZGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdOZXh0QXV0aCB3YXJuaW5nOicsIGNvZGUpO1xyXG4gICAgfSxcclxuICAgIGRlYnVnKGNvZGUsIG1ldGFkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUuZGVidWcoJ05leHRBdXRoIGRlYnVnOicsIGNvZGUsIG1ldGFkYXRhKTtcclxuICAgIH0sXHJcbiAgfSwgXHJcbn07XHJcbiJdLCJuYW1lcyI6WyJHb29nbGVQcm92aWRlciIsIkZhY2Vib29rUHJvdmlkZXIiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiUHJpc21hQWRhcHRlciIsInByaXNtYSIsImJjcnlwdCIsImF1dGhPcHRpb25zIiwicHJvdmlkZXJzIiwiY2xpZW50SWQiLCJwcm9jZXNzIiwiZW52IiwiR09PR0xFX0NMSUVOVF9JRCIsImNsaWVudFNlY3JldCIsIkdPT0dMRV9DTElFTlRfU0VDUkVUIiwiRkFDRUJPT0tfQ0xJRU5UX0lEIiwiRkFDRUJPT0tfQ0xJRU5UX1NFQ1JFVCIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGxhY2Vob2xkZXIiLCJwYXNzd29yZCIsImF1dGhvcml6ZSIsInJlcSIsInVzZXIiLCJmaW5kVW5pcXVlIiwid2hlcmUiLCJlbWFpbFZlcmlmaWVkIiwiRXJyb3IiLCJpc1ZhbGlkIiwiY29tcGFyZSIsImFkYXB0ZXIiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsImlkIiwic2lnbkluIiwiYWNjb3VudCIsInByb2ZpbGUiLCJwcm92aWRlciIsImV4aXN0aW5nVXNlciIsImluY2x1ZGUiLCJhY2NvdW50cyIsImFjY291bnRFeGlzdHMiLCJzb21lIiwiYWNjIiwicHJvdmlkZXJBY2NvdW50SWQiLCJjcmVhdGUiLCJkYXRhIiwidXNlcklkIiwicmVmcmVzaF90b2tlbiIsImFjY2Vzc190b2tlbiIsImV4cGlyZXNfYXQiLCJ0b2tlbl90eXBlIiwic2NvcGUiLCJpZF90b2tlbiIsInNlc3Npb25fc3RhdGUiLCJ1cGRhdGUiLCJEYXRlIiwicGFnZXMiLCJzZWNyZXQiLCJORVhUQVVUSF9TRUNSRVQiLCJsb2dnZXIiLCJlcnJvciIsImNvZGUiLCJtZXRhZGF0YSIsImNvbnNvbGUiLCJ3YXJuIiwiZGVidWciXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth/authOptions.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.tsx":
/*!************************!*\
  !*** ./lib/prisma.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prisma = global.prisma || new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        'query',\n        'info',\n        'warn',\n        'error'\n    ]\n});\nif (true) global.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBOEM7QUFRdkMsTUFBTUMsU0FDWEMsT0FBT0QsTUFBTSxJQUNiLElBQUlELHdEQUFZQSxDQUFDO0lBQ2ZHLEtBQUs7UUFBQztRQUFTO1FBQVE7UUFBUTtLQUFRO0FBQ3pDLEdBQUc7QUFFTCxJQUFJQyxJQUFxQyxFQUFFRixPQUFPRCxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWFudGluZS1uZXh0LXRlbXBsYXRlLy4vbGliL3ByaXNtYS50c3g/NjY1MCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tICdAcHJpc21hL2NsaWVudCc7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgLy8g5YWB6Kix5YWo5bGA6K6K5pW45a6j5ZGK77yM6YG/5YWN5Zyo6ZaL55m85qih5byP5LiL5aSa5qyh5a+m5L6L5YyWIFByaXNtYUNsaWVudFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby12YXJcclxuICB2YXIgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcmlzbWEgPVxyXG4gIGdsb2JhbC5wcmlzbWEgfHxcclxuICBuZXcgUHJpc21hQ2xpZW50KHtcclxuICAgIGxvZzogWydxdWVyeScsICdpbmZvJywgJ3dhcm4nLCAnZXJyb3InXSwgLy8g6YG45pOH5piv5ZCm5Zyo5o6n5Yi25Y+w6aGv56S65p+l6Kmi5pel6KqMXHJcbiAgfSk7XHJcblxyXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykgZ2xvYmFsLnByaXNtYSA9IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwicHJpc21hIiwiZ2xvYmFsIiwibG9nIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.tsx\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/@next-auth","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&page=%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2F%5B...nextauth%5D%2Froute.ts&appDir=D%3A%5CMyCode%5CGameMantine%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5CMyCode%5CGameMantine&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();