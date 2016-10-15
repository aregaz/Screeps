function _logStructure(structure) {
    if (!structure) {
        return '[]';
    }

    var structureType = typeof structure.structureType === undefined ?
        '' : structure.structureType;
    return '[' + structureType + '(' + structure.pos.x + ', ' + structure.pos.y + ')]';
}

function _logCreep(creep) {
    return '[' + creep.name + ']';
}

module.exports = {
    logStructure: _logStructure,
    logCreep: _logCreep
};