"use strict";
(() => {
var exports = {};
exports.id = 365;
exports.ids = [365];
exports.modules = {

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 8784:
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

// NAMESPACE OBJECT: ./src/app/board/set-complete/route.ts
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
var board = __webpack_require__(9460);
// EXTERNAL MODULE: ./node_modules/next/dist/server/web/exports/next-response.js
var next_response = __webpack_require__(9335);
;// CONCATENATED MODULE: ./src/app/board/set-complete/route.ts



async function GET(request) {
    try {
        const req = await request.json();
        const { connection_string } = req.body;
        if (!connection_string) {
            return next_response/* default */.Z.json({
                success: status_code/* STATUS_CODE */.M.FAILURE,
                message: "Invalid query parameter"
            });
        }
        const response = await board/* default */.Z.updateOne({
            connection_string: connection_string
        }, {
            $set: {
                status: "available",
                from: null,
                to: null
            },
            $currentDate: {
                lastModified: true
            }
        });
        if (response.matchedCount === 0) {
            return next_response/* default */.Z.json({
                success: status_code/* STATUS_CODE */.M.FAILURE,
                message: "Board not found"
            });
        }
        return next_response/* default */.Z.json({
            success: status_code/* STATUS_CODE */.M.SUCCESS
        });
    } catch (err) {
        return next_response/* default */.Z.json({
            success: status_code/* STATUS_CODE */.M.FAILURE,
            message: err
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?page=%2Fboard%2Fset-complete%2Froute&name=app%2Fboard%2Fset-complete%2Froute&pagePath=private-next-app-dir%2Fboard%2Fset-complete%2Froute.ts&appDir=%2Fhome%2Fmad1ad%2FDownloads%2FCapstone%2Fsmart-board%2Fnext-server%2Fsrc%2Fapp&appPaths=%2Fboard%2Fset-complete%2Froute&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!

// @ts-ignore this need to be imported from next/dist to be external


// @ts-expect-error - replaced by webpack/turbopack loader

const AppRouteRouteModule = app_route_module.AppRouteRouteModule;
// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new AppRouteRouteModule({
    definition: {
        kind: route_kind.RouteKind.APP_ROUTE,
        page: "/board/set-complete/route",
        pathname: "/board/set-complete",
        filename: "route",
        bundlePath: "app/board/set-complete/route"
    },
    resolvedPagePath: "/home/mad1ad/Downloads/Capstone/smart-board/next-server/src/app/board/set-complete/route.ts",
    nextConfigOutput,
    userland: route_namespaceObject
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { requestAsyncStorage , staticGenerationAsyncStorage , serverHooks , headerHooks , staticGenerationBailout  } = routeModule;
const originalPathname = "/board/set-complete/route";


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
var __webpack_exports__ = __webpack_require__.X(0, [587,501,335], () => (__webpack_exec__(8784)));
module.exports = __webpack_exports__;

})();