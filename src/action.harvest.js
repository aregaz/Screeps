var harvestAction = {
    run: function(creep, source, afterAction) {
        if (typeof creep.memory.action === 'undefined') {
            creep.memory.action = 'harvest';
        }

        if (creep.memory.action !== 'harvest') return;

        if(creep.carry.energy >= creep.carryCapacity) {
            creep.say("Full");
            creep.memory.action = afterAction;
            return;
        }

        var result = creep.harvest(source);
        if(result == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};

module.exports = harvestAction;
