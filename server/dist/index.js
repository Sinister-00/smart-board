/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./entities/status-code.ts":
/*!*********************************!*\
  !*** ./entities/status-code.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.STATUS_CODE = void 0;\nvar STATUS_CODE;\n(function (STATUS_CODE) {\n    STATUS_CODE[\"SUCCESS\"] = \"success\";\n    STATUS_CODE[\"FAILURE\"] = \"failure\";\n})(STATUS_CODE || (exports.STATUS_CODE = STATUS_CODE = {}));\n\n\n//# sourceURL=webpack://smartboard-iot/./entities/status-code.ts?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst board_1 = __importDefault(__webpack_require__(/*! ./routers/board */ \"./routers/board.ts\"));\nconst game_1 = __importDefault(__webpack_require__(/*! ./routers/game */ \"./routers/game.ts\"));\ndotenv_1.default.config();\n// Constants\nconst app = (0, express_1.default)();\nconst PORT = \"3000\" || 0;\nconst MONGO_URI = \"mongodb+srv://sahajsrivastava1104:bOBFBqJHlRs4LoXk@smartboard.y5l5zhs.mongodb.net/?retryWrites=true&w=majority\" || 0;\n// Database Connection\nmongoose_1.default.connect(MONGO_URI, {\n    useNewUrlParser: true,\n    useUnifiedTopology: true,\n});\nconst db = mongoose_1.default.connection;\ndb.on('error', (e) => console.error(e, 'MongoDB connection error:'));\ndb.once('open', () => {\n    console.log('Connected to MongoDB');\n});\n// Middlewares\napp.use((0, cors_1.default)());\napp.use(express_1.default.json());\napp.use('/api/board', board_1.default);\napp.use('/api/game', game_1.default);\n// Routes\napp.get('/', (req, res) => {\n    res.send(\"Hello, SOrry to disappoint but there's no fun here!\");\n});\napp.get('/ping', (req, res) => {\n    res.send(\"Teri ma chodi mai..?\");\n});\napp.listen(PORT, () => {\n    console.log(`Server is running on port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://smartboard-iot/./index.ts?");

/***/ }),

/***/ "./models/board.ts":
/*!*************************!*\
  !*** ./models/board.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __exportStar = (this && this.__exportStar) || function(m, exports) {\n    for (var p in m) if (p !== \"default\" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst boardSchema = new mongoose_1.Schema({\n    connection_string: {\n        type: String,\n        minlength: 5,\n        maxlength: 15,\n        unique: true,\n        required: true,\n    },\n    ping: {\n        type: Date,\n        default: Date.now,\n    },\n    status: {\n        type: String,\n    },\n    from: {\n        type: String,\n        default: null,\n    },\n    to: {\n        type: String,\n        default: null,\n    },\n});\n__exportStar(__webpack_require__(/*! ./types */ \"./models/types.ts\"), exports);\nexports[\"default\"] = (0, mongoose_1.model)('Board', boardSchema);\n\n\n//# sourceURL=webpack://smartboard-iot/./models/board.ts?");

/***/ }),

/***/ "./models/types.ts":
/*!*************************!*\
  !*** ./models/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n\n\n//# sourceURL=webpack://smartboard-iot/./models/types.ts?");

/***/ }),

