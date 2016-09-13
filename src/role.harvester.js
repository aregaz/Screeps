/*jshint esversion: 6 */

var harvestAction = require('action.harvest');
var transferAction = require('action.transfer');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        function _findTarget(room) {
            var targets = room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ([STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(structure.structureType) > -1 &&
                                structure.energy < structure.energyCapacity) ||
                            ([STRUCTURE_CONTAINER].indexOf(structure.structureType) > -1 &&
                                structure.store.energy < structure.energyCapacity);
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
