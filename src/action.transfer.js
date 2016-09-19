var transferAction = {
    run: function(creep, target, afterAction) {
        if (creep.memory.action !== 'transfer')  return;

        if (!target) {
            creep.say('??');
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
            creep.say('!!!');
            creep.memory.targetId = undefined;
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
