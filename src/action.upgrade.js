var upgradeAction = {
    do: function upgradeFull(creep, controller, afterAction) {
        if (creep.memory.action !== 'upgrade') return;

        if (creep.carry.energy === 0) {
            creep.say('Out of energy');
            creep.memory.action = afterAction ? afterAction : 'harvest';
        }

        if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        } else {
            creep.say('Upgrading');
        }
    }
};

module.exports = upgradeAction;
