/*jshint esversion: 6 */

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

var populationController = require('main.populationController');

global.roomName = 'E38N44';

global.filterCreeps = function(predicate) {
    var creepsInRole = [];
    for (var creepName in Game.creeps) {
        if(Game.creeps.hasOwnProperty(creepName)) {
            var creep = Game.creeps[creepName];
            if (predicate(creep)) {
                creepsInRole.push(creep);
            }
        }
    }

    return creepsInRole;
};

global.printCreeps = function(creeps) {
    for (var i = 0; i < creeps.length; i++) {
        var creep = creeps[i];
        console.log('Name: ' + creep.name +
            ', Role: ' + creep.memory.role +
            ', Action: ' + creep.memory.action +
            ', Body: ' + creep.body);
    }
};

//global.printCreeps(global.filterCreeps(function(creep) {return creep.memory.role === "builder"}))

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
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    var population = [
        // {
        //     role: 'upgrader',
        //     count: 5,
        //     parts: [WORK, CARRY, MOVE],
        //     startAction: 'harvest'
        // },
        {
            role: 'harvester',
            count: 2,
            parts: [WORK, CARRY, MOVE],
            startAction: 'harvest'
        },
        {
            role: 'builder',
            count: 2,
            parts: [WORK, CARRY, MOVE],
            startAction: 'harvest'
        }, {
            role: 'upgrader',
            count: 4,
            parts: [ WORK, CARRY, MOVE],
            startAction: 'harvest'
        },
        {
            role: 'repairer',
            count: 2,
            parts: [WORK, CARRY, MOVE],
            startAction: 'harvest'
        }
    ];
    populationController.run(population, 'Spawn1');
};
