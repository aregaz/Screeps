var path = require('path');
console.log(typeof path === 'undefined');

var expect = require('chai').expect;
var sinon = require('sinon');

console.log('loading testable moduls');
var populationHelper = require('utils.populationHelper');
console.log('loaded1');
var creepsHelper = require('utils.creepsHelper');
console.log('loaded2');

var roleName = 'fakerole';

describe('utils.populationHelper', function() {
    describe('getNewNameForRole', function() {
        // before(function() {
        //     sinon.stub(creepsHelper, 'getCreepsInRole', function(roleName) {
        //         return [];
        //     });
        // });

        // after(function() {
        //     creepsHelper.getCreepsInRole.restore();
        // });

        sinon.stub(creepsHelper, 'getCreepsInRole', function(roleName) {
            return [];
        });

        it('getSubtotal() should return 0 if no items are passed in', function() {
            var newCreepName = populationHelper.getNewNameForRole(roleName);
            expect(newCreepName).to.equal('fakeroll_1');
        });
    });
});
