var transferAction = {
    run: function(creep, target, afterAction) {
        if (creep.memory.action !== 'transfer')  return;

        if (!target) {
            creep.memory.action = 'idle';
            creep.say('??');

            console.log('Harvester [' + creep.name + '] cannot find a target to bring enery to.');
            return;
        }

        if (creep.carry.energy === 0) {
            _finishTransferAction(creep, afterAction);
            return;
        }

        var transferResult = creep.transfer(target, RESOURCE_ENERGY);
        if (transferResult == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        } else if (transferResult === ERR_FULL) {
            console.log('Harvester: target if already full');
        } else if (transferResult === ERR_NOT_ENOUGH_RESOURCES) {
            _finishTransferAction(creep, afterAction);
            return;
        } else {
            creep.say(transferResult);
        }
    }
};

function _finishTransferAction(creep, afterAction) {
    creep.say('Empty');
    creep.memory.action = afterAction ? afterAction : 'harvest';
}

module.exports = transferAction;
