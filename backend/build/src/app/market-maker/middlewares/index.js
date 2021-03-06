"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var auth_route_1 = __importDefault(require("../../../shared/middlewares/auth-route"));
var express_firebase_custom_auth_1 = require("../../../shared/helpers/express-firebase-custom-auth");
var validate_header_1 = __importDefault(require("../../../shared/middlewares/validate-header"));
var addRequestId = require('express-request-id')();
exports.configMiddleware = function (app) {
    // require('../../middlewares/firebase');
    app.use(addRequestId);
    app.use(body_parser_1.default.json());
    app.use(cors_1.default());
    //
    app.use(validate_header_1.default);
    if (process.env.NODE_ENV !== 'local') {
        app.use('/', express_firebase_custom_auth_1.auth);
        app.use(auth_route_1.default);
    }
};
//# sourceMappingURL=index.js.map