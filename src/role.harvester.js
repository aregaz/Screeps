var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function _findTarget(room) {
            var targets = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            return targets[0]; // TODO: find closest target
        }

        var source = creep.room.find(FIND_SOURCES)[0]; // TODO: choose nearest source
        var target = _findTarget(creep.room);

        if (target) {
            transferAction.run(creep, target, "harvest");
        } else {
            // console.log('Harvester [' + creep.name + '] cannot find a target to bring enery to.');
            creep.say('I`m useless :(');
        }

        harvestAction.run(creep, source, "transfer");
    }
};

module.exports = roleHarvester;
