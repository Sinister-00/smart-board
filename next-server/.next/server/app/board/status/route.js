"use strict";
(() => {
var exports = {};
exports.id = 363;
exports.ids = [363];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 5775:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  headerHooks: () => (/* binding */ headerHooks),
  originalPathname: () => (/* binding */ originalPathname),
  requestAsyncStorage: () => (/* binding */ requestAsyncStorage),
  routeModule: () => (/* binding */ routeModule),
  serverHooks: () => (/* binding */ serverHooks),
  staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),
  staticGenerationBailout: () => (/* binding */ staticGenerationBailout)
});

// NAMESPACE OBJECT: ./src/app/board/status/route.ts
var route_namespaceObject = {};
__webpack_require__.r(route_namespaceObject);
__webpack_require__.d(route_namespaceObject, {
  GET: () => (GET)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/node-polyfill-headers.js
var node_polyfill_headers = __webpack_require__(2394);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/app-route/module.js
var app_route_module = __webpack_require__(9692);
// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-kind.js
var route_kind = __webpack_require__(9513);
// EXTERNAL MODULE: ./src/entities/status-code.ts
var status_code = __webpack_require__(8772);
// EXTERNAL MODULE: ./src/models/board.ts + 1 modules
var models_board = __webpack_require__(9460);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
;// CONCATENATED MODULE: ./src/app/board/status/route.ts



async function GET(request) {
    try {
        const req = await request.json();
        const { connection_string } = req.body;
        if (!connection_string || typeof connection_string !== "string") {
            return next_response/* default */.Z.json({
                error: "Invalid query parameter"
            });
        }
        const board = await models_board/* default */.Z.findOne({
            connection_string: connection_string
        });
        if (!board) {
            return next_response/* default */.Z.json({
                status: status_code/* STATUS_CODE */.M.FAILURE,
                message: "Board not found"
            });
        }
        const currentTime = Date.now();
        const lastPingTime = board.ping.getTime();
        if (currentTime - lastPingTime < 10000) {
            return next_response/* default */.Z.json({
                status: status_code/* STATUS_CODE */.M.SUCCESS,
                message: "Online"
            });
        } else {
            return next_response/* default */.Z.json({
                status: status_code/* STATUS_CODE */.M.FAILURE,
                message: "Offline"
            });
        }
    } catch (error) {
        return next_response/* default */.Z.json({
            status: status_code/* STATUS_CODE */.M.FAILURE,
            message: "Internal server error"
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fboard%2Fstatus%2Froute&name=app%2Fboard%2Fstatus%2Froute&pagePath=private-next-app-dir%2Fboard%2Fstatus%2Froute.ts&appDir=%2Fhome%2Fmad1ad%2FDownloads%2FCapstone%2Fnew_code%2Fnext_server%2Fsrc%2Fapp&appPaths=%2Fboard%2Fstatus%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/board/status/route",
        pathname: "/board/status",
        filename: "route",
        bundlePath: "app/board/status/route"
    },
    resolvedPagePath: "/home/mad1ad/Downloads/Capstone/new_code/next_server/src/app/board/status/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/board/status/route";


//# sourceMappingURL=app-route.js.map

/***/ }),

/***/ 8772:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ STATUS_CODE)
/* harmony export */ });
var STATUS_CODE;
(function(STATUS_CODE) {
    STATUS_CODE["SUCCESS"] = "success";
    STATUS_CODE["FAILURE"] = "failure";
})(STATUS_CODE || (STATUS_CODE = {}));


/***/ }),

/***/ 9460:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ board)
});

;// CONCATENATED MODULE: external "mongoose"
const external_mongoose_namespaceObject = require("mongoose");
;// CONCATENATED MODULE: ./src/models/board.ts

const boardSchema = new external_mongoose_namespaceObject.Schema({
    connection_string: {
        type: String,
        minlength: 5,
        maxlength: 15,
        unique: true,
        required: true
    },
    ping: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String
    },
    from: {
        type: String,
        default: null
    },
    to: {
        type: String,
        default: null
    }
});

/* harmony default export */ const board = ((0,external_mongoose_namespaceObject.model)("Board", boardSchema));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [587,501,335], () => (__webpack_exec__(5775)));
module.exports = __webpack_exports__;

})();