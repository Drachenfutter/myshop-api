"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.confirmEmail = exports.sendEmailConfirmation = void 0;
var Queue = __importStar(require("fastq"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var fail_1 = require("../common/fail");
var labels_1 = require("../common/labels");
var utils_1 = require("../common/utils");
var authorizationResource_1 = require("../resource/authorizationResource");
var userService_1 = require("./userService");
var queue = Queue.promise(mountAndSend, 1);
function mountAndSend(request) {
    return __awaiter(this, void 0, void 0, function () {
        var transport;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transport = nodemailer_1.default.createTransport({
                        host: labels_1.PARMS.EMAIL.HOST,
                        port: labels_1.PARMS.EMAIL.PORT,
                        auth: {
                            user: labels_1.PARMS.EMAIL.AUTH.USER,
                            pass: labels_1.PARMS.EMAIL.AUTH.PASS
                        }
                    });
                    return [4 /*yield*/, transport.sendMail({
                            from: '"MyShop Welcome" <sec@myshop.com>',
                            to: request.email,
                            subject: "Welcome, " + request.name.split(' ')[0],
                            text: "Welcome!",
                            html: bodyEmail(request.name, request.linkConfirmation),
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function bodyEmail(userName, linkConfirmation) {
    return "<!DOCTYPE html><html><head><title></title><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" /><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" /><style type=\"text/css\">body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0pt;mso-table-rspace:0pt}img{-ms-interpolation-mode:bicubic}img{border:0;height:auto;line-height:100%;outline:none;text-decoration:none}table{border-collapse:collapse !important}body{height:100% !important;margin:0 !important;padding:0 !important;width:100% !important}a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;font-size:inherit !important;font-family:inherit !important;font-weight:inherit !important;line-height:inherit !important}@media screen and (max-width:600px){h1{font-size:18px !important;line-height:18px !important}}div[style*=\"margin: 16px 0;\"]{margin:0 !important}</style></head><body style=\"background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;\"><div style=\"display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;\"> We're thrilled to have you here! Get ready to dive into your new account.</div><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"><tr><td bgcolor=\"#012A36\" align=\"center\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\"><tr><td align=\"center\" valign=\"top\" style=\"padding: 40px 10px 40px 10px;\"></td></tr></table></td></tr><tr><td bgcolor=\"#012A36\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\"><tr><td bgcolor=\"#ffffff\" align=\"center\" valign=\"top\" style=\"padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;\"><h1 style=\"font-size: 26px; font-weight: 400; margin: 2;\">Welcome, <strong>" + userName + "</strong></h1> <img src=\" https://img.icons8.com/bubbles/344/checked.png\" width=\"125\" height=\"120\" style=\"display: block; border: 0px;\" /></td></tr></table></td></tr><tr><td bgcolor=\"#f4f4f4\" align=\"center\" style=\"padding: 0px 10px 0px 10px;\"><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 600px;\"><tr><td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 20px 30px 40px 30px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;\"><p style=\"margin: 0;\">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p></td></tr><tr><td bgcolor=\"#ffffff\" align=\"left\"><table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td bgcolor=\"#ffffff\" align=\"center\" style=\"padding: 20px 30px 60px 30px;\"><table border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td align=\"center\" style=\"border-radius: 3px;\" bgcolor=\"#012A36\"><a href=\"" + linkConfirmation + "\" target=\"_blank\" style=\"font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #012A36; display: inline-block;\">Confirm Account</a></td></tr></table></td></tr></table></td></tr><tr><td bgcolor=\"#ffffff\" align=\"left\" style=\"padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-size: 18px; font-weight: 400; line-height: 25px;\"><p style=\"margin: 0;\">Cheers,<br>My<strong>Shop</strong></p></td></tr></table></td></tr></table></body></html>";
}
function sendEmailConfirmation(userEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var user, confirmationCode, linkConfirmation, err_1, emailRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, userService_1.getUser(userEmail)];
                case 1:
                    user = _a.sent();
                    if (user.emailConfirmedAt) {
                        throw new fail_1.Fail(fail_1.ERRORS.AUTH.EMAIL_VALIDED);
                    }
                    confirmationCode = utils_1.uuid();
                    linkConfirmation = labels_1.CONST.APP_HOST + labels_1.CONST.ROUTE.CONFIRM_EMAIL + '/' + confirmationCode;
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, authorizationResource_1.saveAuthorization({
                            userId: user.id,
                            confirmation: confirmationCode,
                            createdAt: new Date(),
                            email: user.email
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    throw new fail_1.Fail(fail_1.ERRORS.AUTH.CONFIRMATION_CODE_FAIL, err_1.message);
                case 5:
                    emailRequest = __assign(__assign({}, user), { linkConfirmation: linkConfirmation });
                    queue.push(emailRequest);
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendEmailConfirmation = sendEmailConfirmation;
function confirmEmail(token) {
    return __awaiter(this, void 0, void 0, function () {
        var auth, user, updateUserRequest;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authorizationResource_1.getAuthorization(token)];
                case 1:
                    auth = _a.sent();
                    if (!auth) {
                        throw new fail_1.Fail(fail_1.ERRORS.AUTH.CONFIRM_EMAI_NO_TOKEN);
                    }
                    return [4 /*yield*/, userService_1.getUser(auth.email)];
                case 2:
                    user = _a.sent();
                    updateUserRequest = __assign(__assign({}, user), { emailConfirmedAt: new Date() });
                    return [4 /*yield*/, userService_1.updateUser(updateUserRequest)];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
exports.confirmEmail = confirmEmail;
