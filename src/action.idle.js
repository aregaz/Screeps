/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('action.idle');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: function(creep, coordinates, stopIdleCondition, afterAction) {
        if (creep.memory.action != 'idle') return;
        
        if (typeof stopIdleCondition === "function") {
            var result = stopIdleCondition(creep);
            if (result) {
                creep.memory.action = afterAction ? afterAction : 'harvest';
            }
        }
        
        creep.moveTo(coordinates.x, coordinates.y);
        
        
    }
};