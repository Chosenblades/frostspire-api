const Skill = {
    skill: 0,
    xp: 0,
    lvl: 1
};

function getDefaultSkills() {
    var defaultSkillsArray = Array.from({length: 23}, x => Skill);
    return defaultSkillsArray;
}

module.exports = getDefaultSkills;