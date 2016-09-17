var creepsHelper = require('utils.creepsHelper');
var populationHelper = require('utils.populationHelper');
var _ = require('lodash');

var populationController = {
    run: function(population, roomName, spawnName) {
        _clearMemory();

        for (var i = 0; i < population.length; i++) {
            var populationRule = population[i];

            var creepsInRoleCount = creepsHelper.getCreepsInRole(populationRule.role).length;
            while (creepsInRoleCount < populationRule.count) {
                _createCreep(populationRule, roomName, spawnName);
                creepsInRoleCount++;
            }
        }
    }
};

function _clearMemory() {
    function _isCreepAlive(creepName) {
        return typeof Game.creeps[creepName] !== 'undefined';
    }

    for(var creepName in Memory.creeps) {
        if (Memory.creeps.hasOwnProperty(creepName)) {
            if (!_isCreepAlive(creepName)) {
                delete Memory.creeps[creepName];
                console.log('Creep memory for ' + creepName + ' was cleared');
            }
        }
    }
}

function _createCreep(populationRule, roomName, spawnName) {
    var creepMemory = { role : populationRule.role };
    if (typeof populationRule.startAction !== 'undefined') {
        creepMemory.action = populationRule.startAction;
    }

    var createCreepResult = Game.spawns[spawnName].createCreep(
        populationRule.parts,
        populationHelper.getNewNameForRole(populationRule.role),
        creepMemory);

    if(createCreepResult === ERR_NOT_ENOUGH_ENERGY) {
        var fullRoomEnergy = Game.rooms[roomName].energyAvailable;
        var requiredEnergy = populationHelper.calculateBodyCost(populationRule.parts);
        console.log('Cannot create creep [' + populationRule.role +
            '] - no energy (' + fullRoomEnergy + '/' + requiredEnergy + ')');
    } else if(createCreepResult === ERR_BUSY) {
        // busy
    } else {
        if (_.isString(createCreepResult)) {
            console.log('Creep creation result: Name = [' + createCreepResult + '], ' +
                'Role = [' + creep.memory.role + ']');
        } else {
            console.log('Cannot create creep. Result = ' + createCreepResult);
        }
    }
}

module.exports = populationController;
