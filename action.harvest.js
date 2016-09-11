var harvestAction = {
    do: function(creep, source, afterAction) {
        if (typeof creep.memory.action === 'undefined') {
            creep.memory.action = 'harvest';
        }

        if (creep.memory.action !== 'harvest') return;

        if(creep.carry.energy >= creep.carryCapacity) {
            creep.say("I'm full");
            creep.memory.action = afterAction;
            return;
        }

        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};

module.exports = harvestAction;
