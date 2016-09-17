/*jshint esversion: 6 */

var creepsHelper = require('utils.creepsHelper');

function _getNewNameForRole(roleName) {
    var creepIds = creepsHelper.getCreepsInRole(roleName)
        .map((creep) => creep.name)
        .map(_getIdFromName)
        .sort(function(a, b) {
            return a < b; // desc
        });
    var maxId = creepIds[0];

    return roleName + '_' + (maxId+1);
}

function _getIdFromName(creepName) {
    if (creepName.indexOf('_') === -1) {
        return -1;
    }

    try {
        var nameParts = creepName.split('_');
        var idString = nameParts[1];
        if (idString === 'NaN') {
            idString = "-1";
        }
        var id = parseInt(idString);
        return id;
    } catch (e) {
        console.log('ERROR: unable to parse creepId from his name ' + creepName + '. Exception: ${e}');
        return -1;
    }
}

var bodyCost = [
    { part: MOVE, cost: 50 },
    { part: WORK, cost: 100 },
    { part: CARRY, cost: 50 },
    { part: ATTACK, cost: 80 },
    { part: RANGED_ATTACK, cost: 150 },
    { part: HEAL, cost: 250 },
    { part: CLAIM, cost: 600 },
    { part: TOUGH, cost: 10 }
];

function _calculateBodyCost(bodyParts) {
    function _filter(bc) { return bc.part === part; }

    var cost = 0;
    for (var i = 0; i < bodyParts.length; i++) {
        var part = bodyParts[i];
        var bodyCostItem = bodyCost.filter(_filter)[0];
        cost += bodyCostItem.cost;
    }

    return cost;
}

module.exports = {
    getNewNameForRole: _getNewNameForRole,
    calculateBodyCost: _calculateBodyCost
};
