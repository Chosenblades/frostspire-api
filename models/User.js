var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const getDefaultSkillsArray = require('../utility/defaultSkills');

const Appearance = new Schema({
    gender: {
        type: Number,
        default: 0
    },
    looks: {
        type: [Number],
        default: [9, 14, 109, 26, 33, 36, 42]
    },
    colors: {
        type: [Number],
        default: [0, 3, 2, 0, 0]
    }
});

const Skill = new Schema({
    skill: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    lvl: {
        type: Number,
        default: 1
    }
},{_id: false});

/*const Attribute = new Schema ({
    gnomeCourse: Number,
    barbarianCourse: Number
});*/

const Timer = new Schema ({
    identifier: String,
    tickOffline: Boolean,
    timeLeft: Number,
    currentMs: Number
})

const Item = new Schema ({
    id: Number,
    amount: Number,
    attr: Map
});

const ItemContainer = new Schema({
    name: String,
    items: [Item]
});

const Varp = new Schema ({
    id: Number,
    state: Number
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^((([!#$%&'*+\-/=?^_`{|}~\w])|([!#$%&'*+\-/=?^_`{|}~\w][!#$%&'*+\-/=?^_`{|}~\.\w]{0,}[!#$%&'*+\-/=?^_`{|}~\w]))[@]\w+([-.]\w+)*\.\w+([-.]\w+)*)$/,
            'Please use a valid email'
        ]
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [12, 'Name can not be longer than 12 characters']
    },
    passwordHash: {
        type: String,
        required: true
    },
    displayName: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    previousXteas: [Number],
    x: {
        type: Number,
        default: 3087
    },
    y: {
        type: Number,
        default: 3497
    },
    height: {
        type: Number,
        default: 0
    },
    privilege: {
        type: Number,
        default: 0
    },
    displayMode: {
        type: Number,
        default: 0
    },
    runEnergy: {
        type: Number,
        default: 100.00
    },
    appearance: Appearance,
    skills: [Skill],
    attributes: {
        type: Map,
        default: new Map([['NEW_ACCOUNT_ATTR', true]])
    },
    timers: [Timer],
    itemContainers: [ItemContainer],
    varps: [Varp]
});

userSchema.pre('save', function(next) {
    this.displayName = this.username;

    //Set default skills
    for(var i = 0; i < 23; i++) {
        this.skills.push(Skill);
        this.skills[i].skill = i;
    }

    this.skills[3].xp = 1154;
    this.skills[3].lvl = 10;

    next();
});

module.exports = mongoose.model('User', userSchema, 'rsmod-users');
