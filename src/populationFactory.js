var populationFactory = {
    run: function(population, spawnName) {
        for (var i = 0; i < population.length; i++) {
            var populationRule = population[i];
            // console.log(JSON.stringify(populationRule));

            var creepsInRole = _getCreepsInRole(populationRule.role);
            while (creepsInRole.length < populationRule.count) {
                // console.log('New creep with role [' + populationRule.role + '] is been creating');
                Game.spawns[spawnName].createCreep(populationRule.parts, undefined, { role : populationRule.role });
                creepsInRole++;
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
