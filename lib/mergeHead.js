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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var getOriginalHeadObject = function (that, originalHead) {
    if (typeof originalHead === 'function') {
        return originalHead.call(that);
    }
    return originalHead || null;
};
function hashCode(s) {
    /**
     * Using the java hashCode function
     * https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
     * https://www.thejavaprogrammer.com/what-is-hashcode-in-java/
     */
    var hash = 0;
    if (s.length === 0) {
        return hash;
    }
    for (var i = 0; i < s.length; i += 1) {
        var char = s.charCodeAt(i);
        hash = (hash << 5) - hash + char; // eslint-disable-line no-bitwise
        hash &= hash; // eslint-disable-line no-bitwise
    }
    return hash;
}
var getJsonLdHeadObject = function (that, jsonLdFunc, space) {
    var _a;
    var jsonLd = jsonLdFunc.call(that);
    if (jsonLd === null) {
        return null;
    }
    var minifiedString = JSON.stringify(jsonLd, null, '');
    var hid = "nuxt-jsonld-" + hashCode(minifiedString).toString(16);
    var stringifiedJson = JSON.stringify(jsonLd, null, space);
    var innerHTML = space === 0 ? stringifiedJson : "\n" + stringifiedJson + "\n";
    return {
        script: [
            {
                hid: hid,
                type: 'application/ld+json',
                innerHTML: innerHTML,
            },
        ],
        __dangerouslyDisableSanitizersByTagID: (_a = {},
            _a[hid] = ['innerHTML'],
            _a),
    };
};
var isEmptyObject = function (obj) { return obj === undefined || obj === null || Object.keys(obj).length === 0; };
function mergeHead(originalHead, _a) {
    var space = _a.space;
    var head = getOriginalHeadObject(this, originalHead);
    var jsonLd = getJsonLdHeadObject(this, this.$options.jsonld, space);
    if (isEmptyObject(head) && jsonLd === null) {
        return {};
    }
    if (isEmptyObject(head)) {
        return jsonLd;
    }
    if (jsonLd === null) {
        return head;
    }
    return __assign(__assign({}, head), { script: __spreadArrays((head.script || []), jsonLd.script), __dangerouslyDisableSanitizersByTagID: __assign(__assign({}, (head.__dangerouslyDisableSanitizersByTagID || {})), jsonLd.__dangerouslyDisableSanitizersByTagID) });
}
exports.default = mergeHead;
