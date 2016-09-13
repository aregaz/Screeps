/*jshint esversion: 6 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var populationFactory = require('populationFactory');

module.exports.loop = function () {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    var population = [
        {
            role: 'upgrader',
            count: 5,
            parts: [WORK, CARRY, MOVE]
        }, {
            role: 'builder',
            count: 2,
            parts: [WORK, CARRY, MOVE]
        }, {
            role: 'harvester',
            count: 3,
            parts: [WORK, CARRY, MOVE]
        }
    ];
    populationFactory.run(population, 'Spawn1');
};
