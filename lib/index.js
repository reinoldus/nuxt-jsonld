"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jsonld = void 0;
var createMixin_1 = __importDefault(require("./createMixin"));
var decorator_1 = __importDefault(require("./decorator"));
exports.Jsonld = decorator_1.default;
exports.default = {
    install: function (Vue, options) {
        Vue.mixin(createMixin_1.default(options));
    },
};