/***/ "./routers/board.ts":
/*!**************************!*\
  !*** ./routers/board.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst board_1 = __importDefault(__webpack_require__(/*! ../models/board */ \"./models/board.ts\"));\nconst status_code_1 = __webpack_require__(/*! ../entities/status-code */ \"./entities/status-code.ts\");\nconst boardRouter = express_1.default.Router();\nboardRouter.get('/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { conn_string } = req.query;\n        if (!!conn_string && typeof conn_string !== 'string') {\n            return res.status(400).json({ error: 'Invalid query parameter' });\n        }\n        const board = yield board_1.default.findOne({\n            connection_string: conn_string,\n        });\n        if (!board) {\n            return res.json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Board not found' });\n        }\n        const currentTime = Date.now();\n        const lastPingTime = board.ping.getTime();\n        if (currentTime - lastPingTime < 10000) {\n            return res.json({ status: status_code_1.STATUS_CODE.SUCCESS, message: 'Online' });\n        }\n        else {\n            return res.json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Offline' });\n        }\n    }\n    catch (error) {\n        res.status(500).json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Internal server error' });\n    }\n}));\nboardRouter.get('/ping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { connection_string } = req.query;\n        if (!!connection_string) {\n            return res.status(400).json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Invalid query parameter' });\n        }\n        const timeNow = new Date();\n        const updateResponse = yield board_1.default.updateOne({ connection_string: connection_string }, {\n            $set: {\n                ping: timeNow,\n            },\n            $currentDate: { lastModified: true },\n        });\n        if (updateResponse.matchedCount === 0) {\n            return res.status(404).json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Board not found' });\n        }\n        const board = yield board_1.default.findOne({\n            connection_string: connection_string,\n        });\n        if (!board)\n            return res.status(404).json({ status: status_code_1.STATUS_CODE.FAILURE, message: 'Board not found' });\n        const responseString = `${board.to}_${board.from}`;\n        res.json({ status: status_code_1.STATUS_CODE.SUCCESS, message: responseString });\n    }\n    catch (err) {\n        res.status(500).json({ status: status_code_1.STATUS_CODE.FAILURE, message: err });\n    }\n}));\nboardRouter.get('/setComplete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { connection_string } = req.query;\n        if (typeof connection_string !== 'string') {\n            return res.status(400).json({ success: status_code_1.STATUS_CODE.FAILURE, message: 'Invalid query parameter' });\n        }\n        const response = yield board_1.default.updateOne({ connection_string: connection_string }, {\n            $set: {\n                status: 'available',\n                from: null,\n                to: null,\n            },\n            $currentDate: { lastModified: true },\n        });\n        if (response.matchedCount === 0) {\n            return res.status(404).json({ success: status_code_1.STATUS_CODE.FAILURE, message: 'Board not found' });\n        }\n        res.json({ success: status_code_1.STATUS_CODE.SUCCESS });\n    }\n    catch (err) {\n        res.status(500).json({ success: status_code_1.STATUS_CODE.FAILURE, message: err });\n    }\n}));\nexports[\"default\"] = boardRouter;\n\n\n//# sourceURL=webpack://smartboard-iot/./routers/board.ts?");

/***/ }),

/***/ "./routers/game.ts":
/*!*************************!*\
  !*** ./routers/game.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst board_1 = __importDefault(__webpack_require__(/*! ../models/board */ \"./models/board.ts\"));\nconst status_code_1 = __webpack_require__(/*! ../entities/status-code */ \"./entities/status-code.ts\");\nconst gameRouter = express_1.default.Router();\ngameRouter.post('/registerBoard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { connection_string } = req.body;\n        if (!!connection_string) {\n            return res.status(400).json({ success: status_code_1.STATUS_CODE.FAILURE, message: 'Invalid request' });\n        }\n        const board = new board_1.default({\n            connection_string: connection_string,\n            status: 'available',\n        });\n        const savedBoard = yield board.save();\n        res.json({\n            success: status_code_1.STATUS_CODE.SUCCESS,\n            _id: savedBoard._id,\n        });\n    }\n    catch (err) {\n        res.status(500).json({ success: status_code_1.STATUS_CODE.FAILURE, message: err });\n    }\n}));\ngameRouter.post('/sendMove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { connection_string, from, to } = req.body;\n        if (!!connection_string || !!from || !!to) {\n            return res.status(400).json({ success: status_code_1.STATUS_CODE.FAILURE, message: 'Invalid request' });\n        }\n        const response = yield board_1.default.updateOne({ connection_string: connection_string }, {\n            $set: {\n                from: from,\n                to: to,\n                status: 'processing',\n            },\n            $currentDate: { lastModified: true },\n        });\n        if (response.matchedCount === 0) {\n            return res.status(404).json({ success: status_code_1.STATUS_CODE.FAILURE, message: 'Board not found' });\n        }\n        res.json({ success: status_code_1.STATUS_CODE.SUCCESS });\n    }\n    catch (err) {\n        res.status(500).json({ success: status_code_1.STATUS_CODE.FAILURE, message: err });\n    }\n}));\nexports[\"default\"] = gameRouter;\n\n\n//# sourceURL=webpack://smartboard-iot/./routers/game.ts?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;