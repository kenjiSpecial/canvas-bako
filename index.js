var addEvent = require("add-event-listener");

var CanvasBako = function (loop) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.body.appendChild(this.canvas);

    this.prev = Date.now();

    if (typeof loop === "function") {
        this.onLoop = loop.bind(this);
    } else {
        this.onLoop = function (ctx, dt) {
            console.log("nothing rendered");
        }
    }

    this.renderOnce = function () {
        var now, dt;

        now = Date.now();
        dt = (now - this.prev) / 1000;

        this.onLoop(this.ctx, dt);

        this.prev = now;
    };


    this._renderHanlder = function () {
        this.renderOnce();

        this.lastFrame = requestAnimationFrame(this._renderHanlder);
    }.bind(this);


    window.addEventListener("keydown", function (e) {
        // escape keycode is 27.
        if (e.keyCode == 27 && this._isRunning) {
            this.stop();
        }
    }.bind(this), false);

    addEvent(window, "resize", this.resize.bind(this), false);
};

CanvasBako.prototype.start = function () {
    this._isRunning = true;
    this.lastFrame = requestAnimationFrame(this._renderHanlder);
};

CanvasBako.prototype.stop = function () {
    this._isRunning = false;
    cancelAnimationFrame(this.lastFrame);
}

CanvasBako.prototype.resize = function() {
    var canvas = this.canvas;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width;
    canvas.height = this.height;

};


module.exports = CanvasBako;
