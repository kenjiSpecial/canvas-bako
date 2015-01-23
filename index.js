var addEvent = require("add-event-listener");

var CanvasBako = function(loop){
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width  = this.width;
    this.canvas.height = this.height;

    this.prev = Date.now();

    if(typeof loop === "function"){
        this.onLoop = loop.bind(this);
    } else {
        this.onLoop = function(ctx, dt){
            console.log("nothing rendered");
        }
    }

    this.renderOnce = function(){
        var now, dt;

        now = Date.now();
        dt = (now - this.prev) / 1000;

        this.onLoop(this.ctx, dt);

        this.prev = now;
    };


    this._renderHanlder = function(){
        this.renderOnce();

        requestAnimationFrame(this._renderHanlder);
    }.bind(this);

};

CanvasBako.prototype.start = function(){

    this.lastFrame = requestAnimationFrame(this._renderHanlder);
};

CanvasBako.prototype.stop = function(){
    cancelRequestAnimationFrame(this.lastFrame);
}





module.exports = CanvasBako;