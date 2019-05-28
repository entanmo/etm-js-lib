const constants = require('./constants.js');
const slots = require('./slots.js');

function BlockStatus() {
    let milestones = [
        600000000, // Initial Reward
        500000000, // Milestone 1
        400000000, // Milestone 2
        400000000, // Milestone 3
        300000000, // Milestone 4
        200000000  // Milestone 5
    ];

    let distance = 10112000, // Distance between each milestone
        rewardOffset = 1, // Start rewards at block (n)
        lastRewardHeight = 59328000;

    let parseHeight = function (height) {
        let m_height = parseInt(height);

        if (isNaN(m_height)) {
            throw new Error('Invalid block height');
        } else {
            return Math.abs(m_height);
        }
    };

    this.calcMilestone = function (height) {
        let location = Math.floor(parseHeight(height - rewardOffset) / distance),
            lastMile = milestones[milestones.length - 1];

        if (location > (milestones.length - 1)) {
            return milestones.lastIndexOf(lastMile);
        } else {
            return location;
        }
    };

    this.calcReward = function (height) {
        let m_height = parseHeight(height);

        if (m_height < rewardOffset || m_height <= 1 || height > lastRewardHeight) {
            return 0;
        } else {
            return milestones[this.calcMilestone(m_height)];
        }
    };

    this.calcSupply = function (height) {
        let m_height = parseHeight(height);
        if (m_height > lastRewardHeight) {//超出最后奖励高度不计算
            m_height = lastRewardHeight;
        }

        m_height -= m_height % slots.delegates;
        let milestone = this.calcMilestone(m_height);
        let supply = constants.totalAmount;
        let rewards = [];

        if (m_height <= 0) {
            return supply;
        }
        let amount = 0, multiplier = 0;
        m_height = m_height - rewardOffset + 1;
        for (let i = 0; i < milestones.length; i++) {
            if (milestone >= i) {
                multiplier = milestones[i];

                if (m_height <= 0) {
                    break; // Rewards not started yet
                } else if (m_height < distance) {
                    amount = m_height % distance; // Measure distance thus far
                } else {
                    amount = distance; // Assign completed milestone
                }
                rewards.push([amount, multiplier]);
                m_height -= distance; // Deduct from total height
            } else {
                break; // Milestone out of bounds
            }
        }
        // if (m_height > 0) {
        //     rewards.push([m_height, milestones[milestones.length - 1]]);
        // }

        for (let i = 0; i < rewards.length; i++) {
            let reward = rewards[i];
            supply += reward[0] * reward[1];
        }

        // if (rewardOffset <= 1) {
        //     supply -= milestones[0];
        // }

        return supply;
    };
}

// Exports
module.exports = BlockStatus;
