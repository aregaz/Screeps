var buildAction = require('action.build');
var harvestAction = require('action.harvest');
var idleAction = require('action.idle');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var nearestTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (nearestTarget == null || typeof nearestTarget === 'undefined') {
            // console.log('Builder [' + creep.name + '] cannot find a target to build.');
            creep.say('??');
            creep.memory.action = 'idle';
        } else {
            creep.memory.action = 'build';
        }

        var stopIdleCondition = function(creep) {
            var nearestTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            return neadersTarget != null;
        };

        var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
        buildAction.run(creep, nearestTarget, 'harvest');
        harvestAction.run(creep, source, "build");
        idleAction.run(creep, {x: 8, y: 36}, stopIdleCondition, 'build');
    }
};

module.exports = roleBuilder;
