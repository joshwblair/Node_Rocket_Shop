var _ = require('underscore')._;
var moment = require('moment');

var MembershipApplication = function(args){
    args || (args = {});
    _.extend(this, args);
    this.validUntil = args.validUntil ? moment(args.validUntil) : moment().add(10, "days");

    this.expired = function(){
        return this.validUntil.isBefore(moment());
    };

    this.emailIsValid = function(){
        return this.email && this.email.length > 3 && this.email.indexOf("@") > -1;
    };

    this.heightIsValid = function(){
        return this.height && this.height > 60 && this.height < 75;
    };

    this.ageIsValid = function(){
        return this.age && this.age > 15 && this.age < 100;
    };

    this.weightIsValid = function(){
        return this.weight && this.weight > 100 && this.weight < 300;
    };

    this.nameIsValid = function(){
        return this.first && this.last;
    };

    this.validationMessage = function(){
        if(this.IsValid()){
            return "Application is valid";
        }else if(!this.emailIsValid()){
            return "Email is not valid";
        }else if(!this.ageIsValid()){
            return "Age is outside limits of 15-100";
        }else if(!this.heightIsValid()){
            return "Height is outside limits of 60-75";
        }else if(!this.weightIsValid()){
            return "weight is outside limits of 100-300";
        }else if(!this.nameIsValid()){
            return "a first and last name are required";
        }else if(!this.expired()){
            return "This application is expired";
        }
    }

    
    this.IsValid = function(){
        return this.emailIsValid() &&
            this.heightIsValid() &&
            this.ageIsValid() &&
            this.weightIsValid() && 
            !this.expired();
    };

};

module.exports = MembershipApplication;