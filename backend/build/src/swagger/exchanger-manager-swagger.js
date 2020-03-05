"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dynamicRoutes_1 = require("../shared/helpers/dynamicRoutes");
exports.exchangeManagerSwagger = function (app, dirname, files) {
    var expressSwaggerSubscriber = require('express-swagger-generator')(app);
    var options = {
        route: {
            url: '/exchange-manager/api-docs',
            docs: '/exchange-manager/api-docs.json'
        },
        swaggerDefinition: {
            info: {
                description: 'This is a sample server',
                title: 'General System  API',
                version: '1.0.0',
            },
            host: "" + (process.env.BASE_URL || 'localhost:3000'),
            basePath: '/exchange-manager',
            produces: [
                "application/json",
                "application/xml"
            ],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: "",
                }
            }
        },
        basedir: dirname,
        files: files //Path to the API handle folder
    };
    var config = expressSwaggerSubscriber(options);
    dynamicRoutes_1.DynamicRoutes.addConfig(config);
};
//# sourceMappingURL=exchanger-manager-swagger.js.map