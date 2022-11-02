// Either virtualize this or projects
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        name: String,
        details: String,
        priority: {
            type: String,
            enum: ['low', 'medium', 'high']
        },

        status: {
            type: String,
            enum: ['assigned', 'in progress', 'in review', 'completed']
        },

        timeline: {
            assigned: Date,
            due: Date,
            lastUpdated: Date
        },
    },

    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }

);

TaskSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'tasks'
})

TaskSchema.virtual('user', {
    ref: 'User',
    localField: '_id',
    foreignField: 'tasks'
})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;