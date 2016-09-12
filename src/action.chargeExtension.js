var chargeExtensionAction = {
    run: function(creep, target, afterAction) {
        if (creep.memory.action !== 'chargeExtension') return;

        if (creep.carry.energy === 0) {
            creep.say('Empty');
            creep.memory.action =  afterAction ? afterAction : 'harvest';
            return;
        }

        if (typeof target === 'undefined') {
            target = creep.findClosestByPath(
                FIND_STRUCTURE, {
                    filter: (structure) => structure.structureType === 'extension'
                }
            );
        }

        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target);
        }
    }
};

module.exoprts = chargeExtensionAction;
