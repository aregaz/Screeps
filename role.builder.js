var buildAction = require('action.build');
var harvestAction = require('action.harvest');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var buildTargets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (buildTargets.length > 0) {
            buildAction.do(creep, buildTargets[0], 'harvest');
        } else {
            console.log('Builder [' + creep.name + '] cannot find a target to build.');
            creep.say('I`m useless :(');
        }

        var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
        harvestAction.do(creep, source, "build");
    }
};

module.exports = roleBuilder;
