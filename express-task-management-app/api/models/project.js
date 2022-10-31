const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        index: {
            unique: true,
            collation: {locale: 'en_US', strength: 1}
        }
    },
    description: String,
    respository: String,
    
    manager: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task'
    }],

    users: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project;