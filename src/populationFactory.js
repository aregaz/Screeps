var populationFactory = {
    run: function(population, spawnName) {
        for (var i = 0; i < population.length; i++) {
            var populationRule = population[i];
            // console.log(JSON.stringify(populationRule));

            var creepsInRole = _getCreepsInRole(populationRule.role);
            var creepsInRoleCount = creepsInRole.length;
            while (creepsInRoleCount < populationRule.count) {
                var creepMemory = { role : populationRule.role };
                if (typeof populationRule.startAction !== 'undefined') {
                    creepMemory.action = populationRule.startAction;
                }

                var createCreepResult = Game.spawns[spawnName].createCreep(
                    populationRule.parts,
                    undefined,
                    creepMemory);
                if(createCreepResult === OK) {
                    console.log('New creep with role [' + populationRule.role + '] is been created');
                } else if (createCreepResult === ERR_NOT_ENOUGH_ENERGY) {
                    var fullRoomEnergy = Game.rooms.W54S28.energyAvailable;
                    console.log('Cannot create creep - no energy (' + fullRoomEnergy+ ')');
                } else {
                    console.log('Creep creation result: Name = [' + createCreepResult + '], ' +
                        'Role = [' + Game.creeps[createCreepResult].memory.role + ']');
                }
                creepsInRoleCount++;
            }
        }
    }
};

function _getCreepsInRole(roleName) {
    var creepsInRole = [];
    for (var creepName in Game.creeps) {
        if(Game.creeps.hasOwnProperty(creepName)) {
            var creep = Game.creeps[creepName];
            if (creep.memory.role === roleName) {
                creepsInRole.push(creep);
            }
        }
    }

    // console.log("There are [" + creepsInRole.length + "] creeps in role [" + roleName + "]");
    return creepsInRole;
}

module.exports = populationFactory;
