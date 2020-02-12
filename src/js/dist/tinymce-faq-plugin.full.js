!function(n){var t={};function e(i){if(t[i])return t[i].exports;var Q=t[i]={i:i,l:!1,exports:{}};return n[i].call(Q.exports,Q,Q.exports,e),Q.l=!0,Q.exports}e.m=n,e.c=t,e.d=function(n,t,i){e.o(n,t)||Object.defineProperty(n,t,{enumerable:!0,get:i})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,t){if(1&t&&(n=e(n)),8&t)return n;if(4&t&&"object"==typeof n&&n&&n.__esModule)return n;var i=Object.create(null);if(e.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:n}),2&t&&"string"!=typeof n)for(var Q in n)e.d(i,Q,function(t){return n[t]}.bind(null,Q));return i},e.n=function(n){var t=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(t,"a",t),t},e.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},e.p="",e(e.s=146)}({141:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58);\n/* harmony import */ var backbone__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(backbone__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(147);\n/* harmony import */ var _validators_faq_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(148);\n/**\n * TinyMceToolbarHandler handles the toolbar button.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Internal dependencies.\n */\n\n\n\nconst TINYMCE_TOOLBAR_BUTTON_NAME = "wl-faq-toolbar-button";\n\nclass TinymceToolbarHandler {\n  /**\n   * Construct the TinymceToolbarHandler\n   * @param editor {tinymce.Editor} instance.\n   */\n  constructor(editor) {\n    this.editor = editor;\n  }\n  /**\n   * Sets the button text based on the text selected by user.\n   * @param selectedText The text selected by user.\n   * @param button Button present in toolbar.\n   * @param container This container holds the button.\n   */\n\n\n  setButtonTextBasedOnSelectedText(selectedText, button, container) {\n    if (_validators_faq_validator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].isQuestion(selectedText)) {\n      button.innerText = "Add Question";\n      container.setAttribute("aria-label", "Add Question");\n    } else {\n      button.innerText = "Add Answer";\n      container.setAttribute("aria-label", "Add Answer");\n    }\n  }\n  /**\n   * When there is no selection disable the button, determine\n   * if it is question or answer and change the button text.\n   */\n\n\n  changeButtonStateOnSelectedText() {\n    const editor = this.editor;\n    const selectedText = editor.selection.getContent({\n      format: "text"\n    });\n    const container = document.getElementById(TINYMCE_TOOLBAR_BUTTON_NAME);\n    const button = container.getElementsByTagName("button")[0];\n\n    if (selectedText.length > 0) {\n      container.classList.remove("mce-disabled");\n      button.disabled = false;\n      this.setButtonTextBasedOnSelectedText(selectedText, button, container);\n    } else {\n      container.classList.add("mce-disabled");\n      button.disabled = true;\n    }\n  }\n\n  changeToolBarButtonStateBasedOnTextSelected() {\n    const editor = this.editor;\n    editor.on("NodeChange", e => {\n      this.changeButtonStateOnSelectedText();\n    });\n  }\n\n  addButtonToToolBar() {\n    const editor = this.editor;\n    editor.addButton(TINYMCE_TOOLBAR_BUTTON_NAME, {\n      text: "Add Question or Answer",\n      id: TINYMCE_TOOLBAR_BUTTON_NAME,\n      onclick: function () {\n        Object(backbone__WEBPACK_IMPORTED_MODULE_0__["trigger"])(_constants_faq_hook_constants__WEBPACK_IMPORTED_MODULE_1__[/* FAQ_EVENT_HANDLER_SELECTION_CHANGED */ "a"], editor.selection.getContent({\n          format: "text"\n        }));\n      }\n    });\n    this.changeToolBarButtonStateBasedOnTextSelected();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["a"] = (TinymceToolbarHandler);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS10b29sYmFyLWhhbmRsZXIuanM/M2JiMiJdLCJuYW1lcyI6WyJUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUiLCJUaW55bWNlVG9vbGJhckhhbmRsZXIiLCJjb25zdHJ1Y3RvciIsImVkaXRvciIsInNldEJ1dHRvblRleHRCYXNlZE9uU2VsZWN0ZWRUZXh0Iiwic2VsZWN0ZWRUZXh0IiwiYnV0dG9uIiwiY29udGFpbmVyIiwiRmFxVmFsaWRhdG9yIiwiaXNRdWVzdGlvbiIsImlubmVyVGV4dCIsInNldEF0dHJpYnV0ZSIsImNoYW5nZUJ1dHRvblN0YXRlT25TZWxlY3RlZFRleHQiLCJzZWxlY3Rpb24iLCJnZXRDb250ZW50IiwiZm9ybWF0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiZGlzYWJsZWQiLCJhZGQiLCJjaGFuZ2VUb29sQmFyQnV0dG9uU3RhdGVCYXNlZE9uVGV4dFNlbGVjdGVkIiwib24iLCJlIiwiYWRkQnV0dG9uVG9Ub29sQmFyIiwiYWRkQnV0dG9uIiwidGV4dCIsImlkIiwib25jbGljayIsInRyaWdnZXIiLCJGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7Ozs7O0FBS0E7OztBQUdBO0FBQ0E7QUFDQTtBQUVBLE1BQU1BLDJCQUEyQixHQUFHLHVCQUFwQzs7QUFFQSxNQUFNQyxxQkFBTixDQUE0QjtBQUMxQjs7OztBQUlBQyxhQUFXLENBQUNDLE1BQUQsRUFBUztBQUNsQixTQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDRDtBQUVEOzs7Ozs7OztBQU1BQyxrQ0FBZ0MsQ0FBQ0MsWUFBRCxFQUFlQyxNQUFmLEVBQXVCQyxTQUF2QixFQUFrQztBQUNoRSxRQUFJQyx5RUFBWSxDQUFDQyxVQUFiLENBQXdCSixZQUF4QixDQUFKLEVBQTJDO0FBQ3pDQyxZQUFNLENBQUNJLFNBQVAsR0FBbUIsY0FBbkI7QUFDQUgsZUFBUyxDQUFDSSxZQUFWLENBQXVCLFlBQXZCLEVBQXFDLGNBQXJDO0FBQ0QsS0FIRCxNQUdPO0FBQ0xMLFlBQU0sQ0FBQ0ksU0FBUCxHQUFtQixZQUFuQjtBQUNBSCxlQUFTLENBQUNJLFlBQVYsQ0FBdUIsWUFBdkIsRUFBcUMsWUFBckM7QUFDRDtBQUNGO0FBRUQ7Ozs7OztBQUlBQyxpQ0FBK0IsR0FBRztBQUNoQyxVQUFNVCxNQUFNLEdBQUcsS0FBS0EsTUFBcEI7QUFDQSxVQUFNRSxZQUFZLEdBQUdGLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQkMsVUFBakIsQ0FBNEI7QUFBRUMsWUFBTSxFQUFFO0FBQVYsS0FBNUIsQ0FBckI7QUFDQSxVQUFNUixTQUFTLEdBQUdTLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QmpCLDJCQUF4QixDQUFsQjtBQUNBLFVBQU1NLE1BQU0sR0FBR0MsU0FBUyxDQUFDVyxvQkFBVixDQUErQixRQUEvQixFQUF5QyxDQUF6QyxDQUFmOztBQUNBLFFBQUliLFlBQVksQ0FBQ2MsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUMzQlosZUFBUyxDQUFDYSxTQUFWLENBQW9CQyxNQUFwQixDQUEyQixjQUEzQjtBQUNBZixZQUFNLENBQUNnQixRQUFQLEdBQWtCLEtBQWxCO0FBQ0EsV0FBS2xCLGdDQUFMLENBQXNDQyxZQUF0QyxFQUFvREMsTUFBcEQsRUFBNERDLFNBQTVEO0FBQ0QsS0FKRCxNQUlPO0FBQ0xBLGVBQVMsQ0FBQ2EsU0FBVixDQUFvQkcsR0FBcEIsQ0FBd0IsY0FBeEI7QUFDQWpCLFlBQU0sQ0FBQ2dCLFFBQVAsR0FBa0IsSUFBbEI7QUFDRDtBQUNGOztBQUVERSw2Q0FBMkMsR0FBRztBQUM1QyxVQUFNckIsTUFBTSxHQUFHLEtBQUtBLE1BQXBCO0FBQ0FBLFVBQU0sQ0FBQ3NCLEVBQVAsQ0FBVSxZQUFWLEVBQXdCQyxDQUFDLElBQUk7QUFDM0IsV0FBS2QsK0JBQUw7QUFDRCxLQUZEO0FBR0Q7O0FBRURlLG9CQUFrQixHQUFHO0FBQ25CLFVBQU14QixNQUFNLEdBQUcsS0FBS0EsTUFBcEI7QUFDQUEsVUFBTSxDQUFDeUIsU0FBUCxDQUFpQjVCLDJCQUFqQixFQUE4QztBQUM1QzZCLFVBQUksRUFBRSx3QkFEc0M7QUFFNUNDLFFBQUUsRUFBRTlCLDJCQUZ3QztBQUc1QytCLGFBQU8sRUFBRSxZQUFXO0FBQ2xCQyxnRUFBTyxDQUFDQyx5R0FBRCxFQUFzQzlCLE1BQU0sQ0FBQ1UsU0FBUCxDQUFpQkMsVUFBakIsQ0FBNEI7QUFBRUMsZ0JBQU0sRUFBRTtBQUFWLFNBQTVCLENBQXRDLENBQVA7QUFDRDtBQUwyQyxLQUE5QztBQU9BLFNBQUtTLDJDQUFMO0FBQ0Q7O0FBN0R5Qjs7QUFnRWJ2Qiw4RUFBZiIsImZpbGUiOiIxNDEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRpbnlNY2VUb29sYmFySGFuZGxlciBoYW5kbGVzIHRoZSB0b29sYmFyIGJ1dHRvbi5cbiAqIEBzaW5jZSAzLjI2LjBcbiAqIEBhdXRob3IgTmF2ZWVuIE11dGh1c2FteSA8bmF2ZWVuQHdvcmRsaWZ0LmlvPlxuICovXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llcy5cbiAqL1xuaW1wb3J0IHsgdHJpZ2dlciB9IGZyb20gXCJiYWNrYm9uZVwiO1xuaW1wb3J0IHsgRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzL2ZhcS1ob29rLWNvbnN0YW50c1wiO1xuaW1wb3J0IEZhcVZhbGlkYXRvciBmcm9tIFwiLi4vdmFsaWRhdG9ycy9mYXEtdmFsaWRhdG9yXCI7XG5cbmNvbnN0IFRJTllNQ0VfVE9PTEJBUl9CVVRUT05fTkFNRSA9IFwid2wtZmFxLXRvb2xiYXItYnV0dG9uXCI7XG5cbmNsYXNzIFRpbnltY2VUb29sYmFySGFuZGxlciB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3QgdGhlIFRpbnltY2VUb29sYmFySGFuZGxlclxuICAgKiBAcGFyYW0gZWRpdG9yIHt0aW55bWNlLkVkaXRvcn0gaW5zdGFuY2UuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBidXR0b24gdGV4dCBiYXNlZCBvbiB0aGUgdGV4dCBzZWxlY3RlZCBieSB1c2VyLlxuICAgKiBAcGFyYW0gc2VsZWN0ZWRUZXh0IFRoZSB0ZXh0IHNlbGVjdGVkIGJ5IHVzZXIuXG4gICAqIEBwYXJhbSBidXR0b24gQnV0dG9uIHByZXNlbnQgaW4gdG9vbGJhci5cbiAgICogQHBhcmFtIGNvbnRhaW5lciBUaGlzIGNvbnRhaW5lciBob2xkcyB0aGUgYnV0dG9uLlxuICAgKi9cbiAgc2V0QnV0dG9uVGV4dEJhc2VkT25TZWxlY3RlZFRleHQoc2VsZWN0ZWRUZXh0LCBidXR0b24sIGNvbnRhaW5lcikge1xuICAgIGlmIChGYXFWYWxpZGF0b3IuaXNRdWVzdGlvbihzZWxlY3RlZFRleHQpKSB7XG4gICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJBZGQgUXVlc3Rpb25cIjtcbiAgICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIFwiQWRkIFF1ZXN0aW9uXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBidXR0b24uaW5uZXJUZXh0ID0gXCJBZGQgQW5zd2VyXCI7XG4gICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBcIkFkZCBBbnN3ZXJcIik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlcmUgaXMgbm8gc2VsZWN0aW9uIGRpc2FibGUgdGhlIGJ1dHRvbiwgZGV0ZXJtaW5lXG4gICAqIGlmIGl0IGlzIHF1ZXN0aW9uIG9yIGFuc3dlciBhbmQgY2hhbmdlIHRoZSBidXR0b24gdGV4dC5cbiAgICovXG4gIGNoYW5nZUJ1dHRvblN0YXRlT25TZWxlY3RlZFRleHQoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRDb250ZW50KHsgZm9ybWF0OiBcInRleHRcIiB9KTtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUpO1xuICAgIGNvbnN0IGJ1dHRvbiA9IGNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXTtcbiAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwibWNlLWRpc2FibGVkXCIpO1xuICAgICAgYnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLnNldEJ1dHRvblRleHRCYXNlZE9uU2VsZWN0ZWRUZXh0KHNlbGVjdGVkVGV4dCwgYnV0dG9uLCBjb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcIm1jZS1kaXNhYmxlZFwiKTtcbiAgICAgIGJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2hhbmdlVG9vbEJhckJ1dHRvblN0YXRlQmFzZWRPblRleHRTZWxlY3RlZCgpIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICBlZGl0b3Iub24oXCJOb2RlQ2hhbmdlXCIsIGUgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2VCdXR0b25TdGF0ZU9uU2VsZWN0ZWRUZXh0KCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRCdXR0b25Ub1Rvb2xCYXIoKSB7XG4gICAgY29uc3QgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgZWRpdG9yLmFkZEJ1dHRvbihUSU5ZTUNFX1RPT0xCQVJfQlVUVE9OX05BTUUsIHtcbiAgICAgIHRleHQ6IFwiQWRkIFF1ZXN0aW9uIG9yIEFuc3dlclwiLFxuICAgICAgaWQ6IFRJTllNQ0VfVE9PTEJBUl9CVVRUT05fTkFNRSxcbiAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0cmlnZ2VyKEZBUV9FVkVOVF9IQU5ETEVSX1NFTEVDVElPTl9DSEFOR0VELCBlZGl0b3Iuc2VsZWN0aW9uLmdldENvbnRlbnQoeyBmb3JtYXQ6IFwidGV4dFwiIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmNoYW5nZVRvb2xCYXJCdXR0b25TdGF0ZUJhc2VkT25UZXh0U2VsZWN0ZWQoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaW55bWNlVG9vbGJhckhhbmRsZXI7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///141\n')},146:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _tinymce_toolbar_handler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(141);\n/**\n * This file is automatically loaded by the tinymce via registering in backend.\n * It emits events captured by the faq event handler class.\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Internal dependencies.\n */\n\nconst FAQ_TINYMCE_PLUGIN_NAME = "wl_faq_tinymce";\nconst tinymce = global["tinymce"];\ntinymce.PluginManager.add(FAQ_TINYMCE_PLUGIN_NAME, function (editor) {\n  const toolBarHandler = new _tinymce_toolbar_handler__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"](editor);\n  toolBarHandler.addButtonToToolBar();\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(23)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3RpbnltY2UvdGlueW1jZS1mYXEtcGx1Z2luLmpzPzQ1YmEiXSwibmFtZXMiOlsiRkFRX1RJTllNQ0VfUExVR0lOX05BTUUiLCJ0aW55bWNlIiwiZ2xvYmFsIiwiUGx1Z2luTWFuYWdlciIsImFkZCIsImVkaXRvciIsInRvb2xCYXJIYW5kbGVyIiwiVGlueW1jZVRvb2xiYXJIYW5kbGVyIiwiYWRkQnV0dG9uVG9Ub29sQmFyIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFPQTs7O0FBR0E7QUFFQSxNQUFNQSx1QkFBdUIsR0FBRyxnQkFBaEM7QUFDQSxNQUFNQyxPQUFPLEdBQUdDLE1BQU0sQ0FBQyxTQUFELENBQXRCO0FBQ0FELE9BQU8sQ0FBQ0UsYUFBUixDQUFzQkMsR0FBdEIsQ0FBMEJKLHVCQUExQixFQUFtRCxVQUFVSyxNQUFWLEVBQWtCO0FBQ25FLFFBQU1DLGNBQWMsR0FBRyxJQUFJQyx3RUFBSixDQUEwQkYsTUFBMUIsQ0FBdkI7QUFDQUMsZ0JBQWMsQ0FBQ0Usa0JBQWY7QUFDRCxDQUhELEUiLCJmaWxlIjoiMTQ2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBUaGlzIGZpbGUgaXMgYXV0b21hdGljYWxseSBsb2FkZWQgYnkgdGhlIHRpbnltY2UgdmlhIHJlZ2lzdGVyaW5nIGluIGJhY2tlbmQuXG4gKiBJdCBlbWl0cyBldmVudHMgY2FwdHVyZWQgYnkgdGhlIGZhcSBldmVudCBoYW5kbGVyIGNsYXNzLlxuICogQHNpbmNlIDMuMjYuMFxuICogQGF1dGhvciBOYXZlZW4gTXV0aHVzYW15IDxuYXZlZW5Ad29yZGxpZnQuaW8+XG4gKi9cblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXMuXG4gKi9cbmltcG9ydCBUaW55bWNlVG9vbGJhckhhbmRsZXIgZnJvbSBcIi4vdGlueW1jZS10b29sYmFyLWhhbmRsZXJcIjtcblxuY29uc3QgRkFRX1RJTllNQ0VfUExVR0lOX05BTUUgPSBcIndsX2ZhcV90aW55bWNlXCI7XG5jb25zdCB0aW55bWNlID0gZ2xvYmFsW1widGlueW1jZVwiXTtcbnRpbnltY2UuUGx1Z2luTWFuYWdlci5hZGQoRkFRX1RJTllNQ0VfUExVR0lOX05BTUUsIGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgY29uc3QgdG9vbEJhckhhbmRsZXIgPSBuZXcgVGlueW1jZVRvb2xiYXJIYW5kbGVyKGVkaXRvcik7XG4gIHRvb2xCYXJIYW5kbGVyLmFkZEJ1dHRvblRvVG9vbEJhcigpO1xufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///146\n')},147:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/* unused harmony export FAQ_REQUEST_ADD_NEW_QUESTION */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FAQ_EVENT_HANDLER_SELECTION_CHANGED; });\n/**\n * Constants for the FAQ hooks.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\n\n/**\n * Event name when the text selection changed in any of text editor, emitted\n * from the hooks.\n * @type {string}\n */\nconst FAQ_REQUEST_ADD_NEW_QUESTION = "FAQ_REQUEST_ADD_NEW_QUESTION";\n/**\n * Event emitted by hook when the text selection is changed.\n * @type {string}\n */\n\nconst FAQ_EVENT_HANDLER_SELECTION_CHANGED = "FAQ_EVENT_HANDLER_SELECTION_CHANGED";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2NvbnN0YW50cy9mYXEtaG9vay1jb25zdGFudHMuanM/MmQ5OCJdLCJuYW1lcyI6WyJGQVFfUkVRVUVTVF9BRERfTkVXX1FVRVNUSU9OIiwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRUQiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTs7Ozs7OztBQU9BOzs7OztBQUtPLE1BQU1BLDRCQUE0QixHQUFHLDhCQUFyQztBQUVQOzs7OztBQUlPLE1BQU1DLG1DQUFtQyxHQUFHLHFDQUE1QyIsImZpbGUiOiIxNDcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnN0YW50cyBmb3IgdGhlIEZBUSBob29rcy5cbiAqXG4gKiBAc2luY2UgMy4yNi4wXG4gKiBAYXV0aG9yIE5hdmVlbiBNdXRodXNhbXkgPG5hdmVlbkB3b3JkbGlmdC5pbz5cbiAqL1xuXG4vKipcbiAqIEV2ZW50IG5hbWUgd2hlbiB0aGUgdGV4dCBzZWxlY3Rpb24gY2hhbmdlZCBpbiBhbnkgb2YgdGV4dCBlZGl0b3IsIGVtaXR0ZWRcbiAqIGZyb20gdGhlIGhvb2tzLlxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IEZBUV9SRVFVRVNUX0FERF9ORVdfUVVFU1RJT04gPSBcIkZBUV9SRVFVRVNUX0FERF9ORVdfUVVFU1RJT05cIjtcblxuLyoqXG4gKiBFdmVudCBlbWl0dGVkIGJ5IGhvb2sgd2hlbiB0aGUgdGV4dCBzZWxlY3Rpb24gaXMgY2hhbmdlZC5cbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBGQVFfRVZFTlRfSEFORExFUl9TRUxFQ1RJT05fQ0hBTkdFRCA9IFwiRkFRX0VWRU5UX0hBTkRMRVJfU0VMRUNUSU9OX0NIQU5HRURcIjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///147\n')},148:function(module,__webpack_exports__,__webpack_require__){"use strict";eval('/**\n * FaqValidator validates the text selected by user, determines if it is question\n * or answer.\n *\n * @since 3.26.0\n * @author Naveen Muthusamy <naveen@wordlift.io>\n */\nclass FaqValidator {\n  static isQuestion(text) {\n    return text.endsWith("?");\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__["a"] = (FaqValidator);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZmFxL2hvb2tzL3ZhbGlkYXRvcnMvZmFxLXZhbGlkYXRvci5qcz9lOTdmIl0sIm5hbWVzIjpbIkZhcVZhbGlkYXRvciIsImlzUXVlc3Rpb24iLCJ0ZXh0IiwiZW5kc1dpdGgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBT0EsTUFBTUEsWUFBTixDQUFtQjtBQUVmLFNBQU9DLFVBQVAsQ0FBa0JDLElBQWxCLEVBQXdCO0FBQ3BCLFdBQU9BLElBQUksQ0FBQ0MsUUFBTCxDQUFjLEdBQWQsQ0FBUDtBQUNIOztBQUpjOztBQVFKSCxxRUFBZiIsImZpbGUiOiIxNDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZhcVZhbGlkYXRvciB2YWxpZGF0ZXMgdGhlIHRleHQgc2VsZWN0ZWQgYnkgdXNlciwgZGV0ZXJtaW5lcyBpZiBpdCBpcyBxdWVzdGlvblxuICogb3IgYW5zd2VyLlxuICpcbiAqIEBzaW5jZSAzLjI2LjBcbiAqIEBhdXRob3IgTmF2ZWVuIE11dGh1c2FteSA8bmF2ZWVuQHdvcmRsaWZ0LmlvPlxuICovXG5jbGFzcyBGYXFWYWxpZGF0b3Ige1xuXG4gICAgc3RhdGljIGlzUXVlc3Rpb24odGV4dCkge1xuICAgICAgICByZXR1cm4gdGV4dC5lbmRzV2l0aChcIj9cIik7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhcVZhbGlkYXRvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///148\n')},23:function(module,exports){eval('var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function("return this")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === "object") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it\'s\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzP2NkMDAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDIiwiZmlsZSI6IjIzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///23\n')},58:function(module,exports){eval("module.exports = Backbone;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJCYWNrYm9uZVwiPzViYzAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiNTguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IEJhY2tib25lOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///58\n")}});