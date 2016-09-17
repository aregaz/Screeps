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

module.exports = {
    getNewNameForRole: _getNewNameForRole
};
