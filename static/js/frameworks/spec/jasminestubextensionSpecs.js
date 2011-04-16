/**
 * Created by Ruzzie.
 * User: Ruzzie
 * @import: jasmine.js
 */

var jasmineext = ruzzie.jasmine.extensions;

describe("Stub object for jasmine use. This should be able to record multiple calls for a spy", function() {


    it("should create stub on function", function() {
        //arrange
        //act
        var stubFunction = jasmineext.createStub();

        //assert
        expect(stubFunction).not.toBeNull();

    });

    it("should return call count 0 when stub is called 0 times", function() {
        //arrange
        //act
        var stubFunction = jasmineext.createStub();

        //assert
        expect(stubFunction.callCount).toEqual(0);
    });

    it("should return call count 1 when stub is called 1 time", function() {
        //arrange
        var stubFunction = jasmineext.createStub().andCallFake(function() {
        });

        //act
        stubFunction();

        //assert
        expect(stubFunction.callCount).toEqual(1);
    });

    it("should set the last call given the andRepeatTimes method to the number of times passed", function() {
        //arrange
        //act
        var stubFunction = jasmineext.createStub().andCallFake().andRepeatTimes(5);

        //assert
        expect(stubFunction.executionPlan.length).toEqual(5);
    });

    it("should throw error when andRepeatTimes is called when no stub function is created first", function() {
        //arrange
        //act
        var stubFunction = function() {
            jasmineext.createStub().andRepeatTimes(5);
        };

        //assert
        expect(stubFunction).toThrow("andRepeatTimes is called before setting up an expectation.");
    });

    it("should throw error when andRepeatTimes is called with invalid argument", function() {
        //arrange
        //act
        var stubFunction = function() {
            jasmineext.createStub().andCallFake().andRepeatTimes('dummyArgument');
        };

        //assert
        expect(stubFunction).toThrow("andRepeatTimes is called with an invalid argument. Pass an integer.");
    });

    it("should return call count 5 when stub is called 5 times", function() {
        //arrange
        var stubFunction = jasmineext.createStub().andCallFake(
                function() {
                }).andRepeatTimes(5);

        //act
        for (var i = 0; i < 5; i++) {
            stubFunction();
        }

        //assert
        expect(stubFunction.callCount).toEqual(5);

    });

    it("should throw error when andThrow is called", function() {
        //arrange
        var stubFunction = jasmineext.createStub().andThrow("error");
        var errorWasThrown = false;
        var errorMsg = null;

        //act
        try {
            stubFunction();
        }
        catch(err) {
            errorMsg = err;
            errorWasThrown = true;
        }

        //assert
        expect(errorWasThrown).toEqual(true);
        expect(errorMsg).toEqual("error");
    });

    it("should call fake when andCallFake is called", function() {
        //arrange
        var wasCalled = false;
        var stubFunction = jasmineext.createStub().andCallFake(
                function() {
                    wasCalled = true;
                });
        //act
        stubFunction();

        //assert
        expect(wasCalled).toBeTruthy();
    });

    it("should replay stub calls in order", function() {
        //arrange
        var stubFunction = jasmineext.createStub()
                .andCallFake(function() {
            return 1;
        })
                .andCallFake(function() {
            return 2;
        })
                .andCallFake(function() {
            return 3;
        })
                ;
        //act
        var firstResult = stubFunction();
        var secondResult = stubFunction();
        var thirdResult = stubFunction();

        //assert
        expect(firstResult).toEqual(1);
        expect(secondResult).toEqual(2);
        expect(thirdResult).toEqual(3);

    });


    it("should record calls by chaining methods andThrow and andCallFake", function() {
        //arrange
        var stubFunction = jasmineext.createStub()
                .andCallFake(function() {
            return 1;
        })
                .andThrow("error 2")
                .andCallFake(function() {
            return 3;
        })
                ;
        var secondResultThrewException = false;

        //act
        var firstResult = stubFunction();

        try {
            stubFunction();
        }
        catch(err) {
            secondResultThrewException = true;
        }

        var thirdResult = stubFunction();

        //assert
        expect(firstResult).toEqual(1);
        expect(secondResultThrewException).toBeTruthy();
        expect(thirdResult).toEqual(3);
    });
});
