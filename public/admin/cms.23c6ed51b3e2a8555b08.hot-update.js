webpackHotUpdate("cms",{

/***/ "./node_modules/core-js/modules/_string-html.js":
false,

/***/ "./node_modules/core-js/modules/es6.string.link.js":
false,

/***/ "./src/components/BlogPostTemplate.js":
/*!********************************************!*\
  !*** ./src/components/BlogPostTemplate.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gatsby */ "./.cache/gatsby-browser-entry.js");
/* harmony import */ var _utils_string2html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/string2html */ "./src/utils/string2html.js");
/* harmony import */ var _utils_camelCase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/camelCase */ "./src/utils/camelCase.js");
/* harmony import */ var _utils_readingTime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/readingTime */ "./src/utils/readingTime.js");
var _jsxFileName = "/Users/kevinpennekamp/Projects/kevtiq/kevtiq.co/src/components/BlogPostTemplate.js";

(function () {
  var enterModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).enterModule;
  enterModule && enterModule(module);
})();







var BlogPostTemplate = function BlogPostTemplate(_ref) {
  var meta = _ref.meta,
      children = _ref.children;
  var content = typeof children === 'string' ? Object(_utils_string2html__WEBPACK_IMPORTED_MODULE_2__["string2html"])(children) : children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("main", {
    className: "post",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("article", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "post__header",
    role: "contentinfo",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  }, meta.title), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("time", {
    dateTime: meta.date,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, meta.date), " \u2022 " + Object(_utils_readingTime__WEBPACK_IMPORTED_MODULE_4__["formatReadingTime"])(meta.words)), meta.tags && meta.tags.length > 0 && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "post__tags",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  }, meta.tags.map(function (t, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby__WEBPACK_IMPORTED_MODULE_1__["Link"], {
      key: i,
      to: "/tags/" + Object(_utils_camelCase__WEBPACK_IMPORTED_MODULE_3__["default"])(t),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, t.toLowerCase());
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
    className: "card post__body",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 31
    },
    __self: this
  }, content)));
};

var _default = BlogPostTemplate;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).default;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(BlogPostTemplate, "BlogPostTemplate", "/Users/kevinpennekamp/Projects/kevtiq/kevtiq.co/src/components/BlogPostTemplate.js");
  reactHotLoader.register(_default, "default", "/Users/kevinpennekamp/Projects/kevtiq/kevtiq.co/src/components/BlogPostTemplate.js");
})();

;

(function () {
  var leaveModule = (typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal : __webpack_require__(/*! react-hot-loader */ "./node_modules/react-hot-loader/index.js")).leaveModule;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=cms.23c6ed51b3e2a8555b08.hot-update.js.map