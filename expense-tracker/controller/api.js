const Entry = require('../model/entry.js');

exports.getEntries = (req, res, next)=>{
    const userId = req.params.userId;
    Entry.find({userId: userId}).then(entries=>{
        res.status(200).json({entries: entries});
    }).catch(err=>console.log(err));
}

exports.postValue = (req, res, next)=>{
    const userId = req.params.userId;
    const { text, amount, totalAmount, totalIncome, totalExpense } = req.body;
    console.log(userId);
    const entry = new Entry({
        title: text,
        amount: amount,
        totalAmount: totalAmount,
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        userId: userId
    })
    entry.save().then(result=>{
        res.status(200).json({message: 'data recorded', data: result});
    }).catch(err=>console.log(err));
}