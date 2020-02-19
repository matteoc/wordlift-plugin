!function(n){var e={};function t(F){if(e[F])return e[F].exports;var i=e[F]={i:F,l:!1,exports:{}};return n[F].call(i.exports,i,i.exports,t),i.l=!0,i.exports}t.m=n,t.c=e,t.d=function(n,e,F){t.o(n,e)||Object.defineProperty(n,e,{enumerable:!0,get:F})},t.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.t=function(n,e){if(1&e&&(n=t(n)),8&e)return n;if(4&e&&"object"==typeof n&&n&&n.__esModule)return n;var F=Object.create(null);if(t.r(F),Object.defineProperty(F,"default",{enumerable:!0,value:n}),2&e&&"string"!=typeof n)for(var i in n)t.d(F,i,function(e){return n[e]}.bind(null,i));return F},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,e){return Object.prototype.hasOwnProperty.call(n,e)},t.p="",t(t.s=147)}({147:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);\n\n\n\n(function (wp) {\n  const AddFaqButton = function (props) {\n    return wp.element.createElement(wp.editor.RichTextToolbarButton, {\n      title: "Add Question / Answer",\n      icon: "plus-alt",\n      onClick: function () {\n        const {\n          text,\n          start,\n          end\n        } = props.value;\n        const selectedText = text.slice(start, end);\n        Object(backbone__WEBPACK_IMPORTED_MODULE_0__["trigger"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__[/* FAQ_EVENT_HANDLER_SELECTION_CHANGED */ "a"], selectedText);\n      }\n    });\n  };\n\n  wp.richText.registerFormatType("faq-gutenberg-plugin/faq-plugin", {\n    title: "Add Question/Answer",\n    tagName: "faq-gutenberg",\n    className: null,\n    edit: AddFaqButton\n  });\n})(window.wp);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL2d1dGVuYmVyZy9ndXRlbmJlcmctZmFxLXBsdWdpbi5qcz8wOWU1Il0sIm5hbWVzIjpbIndwIiwiQWRkRmFxQnV0dG9uIiwicHJvcHMiLCJlbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImVkaXRvciIsIlJpY2hUZXh0VG9vbGJhckJ1dHRvbiIsInRpdGxlIiwiaWNvbiIsIm9uQ2xpY2siLCJ0ZXh0Iiwic3RhcnQiLCJlbmQiLCJ2YWx1ZSIsInNlbGVjdGVkVGV4dCIsInNsaWNlIiwidHJpZ2dlciIsIkZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VEIiwicmljaFRleHQiLCJyZWdpc3RlckZvcm1hdFR5cGUiLCJ0YWdOYW1lIiwiY2xhc3NOYW1lIiwiZWRpdCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBOztBQUVBLENBQUMsVUFBU0EsRUFBVCxFQUFhO0FBQ1osUUFBTUMsWUFBWSxHQUFHLFVBQVNDLEtBQVQsRUFBZ0I7QUFDbkMsV0FBT0YsRUFBRSxDQUFDRyxPQUFILENBQVdDLGFBQVgsQ0FBeUJKLEVBQUUsQ0FBQ0ssTUFBSCxDQUFVQyxxQkFBbkMsRUFBMEQ7QUFDL0RDLFdBQUssRUFBRSx1QkFEd0Q7QUFFL0RDLFVBQUksRUFBRSxVQUZ5RDtBQUcvREMsYUFBTyxFQUFFLFlBQVc7QUFDbEIsY0FBTTtBQUFFQyxjQUFGO0FBQVFDLGVBQVI7QUFBZUM7QUFBZixZQUF1QlYsS0FBSyxDQUFDVyxLQUFuQztBQUNBLGNBQU1DLFlBQVksR0FBR0osSUFBSSxDQUFDSyxLQUFMLENBQVdKLEtBQVgsRUFBa0JDLEdBQWxCLENBQXJCO0FBQ0FJLGdFQUFPLENBQUNDLHlHQUFELEVBQXNDSCxZQUF0QyxDQUFQO0FBQ0Q7QUFQOEQsS0FBMUQsQ0FBUDtBQVNELEdBVkQ7O0FBV0FkLElBQUUsQ0FBQ2tCLFFBQUgsQ0FBWUMsa0JBQVosQ0FBK0IsaUNBQS9CLEVBQWtFO0FBQ2hFWixTQUFLLEVBQUUscUJBRHlEO0FBRWhFYSxXQUFPLEVBQUUsZUFGdUQ7QUFHaEVDLGFBQVMsRUFBRSxJQUhxRDtBQUloRUMsUUFBSSxFQUFFckI7QUFKMEQsR0FBbEU7QUFNRCxDQWxCRCxFQWtCR3NCLE1BQU0sQ0FBQ3ZCLEVBbEJWIiwiZmlsZSI6IjE0Ny5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7dHJpZ2dlcn0gZnJvbSBcImJhY2tib25lXCI7XG5pbXBvcnQge0ZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VEfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2ZhcS1ob29rLWNvbnN0YW50c1wiO1xuXG4oZnVuY3Rpb24od3ApIHtcbiAgY29uc3QgQWRkRmFxQnV0dG9uID0gZnVuY3Rpb24ocHJvcHMpIHtcbiAgICByZXR1cm4gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KHdwLmVkaXRvci5SaWNoVGV4dFRvb2xiYXJCdXR0b24sIHtcbiAgICAgIHRpdGxlOiBcIkFkZCBRdWVzdGlvbiAvIEFuc3dlclwiLFxuICAgICAgaWNvbjogXCJwbHVzLWFsdFwiLFxuICAgICAgb25DbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IHsgdGV4dCwgc3RhcnQsIGVuZCB9ID0gcHJvcHMudmFsdWU7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkVGV4dCA9IHRleHQuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gICAgICAgIHRyaWdnZXIoRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQsIHNlbGVjdGVkVGV4dCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG4gIHdwLnJpY2hUZXh0LnJlZ2lzdGVyRm9ybWF0VHlwZShcImZhcS1ndXRlbmJlcmctcGx1Z2luL2ZhcS1wbHVnaW5cIiwge1xuICAgIHRpdGxlOiBcIkFkZCBRdWVzdGlvbi9BbnN3ZXJcIixcbiAgICB0YWdOYW1lOiBcImZhcS1ndXRlbmJlcmdcIixcbiAgICBjbGFzc05hbWU6IG51bGwsXG4gICAgZWRpdDogQWRkRmFxQnV0dG9uXG4gIH0pO1xufSkod2luZG93LndwKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///147\n')},23:function(module,exports){eval("module.exports = Backbone;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCYWNrYm9uZVwiPzViYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMjMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///23\n")},29:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* unused harmony export FAQ_REQUEST_ADD_NEW_QUESTION */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FAQ_EVENT_HANDLER_SELECTION_CHANGED; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return FAQ_ITEMS_CHANGED; });\n/**\n * Constants for the FAQ hooks.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Event name when the text selection changed in any of text editor, emitted\n * from the hooks.\n * @type {string}\n */\nconst FAQ_REQUEST_ADD_NEW_QUESTION = "FAQ_REQUEST_ADD_NEW_QUESTION";\n/**\n * Event emitted by hook when the text selection is changed.\n * @type {string}\n */\n\nconst FAQ_EVENT_HANDLER_SELECTION_CHANGED = "FAQ_EVENT_HANDLER_SELECTION_CHANGED";\n/**\n * Event emitted by the store when the faq items are changed\n * @type {string}\n */\n\nconst FAQ_ITEMS_CHANGED = "FAQ_ITEMS_CHANGED";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2NvbnN0YW50cy9mYXEtaG9vay1jb25zdGFudHMuanM/MmQ5OCJdLCJuYW1lcyI6WyJGQVFfUkVRVUVTVF9BRERfTkVXX1FVRVNUSU9OIiwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQiLCJGQVFfSVRFTVNfQ0hBTkdFRCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFPQTs7Ozs7QUFLTyxNQUFNQSw0QkFBNEIsR0FBRyw4QkFBckM7QUFFUDs7Ozs7QUFJTyxNQUFNQyxtQ0FBbUMsR0FBRyxxQ0FBNUM7QUFFUDs7Ozs7QUFJTyxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUIiLCJmaWxlIjoiMjkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnN0YW50cyBmb3IgdGhlIEZBUSBob29rcy5cbiAqXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIEV2ZW50IG5hbWUgd2hlbiB0aGUgdGV4dCBzZWxlY3Rpb24gY2hhbmdlZCBpbiBhbnkgb2YgdGV4dCBlZGl0b3IsIGVtaXR0ZWRcbiAqIGZyb20gdGhlIGhvb2tzLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9SRVFVRVNUX0FERF9ORVdfUVVFU1RJT04gPSBcIkZBUV9SRVFVRVNUX0FERF9ORVdfUVVFU1RJT05cIjtcblxuLyoqXG4gKiBFdmVudCBlbWl0dGVkIGJ5IGhvb2sgd2hlbiB0aGUgdGV4dCBzZWxlY3Rpb24gaXMgY2hhbmdlZC5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCA9IFwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRURcIjtcblxuLyoqXG4gKiBFdmVudCBlbWl0dGVkIGJ5IHRoZSBzdG9yZSB3aGVuIHRoZSBmYXEgaXRlbXMgYXJlIGNoYW5nZWRcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBGQVFfSVRFTVNfQ0hBTkdFRCA9IFwiRkFRX0lURU1TX0NIQU5HRURcIjtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///29\n')}});