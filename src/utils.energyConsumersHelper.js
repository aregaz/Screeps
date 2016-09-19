var _isStructureNotFullConditions = {};
_isStructureNotFullConditions[STRUCTURE_EXTENSION] = function(structure) { return structure.energy < structure.energyCapacity; };
_isStructureNotFullConditions[STRUCTURE_CONTAINER] = function(structure) { return _.sum(structure.store) < structure.storeCapacity; };
_isStructureNotFullConditions[STRUCTURE_TOWER] = function(structure) { return structure.energy < structure.energyCapacity; };
_isStructureNotFullConditions[STRUCTURE_STORAGE] = function(structure) { return _.sum(structure.store) < structure.storeCapacity; };
_isStructureNotFullConditions[STRUCTURE_SPAWN] = function(structure) { return structure.energy < structure.energyCapacity; };

function _canReceiveEnergy(structure) {
    if (!structure) {
        console.log('Not a structure');
        return false;
    }

    var condition = _isStructureNotFullConditions[structure.structureType];
    if (typeof condition !== 'function') {
        console.log('Cannot find map for ' + _logStructure(structure) + '');
        return false;
    }

    var isFull = condition(structure);
    return isFull;
}

module.exports = {
    isStructureNotFullConditions: _isStructureNotFullConditions,
    canReceiveEnergy: _canReceiveEnergy
};
