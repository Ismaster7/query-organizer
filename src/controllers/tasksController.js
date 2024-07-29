const Task = require("../models/TaskModel");

exports.index = async (req, res)=>{
    const tasks = await Task.findTask();
    //if(tasks === 'undefined') tasks = {title: 'example', description: 'example', priotity: 'example', date: '01/01/2000', status: 'example'}
    res.render('tasks.ejs', {tasks});
}




exports.register = async (req, res)=>{
    try{
    const task = new Task(req.body);
    await task.register();
    if(task.errors > 0){
        req.flash('errors', task.errors);
        req.session.save(()=> res.redirect('/tasks/index'));
        return
    }
        req.flash('sucess', 'Tarefa Registrada com Sucesso!');
        req.session.save(()=> res.redirect('/tasks/index'));
    }catch(e){
        return res.render('404.ejs')
    }
    

}