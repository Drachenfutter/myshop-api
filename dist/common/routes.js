"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var UserService = __importStar(require("../service/userService"));
var ProductService = __importStar(require("../service/productService"));
var AuthService = __importStar(require("../service/authService"));
var UploadService = __importStar(require("../service/uploadService"));
var MailService = __importStar(require("../service/mailService"));
var labels_1 = require("./labels");
var fail_1 = require("./fail");
var auth_1 = require("./auth");
var multer_1 = __importDefault(require("multer"));
var upload = multer_1.default({ dest: 'public/images/products/' });
function welcome(_request, response) {
    response.send({ ok: true });
}
function createUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_1, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(201)).json;
                    return [4 /*yield*/, UserService.createNewUser(request.body)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _c.sent();
                    error = fail_1.FormatError(err_1);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getUser(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_2, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, UserService.getUser(request.params.email)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _c.sent();
                    error = fail_1.FormatError(err_2);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getProduct(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_3, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, ProductService.getProduct(request.params.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _c.sent();
                    error = fail_1.FormatError(err_3);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function listProducts(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var autorization, jwt, _a, _b, _c, _d, err_4, error;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    autorization = auth_1.getJwtFromHeader(request);
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, , 8]);
                    if (!autorization) return [3 /*break*/, 4];
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 2:
                    jwt = _e.sent();
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, ProductService.listProducts(jwt.userId)];
                case 3:
                    _b.apply(_a, [_e.sent()]);
                    return [3 /*break*/, 6];
                case 4:
                    _d = (_c = response.status(200)).json;
                    return [4 /*yield*/, ProductService.listProducts()];
                case 5:
                    _d.apply(_c, [_e.sent()]);
                    _e.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_4 = _e.sent();
                    error = fail_1.FormatError(err_4);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function listImages(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_5, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, UploadService.listImages(request.params.id)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _c.sent();
                    error = fail_1.FormatError(err_5);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createProduct(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var jwt, _a, _b, err_6, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 1:
                    jwt = _c.sent();
                    _b = (_a = response.status(201)).json;
                    return [4 /*yield*/, ProductService.createNewProduct(jwt.userId, request.body)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    err_6 = _c.sent();
                    error = fail_1.FormatError(err_6);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function updateProduct(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_7, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 1:
                    _c.sent();
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, ProductService.updateProduct(request.body)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    err_7 = _c.sent();
                    error = fail_1.FormatError(err_7);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function uploadFile(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var jwt, _a, _b, err_8, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 1:
                    jwt = _c.sent();
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, UploadService.uploadFile(jwt.userId, request)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _c.sent();
                    error = fail_1.FormatError(err_8);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function deleteFile(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_9, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 1:
                    _c.sent();
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, UploadService.deleteImage(request.params.id)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    err_9 = _c.sent();
                    error = fail_1.FormatError(err_9);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function sendEmailConfirmation(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_10, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, auth_1.validateHeader(request)];
                case 1:
                    _c.sent();
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, MailService.sendEmailConfirmation(request.body.userEmail)];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 4];
                case 3:
                    err_10 = _c.sent();
                    error = fail_1.FormatError(err_10);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function confirmEmail(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_11, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(200)).json;
                    return [4 /*yield*/, MailService.confirmEmail(request.params.token)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_11 = _c.sent();
                    error = fail_1.FormatError(err_11);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function login(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, err_12, error;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    _b = (_a = response.status(201)).json;
                    return [4 /*yield*/, AuthService.login(request.body)];
                case 1:
                    _b.apply(_a, [_c.sent()]);
                    return [3 /*break*/, 3];
                case 2:
                    err_12 = _c.sent();
                    error = fail_1.FormatError(err_12);
                    response.status(error.statusCode).json(error);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function routes(app) {
    app.route('/').get(welcome);
    app.route(labels_1.CONST.ROUTE.USER).post(createUser);
    app.route(labels_1.CONST.ROUTE.USER + '/:email').get(getUser);
    app.route(labels_1.CONST.ROUTE.PRODUCT + '/:id').get(getProduct);
    app.route(labels_1.CONST.ROUTE.PRODUCT + '/:id' + labels_1.CONST.ROUTE.IMAGE).get(listImages);
    app.route(labels_1.CONST.ROUTE.PRODUCT + '/:productId' + labels_1.CONST.ROUTE.IMAGE + '/:id').delete(deleteFile);
    app.route(labels_1.CONST.ROUTE.PRODUCTS).get(listProducts);
    app.route(labels_1.CONST.ROUTE.PRODUCT).post(createProduct);
    app.route(labels_1.CONST.ROUTE.PRODUCT).put(updateProduct);
    app.route(labels_1.CONST.ROUTE.PRODUCT + labels_1.CONST.ROUTE.IMAGE + '/:productId').post(upload.single(labels_1.CONST.UPLOAD_IMAGE_KEY), uploadFile);
    app.route(labels_1.CONST.ROUTE.SEND_EMAIL).post(sendEmailConfirmation);
    app.route(labels_1.CONST.ROUTE.CONFIRM_EMAIL + '/:token').get(confirmEmail);
    app.route(labels_1.CONST.ROUTE.LOGIN).post(login);
}
exports.routes = routes;
