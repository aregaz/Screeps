var harvestAction = require('action.harvest');
var upgradeAction = require('action.upgrade');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
        var controller = creep.room.controller;

        harvestAction.run(creep, source, "upgrade");
        upgradeAction.run(creep, controller, "harvest");
    }
};

module.exports = roleUpgrader;
