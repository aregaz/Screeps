var buildAction = require('action.build');
var harvestAction = require('action.harvest');
var idleAction = require('action.idle');

var roleBuilder = {
    run: function(creep) {
        var target = _selectTarget(creep);

        var source = creep.room.find(FIND_SOURCES)[1]; // TODO: choose nearest source
        buildAction.run(creep, target, 'harvest');
        harvestAction.run(creep, source, "build");
        idleAction.run(creep, {x: 8, y: 36}, _stopIdleCondition, 'build');
    }
};

function _stopIdleCondition(creep) {
    var newTarget = _selectTarget(creep);
    return neadersTarget !== null && typeof newTarget !== 'undefined';
}

function _selectTarget(creep) {
    var target;
    if (typeof creep.memory.targetId === 'undefined' || _isTargetRepaired(creep.memory.targetId)) {
        target = _findConstructionSite(creep);
        creep.memory.targetId = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory.targetId);
    }

    return target;
}

function _findConstructionSite(creep) {
    var nearestTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    return nearestTarget;
}

module.exports = roleBuilder;
