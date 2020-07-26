const mongoose = require('mongoose');

const entrySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    totalIncome: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
},
{timestamps: true}  //IMPLICITLY ADDS TIME STAMPS
);

module.exports = mongoose.model('entrie', entrySchema);