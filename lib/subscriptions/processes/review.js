var Emitter = require('events').Emitter;
var util = require('util');

var ReviewProcess = function(args){
    this.ensureAppValid = function(app){
        if(app.isValid(){
            this.emit("validated", app);
          }else{
              //TODO: Would be nice to know what is wrong
              this.emit("invalid", app.validationMessage());
          }
    };
    
    //find the next mission
    this.findNextMission = function(){
        app.mission = {
            commander : null,
            pilot : null,
            MAVPilot : null,
             passengers : []
        };
        this.emit("mission-selected", app)
    };

    //make sure role slected is availible
    this.findNextMission = function(){
        //TODO: What roles are available, ask client
        this.emit("role-available", app);
    };
    //make sure height/weight/age is right for role
    //accept or deny app

    //TIMESTAMP 3:11 vid 2.5

};

util.inherits(ReviewProcess, Emitter);
module.exports =ReviewProcess;