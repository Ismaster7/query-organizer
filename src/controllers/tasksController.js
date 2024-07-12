const Task = require("../models/TaskModel");

exports.index = (req, res)=>{
 res.render('tasks.ejs');
}

exports.register = async (req, res)=>{
    try{
        console.log('instanciei')
    const task = new Task(req.body);
    console.log('chamei a func register')
    await task.register();
    console.log('retornou do register')
    if(task.errors > 0){
        req.flash('errors', task.errors);
        console.log('tivemos erro')
        req.session.save(()=> res.redirect('/tasks/index'));
        return
    }
        console.log('tivemos sucesso. Agora será apenas redirecionado')
        req.flash('sucess', 'Tarefa Registrada com Sucesso!');
        req.session.save(()=> res.redirect('/tasks/index'));
    }catch(e){
        return res.render('404.ejs')
    }
    

}