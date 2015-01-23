var addEvent = require("add-event-listener");

var defaultCanvasValue = {
    id : 'c',
    width : window.innerWidth,
    high  : window.innerHeight
};

var CanvasBako = function(_vars){
    var vars = _vars || defaultCanvasValue;

    if(vars.id)     this.canvas = document.getElementById(vars.id);
    else            this.canvas = document.getElementById(defaultCanvasValue.id);

    if(vars.width)  this.canvas.width  = vars.width;
    else            this.canvas.width  = defaultCanvasValue.width;

    if(vars.height) this.canvas.height = vars.height;
    else            this.canvas.height = defaultCanvasValue.height;


    this._renderHandler = function(){
        
    };

};



module.exports = CanvasBako;