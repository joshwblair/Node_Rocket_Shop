var assert = require('assert');
var ReviewProcess = require('../processes/review');
var MembershipApplication = require('../models/membership_application');


describe("The Review Process", function(){
    describe('Recieving a valid application', function(){
        
        var decision;
        before(function(done){
            validApp = new MembershipApplication({
                first : "test",
                last : "User",
                email : "test@test.com",
                age : 30,
                height : 66,
                weight : 180
            });
            var review = new ReviewProcess();
            review.processApplication(validApp, function(err, result){
                decision = result;
                done();
            });
        });
        
        it('returns success', function(){
            assert(decision.success, decision.message);
        });

    });
    
});