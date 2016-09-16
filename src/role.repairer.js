/*jshint esversion: 6 */
var parkAction = require('action.park');
var repairAction = require('action.repair');

var repairerRole = {
    run: function(creep) {
        var target = _selectTarget(creep);

        if (target) {
            repairAction.run(creep, target, 'repair');
            var source = creep.room.find(FIND_SOURCES)[0]; // TODO: choose nearest source
            harvestAction.run(creep, source, 'repair');
        } else {
            creep.say('I`m useless :(');

            console.log('No more demaged buildings');
            creep.memory.action = 'park';
            creep.memory.targetId = undefined;
            parkAction.run(creep, 18, 41, 'idle');
        }
    }
};

function _selectTarget(creep) {
    var target;
    if (typeof creep.memory.targetId === 'undefined' || _isTargetRepaired(creep.memory.targetId)) {
        target = _findMostDemagedTarget(creep);
        creep.memory.targetId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.targetId);
    }

    return target;
}

function _isTargetRepaired(targetId) {
    //if (!targetId) return false;
    var target = Game.getObjectById(targetId);
    return target.hits === target.hitsMax;
}

function _findMostDemagedTarget(creep) {
    var strucutres = creep.room.find(FIND_STRUCTURES, {
        sort: function(structure1, structure2) {
            return structure1.hits > structure2.hits;
        },
        filter: function(structure) {
            return structure.hits < structure.hitsMax / 3;
        }
    });

    if (strucutres.length === 0) return;

    return strucutres[0];
}

function _findClosestTarget(creep) {
    var target = creep.pos.findClosest(FIND_STRUCTURES, { filter: function(structure) {
         return structure.hits < structure.hitsMax / 3;
    }});

    return target;
}

module.exports = repairerRole;
