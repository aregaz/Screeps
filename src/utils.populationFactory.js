var creepsHelper = require('utils.creepsHelper');
var nameGenerator = require('utils.nameGenerator');

var populationFactory = {
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
                    nameGenerator.new(populationRule.role),
                    creepMemory);
                if(createCreepResult === ERR_NOT_ENOUGH_ENERGY) {
                    var fullRoomEnergy = Game.rooms.W54S28.energyAvailable;
                    console.log('Cannot create creep - no energy (' + fullRoomEnergy+ ')');
                } else if(createCreepResult === ERR_BUSY) {
                    // busy
                } else {
                    console.log('Creep creation result: Name = [' + createCreepResult + '], ' +
                        'Role = [' + Game.creeps[createCreepResult].memory.role + ']');
                }
                creepsInRoleCount++;
            }
        }
    }
};



module.exports = populationFactory;
