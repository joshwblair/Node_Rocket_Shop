var Emitter = require('events').EventEmitter;
var util = require('util');

var ReviewProcess = function(args){
    var callback;


    this.ensureAppValid = function(app){
        if(app.IsValid()){
            this.emit("validated", app);
        }else{
              //TODO: Would be nice to know what is wrong
            this.emit("invalid", app.validationMessage());
         }
    };
    
    //find the next mission
    this.findNextMission = function(app){
        app.mission = {
            commander : null,
            pilot : null,
            MAVPilot : null,
             passengers : []
        };
        this.emit("mission-selected", app);
    };

    //make sure role slected is availible
    this.roleIsAvailable = function(app){
        //TODO: What roles are available, ask client
        this.emit("role-available", app);
    };

    //make sure height/weight/age is right for role
    this.ensureRoleCompatibility = function(app){
        //TODO: find out more about h/w/a properties
        this.emit("role-compatibility", app);
    };

    //accept app 
    this.acceptApplication = function(app){
        callback(null, {
            success : true,
            message : "Welcome to the Mars Program!"
        });
    };

    //deny app
    this.denyApplication = function(message){
        callback(null, {
            success : false,
            message :message
        })
    };

    this.processApplication = function(app, next){
        callback = next;
        this.emit("application-recieved", app);        
    };

    //event path
    this.on("application-recieved", this.ensureAppValid);
    this.on("validated", this.findNextMission);
    this.on("mission-selected", this.roleIsAvailable);
    this.on("role-available", this.ensureRoleCompatibility);
    this.on("role-compatibility", this.acceptApplication);

    this.on("invalid", this.denyApplication);

};

util.inherits(ReviewProcess, Emitter);
module.exports = ReviewProcess;