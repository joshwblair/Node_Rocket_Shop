var assert = require ('assert');
var MembershipApplication = require("../models/membership_application");

describe("Membership application requirements", function(){
    var validApp;

    before(function(){
        validApp = new MembershipApplication({
            first : "Test",
            last : "User",
            email : "test@test.com",
            age : 30,
            height : 66,
            weight : 180
        });
    });

    describe("Application valid if...", function(){
        it("all validators successful", function(){
            assert(validApp.IsValid(), "Not valid");
        });
    })
    
    describe("Application invalid if...", function(){        

        it('is expired', function(){
            var app = new MembershipApplication({validUntil: Date.parse("01/01/2010")}); 
            assert(app.expired());
        });



        it("email is 4 characters of less", function(){            
            var app = new MembershipApplication({email: "dd"});            
            assert(!app.emailIsValid(), "Not valid");
        });
        it("email does not contains a @", function(){            
            var app = new MembershipApplication({email: "ThisThatAndThe:Other.com"});            
            assert(!app.emailIsValid(), "Not valid");
        });
        it("email is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.emailIsValid(), "Not valid");
        });

        it("height is less than 60 inches", function(){            
            var app = new MembershipApplication({height: 10});            
            assert(!app.heightIsValid(), "Not valid");
        });
        it("height is more than 75", function(){            
            var app = new MembershipApplication({height: 80});            
            assert(!app.heightIsValid(), "Not valid");
        });
        it("height is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.heightIsValid(), "Not valid");
        });

        it("age is less than 15", function(){            
            var app = new MembershipApplication({age: 10});            
            assert(!app.ageIsValid(), "Not valid");
        });
        it("age is more than 100", function(){            
            var app = new MembershipApplication({age: 110});            
            assert(!app.ageIsValid(), "Not valid");
        });
        it("age is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.ageIsValid(), "Not valid");
        });

        it("weight is less than 100", function(){            
            var app = new MembershipApplication({weight: 320});            
            assert(!app.weightIsValid(), "Not valid");
        });
        it("weight is more than 300", function(){            
            var app = new MembershipApplication({weight: 90});            
            assert(!app.weightIsValid(), "Not valid");
        });
        it("weight is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.weightIsValid(), "Not valid");
        });

        
        it("first name is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.nameIsValid(), "Not valid");
        });
        it("last name is ommited", function(){            
            var app = new MembershipApplication();            
            assert(!app.nameIsValid(), "Not valid");
        });
    });
});