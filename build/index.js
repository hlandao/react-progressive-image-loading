"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var isCached = function (image) { return image.complete || image.width + image.height > 0; };
var ProgressiveImage = (function (_super) {
    __extends(ProgressiveImage, _super);
    function ProgressiveImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressiveImage.prototype.componentWillMount = function () {
        var _this = this;
        var _a = this.props, src = _a.src, preview = _a.preview;
        var initialBlur = this.props.initialBlur;
        this.setState({ src: "", blur: initialBlur });
        this.fetch(preview)
            .then(function (result) { return _this.setState({ src: result.src, blur: initialBlur }); })
            .then(function () { return _this.fetch(src); })
            .then(function (result) { return _this.setState({ src: result.src, isCached: result.isCached, blur: 0 }); });
    };
    ProgressiveImage.prototype.render = function () {
        var src = this.state.src;
        var render = this.props.render;
        return render(src, this.getStyle());
    };
    ProgressiveImage.prototype.fetch = function (src) {
        return new Promise(function (resolve) {
            var image = new Image();
            image.src = src;
            if (isCached(image)) {
                resolve({ src: src, isCached: true });
            }
            else {
                image.addEventListener("load", function () { return resolve({ src: src }); }, false);
            }
        });
    };
    ProgressiveImage.prototype.getStyle = function () {
        var _a = this.props, transitionTime = _a.transitionTime, timingFunction = _a.timingFunction;
        var _b = this.state, blur = _b.blur, isCached = _b.isCached;
        if (isCached) {
            return {};
        }
        else {
            return {
                filter: "blur(" + blur + "px)",
                transition: "filter " + transitionTime + "ms " + timingFunction
            };
        }
    };
    ProgressiveImage.defaultProps = {
        transitionTime: 500,
        timingFunction: "ease",
        initialBlur: 10
    };
    return ProgressiveImage;
}(React.Component));
exports.ProgressiveImage = ProgressiveImage;
//# sourceMappingURL=index.js.map