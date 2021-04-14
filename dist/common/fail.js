"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatError = exports.Fail = exports.ERRORS = void 0;
var log_1 = require("./log");
exports.ERRORS = {
    NEW_USER: {
        NAME_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 100,
            message: 'Nome de usuário não informado'
        },
        EMAIL_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 101,
            message: 'Email não informado.'
        },
        EMAIL_INVALID: {
            statusCode: 400,
            errorCode: 102,
            message: 'Email inválido.'
        },
        EMAIL_USED_ALREADY: {
            statusCode: 400,
            errorCode: 103,
            message: 'Email inválido.'
        },
        PASSWORD_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 104,
            message: 'Informe uma senha para acesso'
        },
    },
    LOGIN: {
        LOGIN_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 201,
            message: 'Login não informado. Verifique os parâmetros e tente novamente'
        },
        PASSWORD_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 202,
            message: 'Senha não informada. Verifique os parâmetros e tente novamente'
        },
        USER_NOT_FOUND: {
            statusCode: 400,
            errorCode: 203,
            message: 'Credenciais inválidas. Verifique os parâmetros e tente novamente'
        },
        PASSWORD_INVALID: {
            statusCode: 400,
            errorCode: 204,
            message: 'Credenciais inválidas. Verifique os parâmetros e tente novamente'
        }
    },
    NEW_STORE: {
        NAME_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 301,
            message: 'Nome da loja não informado'
        },
        URL_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 302,
            message: 'Identificador da loja não informado'
        },
        USER_NOT_INFORMED: {
            statusCode: 400,
            errorCode: 303,
            message: 'Falha ao recuperar usuário responsável pela loja'
        },
    },
    PRODUCT: {
        NO_NAME: {
            statusCode: 400,
            errorCode: 401,
            message: 'Nome do produto não informado.'
        },
        NO_PRICE: {
            statusCode: 400,
            errorCode: 402,
            message: 'Valor do produto não informado.'
        },
        NO_STORE_ID: {
            statusCode: 400,
            errorCode: 403,
            message: 'Loja não informada.'
        },
        STORE_ID_NOT_ALLOWED: {
            statusCode: 400,
            errorCode: 404,
            message: 'Ação não permitida para este usuário.'
        },
    },
    AUTH: {
        INVALID_ACCESS_TOKEN: {
            statusCode: 400,
            errorCode: 10,
            message: 'A requisição não pode ser processada. Autenticação expirada ou inválida.'
        },
        NO_ACCESS_TOKEN: {
            statusCode: 400,
            errorCode: 11,
            message: 'A requisição não pode ser processada. Verifique os parâmetros e tente novamente.'
        },
        VERIFYING_JWT: {
            statusCode: 500,
            errorCode: 10,
            message: 'Houve um erro interno na aplicação. Tente mais tarde.'
        },
        EMAIL_VALIDED: {
            statusCode: 400,
            errorCode: 12,
            message: 'Email already validated.'
        },
        CONFIRMATION_CODE_FAIL: {
            statusCode: 500,
            errorCode: 11,
            message: 'Internal error'
        },
        CONFIRM_EMAI_NO_TOKEN: {
            statusCode: 400,
            errorCode: 13,
            message: 'Request not found'
        }
    },
    INTERNAL: {
        BCRIPTY: {
            statusCode: 500,
            errorCode: 100,
            message: 'Erro interno ao validar credenciais'
        }
    }
};
var Fail = /** @class */ (function (_super) {
    __extends(Fail, _super);
    function Fail(e, detail) {
        var _this = _super.call(this, e.message) || this;
        _this.statusCode = e.statusCode;
        _this.errorCode = e.errorCode;
        _this.message = e.message;
        detail ? _this.detail = detail : '';
        return _this;
    }
    Fail.prototype.getResponse = function () {
        var error = {
            code: this.errorCode,
            message: this.message
        };
        this.detail ? error.detail = this.detail : '';
        return { error: error };
    };
    return Fail;
}(Error));
exports.Fail = Fail;
function FormatError(err) {
    var restError = {
        message: err.message,
        statusCode: 500,
        errorCode: 999,
        detail: JSON.stringify(err)
    };
    err.errorCode ? restError.errorCode = err.errorCode : '';
    err.statusCode ? restError.statusCode = err.statusCode : '';
    log_1.logger.error("[FAIL] " + restError.statusCode + " - " + restError.errorCode + " - " + restError.message + " - " + restError.detail);
    return restError;
}
exports.FormatError = FormatError;
