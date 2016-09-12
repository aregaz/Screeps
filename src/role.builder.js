var buildAction = require('action.build');
var harvestAction = require('action.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var nearestTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (typeof nearestTarget !== 'undefined') {
            buildAction.run(creep, nearestTarget, 'harvest');
        } else {
            console.log('Builder [' + creep.name + '] cannot find a target to build.');
            creep.say('??');
        }

        var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
        harvestAction.run(creep, source, "build");
    }
};

module.exports = roleBuilder;
