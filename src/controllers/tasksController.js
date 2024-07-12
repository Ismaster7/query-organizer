const Task = require("../models/TaskModel");

exports.index = (req, res)=>{
 res.render('tasks.ejs');
}

exports.register = async (req, res)=>{
    const task = new Task(req.body);
    await task.register();
    if(task.errors > 0){
        req.flash('errors', task.errors);
        req.session.save(()=> res.redirect('/tasks/index'));
        return
    }

}