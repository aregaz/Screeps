function _setTarget(creep, memoryPropertyName, selectNewTargetFunction) {
    var target;
    if (creep.memory[memoryPropertyName] === null || typeof creep.memory[memoryPropertyName] === 'undefined') {
        target = selectNewTargetFunction(creep);
        creep.memory[memoryPropertyName] = target ? target.id : undefined;
    } else {
        target = Game.getObjectById(creep.memory[memoryPropertyName]);
    }

    return target;
}

module.exports = {
    setTarget: _setTarget
};
