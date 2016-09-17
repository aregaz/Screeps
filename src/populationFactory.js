var populationFactory = {
    run: function(population, spawnName) {
        for (var i = 0; i < population.length; i++) {
            var populationRule = population[i];
            // console.log(JSON.stringify(populationRule));

            var creepsInRole = _getCreepsInRole(populationRule.role);
            var creepsInRoleCount = creepsInRole.length;
            while (creepsInRoleCount < populationRule.count) {
                var createCreepResult = Game.spawns[spawnName].createCreep(
                    populationRule.parts,
                    undefined,
                    { role : populationRule.role });
                if(createCreepResult === OK) {
                    console.log('New creep with role [' + populationRule.role + '] is been created');
                } else if (createCreepResult === ERR_NOT_ENOUGH_ENERGY) {
                    console.log('Cannot create creep - no energy');
                } else {
                    console.log('Creep creation result = [' + createCreepResult + ']');
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
