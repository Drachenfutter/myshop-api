"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
var typeorm_1 = require("typeorm");
var Authorization = /** @class */ (function () {
    function Authorization() {
    }
    __decorate([
        typeorm_1.PrimaryColumn({ length: 512, unique: true }),
        __metadata("design:type", String)
    ], Authorization.prototype, "confirmation", void 0);
    __decorate([
        typeorm_1.Column({ length: 32 }),
        __metadata("design:type", String)
    ], Authorization.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column({ length: 100 }),
        __metadata("design:type", String)
    ], Authorization.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Authorization.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Date)
    ], Authorization.prototype, "confirmedAt", void 0);
    Authorization = __decorate([
        typeorm_1.Entity()
    ], Authorization);
    return Authorization;
}());
exports.Authorization = Authorization;
