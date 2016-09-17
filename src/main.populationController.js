var creepsHelper = require('utils.creepsHelper');
var populationHelper = require('utils.populationHelper');

var populationController = {
    run: function(population, spawnName) {
        for (var i = 0; i < population.length; i++) {
            var populationRule = population[i];

            var creepsInRoleCount = creepsHelper.getCreepsInRole(populationRule.role).length;
            while (creepsInRoleCount < populationRule.count) {
                var creepMemory = { role : populationRule.role };
                if (typeof populationRule.startAction !== 'undefined') {
                    creepMemory.action = populationRule.startAction;
                }

                var createCreepResult = Game.spawns[spawnName].createCreep(
                    populationRule.parts,
                    populationHelper.getNewNameForRole(populationRule.role),
                    creepMemory);
                if(createCreepResult === ERR_NOT_ENOUGH_ENERGY) {
                    var fullRoomEnergy = Game.rooms.W54S28.energyAvailable;
                    var requiredEnergy = populationHelper.calculateBodyCost(populationRule.parts);
                    console.log('Cannot create creep [' + populationRule.role +
                        '] - no energy (' + fullRoomEnergy + '/' + requiredEnergy + ')');
                } else if(createCreepResult === ERR_BUSY) {
                    // busy
                } else {
                    var creep = Game.creeps[createCreepResult];
                    if (creep) {
                        console.log('Creep creation result: Name = [' + createCreepResult + '], ' +
                            'Role = [' + creep.memory.role + ']');
                    } else {
                        console.log('Cannot create creep. Result = ' + createCreepResult);
                    }

                }
                creepsInRoleCount++;
            }
        }
    }
};



module.exports = populationController;
