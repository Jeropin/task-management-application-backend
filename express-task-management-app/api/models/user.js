const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        fname: String,
        lname: String,
        position: String,
        isActive: Boolean,
        tasks: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Task'
        }]
    },

    {
        toJSON: {virtuals: true},
        toObject: {virtuals: true}
    }  
);

UserSchema.virtual('project', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'users'
})

const User = mongoose.model('User', UserSchema);

module.exports = User;