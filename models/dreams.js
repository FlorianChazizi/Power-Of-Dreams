const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DreamsSchema = new Schema ({
    title: String,
    description: String,
    author: 
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    
});

module.exports = mongoose.model('Dreams', DreamsSchema);
