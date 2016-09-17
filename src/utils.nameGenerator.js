/*jshint esversion: 6 */

var creepsHelper = require('utils.creepsHelper');

function _getNewCreepName(roleName) {
    // var creepsInRole = creepsHelper.getCreepsInRole(roleName).sort(function(c1, c2) {
    //     return _getIdFromName(c1.name) > _getIdFromName(c2.name);
    // });
    var creepIds = creepsHelper.getCreepsInRole(roleName)
        .map((creep) => creep.name)
        .map(_getIdFromName)
        .sort();
    var maxId = creepIds[creepIds.length - 1];

    return '${roleName}_${maxId+1}';
}

function _getIdFromName(creepName) {
    try {
        var nameParts = creepName.split('_');
        var id = parseInt(nameParts[1]);
        return id;
    } catch (e) {
        console.log('ERROR: unable to parse creepId from his name [${creepName}]. Exception: ${e}');
        return -1;
    }
}

module.exports = {
    new: _getNewCreepName
};
