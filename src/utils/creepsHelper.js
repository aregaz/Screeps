/*jshint esversion: 6 */

function _getCreepsInRole(roleName) {
    var creepsInRole = [];
    for (var creepName in Game.creeps) {
        if(Game.creeps.hasOwnProperty(creepName)) {
            var creep = Game.creeps[creepName];
            if (creep.memory.role === roleName) {
                creepsInRole.push(creep);
            }
        }
    }

    return creepsInRole;
}

module.exports = {
    getCreepsInRole: _getCreepsInRole
};
