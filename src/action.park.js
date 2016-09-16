var parkAction = {
    run: function(creep, position, afterAction) {
        if (creep.memory.action !== 'park') return;

        if (creep.pos.x === position.x && creep.pos.y === position.y) {
            creep.memory.action = afterAction ? afterAction : 'idle';
        } else {
            creep.moveTo(position.x, position.y);
        }
    }
};

module.exports = parkAction;
