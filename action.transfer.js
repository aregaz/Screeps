var transferAction = {
    do: function(creep, target, afterAction) {
        if (creep.memory.action !== 'transfer')  return;

        if (creep.carry.energy === 0) {
            creep.say('Out of energy');
            creep.memory.action = afterAction ? afterAction : 'harvest';
        }

        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
};

module.exports = transferAction;
