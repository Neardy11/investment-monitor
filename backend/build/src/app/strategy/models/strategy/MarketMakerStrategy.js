"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typegoose_1 = require("typegoose");
var db_1 = require("../../db/db");
var AbstractStrategy_1 = require("./AbstractStrategy");
var class_validator_1 = require("class-validator");
var handleValitateError_1 = require("../../../../shared/helpers/handleValitateError");
var ApplicationResponse_1 = require("../../../../shared/models/ApplicationResponse");
var system_errors_1 = require("../../../../shared/helpers/system-errors");
var StrategyStatus_1 = require("./enums/StrategyStatus");
var Exchange_1 = require("../../../commons/models/exchange/Exchange");
var MarketMakerConfig_1 = require("./configs/MarketMakerConfig");
var projectName_1 = require("../../../../shared/models/enum/projectName");
/**
 * @typedef MarketMakerStrategy
 * @property { string } startegyType - Type of the strategy - eg: MARKET_MAKER
 * @property { integer } midPrice
 * @property { integer } wakket
 * @property { string } finPair.required - FinPair - eg: USD
 * @property { string } iniPair.required - IniPair - eg: BTC
 */
var MarketMakerStrategy = /** @class */ (function (_super) {
    __extends(MarketMakerStrategy, _super);
    function MarketMakerStrategy() {
        var _this = _super.call(this, MarketMakerConfig_1.MarketMakerConfig) || this;
        _this.midPrice = undefined;
        _this.wallet = undefined;
        _this.finPair = undefined;
        _this.iniPair = undefined;
        return _this;
    }
    MarketMakerStrategy.prototype.assembleMockedValues = function (locals) {
        return __awaiter(this, void 0, void 0, function () {
            var validation, exchange;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.updatedBy = locals.user ? locals.user.uid : "created-locally";
                        this.createdBy = locals.user ? locals.user.uid : "created-locally";
                        this.status = StrategyStatus_1.StrategyStatus.ACTIVE;
                        delete this.config.strategy;
                        return [4 /*yield*/, class_validator_1.validate(this)];
                    case 1:
                        validation = _a.sent();
                        return [4 /*yield*/, handleValitateError_1.handleValidateError(validation)];
                    case 2:
                        _a.sent();
                        this.config.walletId = this.name ? this.name.replace(/ /g, '') : "";
                        /**
                         * Regra de forex
                         */
                        if (this.finPair === 'BRL' || this.iniPair === 'BRL') {
                            this.config.referencePrice.forexEnable = true;
                            this.config.forexMarketPrice = {
                                currencyBase: "BRL",
                                currencyQuote: "USD",
                                subscribe: "FOREXAPI_CURRENCY_TICKER_USD_BRL"
                            };
                        }
                        return [4 /*yield*/, Exchange_1.ExchangeSchema.findById(this.config.exchange).exec()];
                    case 3:
                        exchange = _a.sent();
                        if (exchange) {
                            this.config.exchangeName = exchange.name;
                            this.config.exchangeOptions = {
                                maxConcurrentRequests: exchange.maxConcurrentRequests,
                                minTimeBetweenRequests: exchange.minTimeBetweenRequests
                            };
                        }
                        else {
                            throw new ApplicationResponse_1.ApplicationResponse(400, {}, system_errors_1.SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.message, system_errors_1.SystemErrors.STRATEGY_EXCHANGE_NOTFOUND.code);
                        }
                        this.config.global.loopType = 'STREAM';
                        this.config.global.loopInterval = 10000;
                        return [2 /*return*/, this];
                }
            });
        });
    };
    __decorate([
        typegoose_1.prop({ index: true, default: projectName_1.Project.MARKET_MAKER }),
        __metadata("design:type", Object)
    ], MarketMakerStrategy.prototype, "strategyType", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], MarketMakerStrategy.prototype, "midPrice", void 0);
    __decorate([
        typegoose_1.prop(),
        __metadata("design:type", Number)
    ], MarketMakerStrategy.prototype, "wallet", void 0);
    __decorate([
        typegoose_1.prop(),
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], MarketMakerStrategy.prototype, "finPair", void 0);
    __decorate([
        typegoose_1.prop(),
        class_validator_1.IsDefined(),
        class_validator_1.IsString(),
        __metadata("design:type", String)
    ], MarketMakerStrategy.prototype, "iniPair", void 0);
    return MarketMakerStrategy;
}(AbstractStrategy_1.AbstractStrategy));
exports.MarketMakerStrategy = MarketMakerStrategy;
exports.StrategyMarketMakerSchema = new MarketMakerStrategy().getModelForClass(MarketMakerStrategy, {
    existingConnection: db_1.connectToStrategyDB(),
    schemaOptions: {
        timestamps: { createdAt: true, updatedAt: true },
        collection: 'strategies'
    }
});
//# sourceMappingURL=MarketMakerStrategy.js.map