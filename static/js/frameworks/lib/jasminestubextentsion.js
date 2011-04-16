/**
 * Ruzzie's Stub for jasmine.
 * Created by Ruzzie
 * User: Ruzzie
 */

var ruzzie = {};
ruzzie.jasmine = {};
ruzzie.jasmine.extensions = {};


ruzzie.jasmine.extensions.createStub = function () {

    //return a function, because an object cannot be called.
    var stubObj = function() {
        stubObj.callCount++;
        return stubObj.executionPlan[stubObj.callCount - 1].apply(this, null);
    };

    var stub = new ruzzie.jasmine.extensions.Stub();
    //copy properties from object to the function
    for (var prop in stub) {
        stubObj[prop] = stub[prop];
    }

    //reset the object
    stubObj.callCount = 0;
    stubObj.executionPlan = [];

    return stubObj;
};

ruzzie.jasmine.extensions.Stub = function() {};

ruzzie.jasmine.extensions.Stub.prototype = {
    executionPlan:[],
    callCount : 0,
    andThrow: function(error) {
        this.executionPlan.push(function() {
            throw error;
        });
        return this;
    },
    andCallFake : function(fakeDelegate) {
        this.executionPlan.push(fakeDelegate);
        return this;
    },

    andRepeatTimes : function(times) {
        //repeat the last call times x

        //validate times argument
        if (isNaN(times)) {
            throw("andRepeatTimes is called with an invalid argument. Pass an integer.");
        }

        //check if there is a delegate in the executionPlan
        if (this.executionPlan.length === 0) {
            throw("andRepeatTimes is called before setting up an expectation.");
        }

        //get the last added delegate
        var lastDelegateInExecutionPlan = this.executionPlan[this.executionPlan.length - 1];

        //add the last delegate in the executionPlan a number of times
        for (var i = 0; i < times - 1; i++) {
            this.executionPlan.push(lastDelegateInExecutionPlan);
        }
        return this;
    }
};