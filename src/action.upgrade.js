var upgradeAction = {
    run: function upgradeFull(creep, controller, afterAction) {
        if (creep.memory.action !== 'upgrade') return;

        if (creep.carry.energy === 0) {
            creep.say('Out of energy');
            creep.memory.action = afterAction ? afterAction : 'harvest';
        }

        var result = creep.upgradeController(controller);
        if (result == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller);
        } else if(result === OK) {
            // creep.say('Upgrading');
        }
    }
};

module.exports = upgradeAction;
