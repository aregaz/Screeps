/*jshint esversion: 6 */

var creepsHelper = require('utils.creepsHelper');

function _getNewNameForRole(roleName) {
    var number = 1;

    var creepIds = creepsHelper.getCreepsInRole(roleName)
        .map((creep) => creep.name)
        .map(_getIdFromName)
        .sort(function(a, b) {
            return a < b; // desc
        });
    if (creepIds.length !== 0) {
        number = creepIds[0] + 1;
    }

    return roleName + '_' + number;
}

function _getIdFromName(creepName) {
    try {
        var nameParts = creepName.split('_');
        if (nameParts.length !== 2) {
            return 0
        }

        var idString = nameParts[1];
        if (idString === 'NaN' || idString.length === 0) {
            idString = "0";
        }
        var id = parseInt(idString);
        return id;
    } catch (e) {
        console.log('ERROR: unable to parse creepId from his name ' + creepName + '. Exception: ' + e);
        return 0;
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
