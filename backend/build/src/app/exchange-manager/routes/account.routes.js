"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller = __importStar(require("../controllers/account"));
var accountRoute = express_1.Router();
/**
 * @route POST /account/balance
 * @group account
 * @security Bearer
*/
accountRoute.route('/balance').post(controller.accountBalance);
exports.default = accountRoute;
//# sourceMappingURL=account.routes.js.map