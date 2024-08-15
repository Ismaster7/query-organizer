const mongoose = require('mongoose'); // Importe da biblioteca para usar o mongoDB
const { isEmpty } = require('validator');

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    priority: {type: String, required: false, default: '1'},
    date: {type: Date, required: false, default: ''},
    status: {type: String, required: false, default: ''},
    alert: {type: String, required: false, default: '1'},
})

const TaskModel = mongoose.model('Task', TaskSchema);

class Task{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.task = null;

    }

   async register(){
        this.valid();
        if(this.errors > 0)return;
        this.statusConfig();
        this.task = await TaskModel.create(this.body);
        
    }
    
    async edit(id){
        this.valid();
        if(this.errors > 0)return;
        this.statusConfig();
        this.task = await TaskModel.findByIdAndUpdate(id, this.body, {new: true});

    }

    

    valid(){
        this.cleanUp()
        if(!this.body.date && this.body.alert)this.errors.push(`Necessário informar uma data para criar um alerta!`);
        if(this.body.date && !this.body.alert)this.body.alert = '1';

        if(Number.isNaN(parseInt(this.body.alert)))this.errors.push('Caracteres inválidos no campo de Alerta');
        if(parseInt(this.body.alert) <= 0 || parseInt(this.body.alert) > 60)this.errors.push('Insira um número entre 1 e 60 dias no campo de Alerta');
        
        //if(!this.isDate(this.body.date))this.errors.push('Informe uma data válida');

            //this.statusCase(this.body.date)
    }

    cleanUp(){
        for(const obj in this.body){
            if(typeof this.body[obj] !== 'string')this.body[obj] = '';
        };

        this.body = {
            title: this.body.title,
            description: this.body.description,
            priority: this.body.priority,
            date: this.body.date,
            status: '',
            alert: this.body.alert,
        }
        
        };

        statusConfig(){
            this.body.status = this.statusCase(this.body.date);
            if(this.body.alert === "") this.body.alert === '1';
        }

        
        statusCase(date){
            if(!date)return "";
           const dateNow = new Date();
           const dateReq = new Date(date);
           const difDays = this.convertToDay(dateReq - dateNow);
           if(difDays >= (3 + this.body.alert)){
            return 'Em dia';
           }else if(difDays > 0){
            return 'Entrega Proxima';
           }else if(difDays === 0){
            return "Ultimo Dia!"
        }else{
            return 'Atrasado';
           }

           }

        convertToDay(date){
            return Math.floor(date/86400000);

        }

        isDate(date){
            return date instanceof Date;
        }

        //metodos estaticos

        static async findById(id){
            if(typeof id !== 'string') return;
            const task = await TaskModel.findById(id);
            return task;
        }

        static async findTask(){
            const tasks = await TaskModel.find().sort({date: -1});
            return tasks;
        }
        static async delete(id){
            if(typeof id !== 'string')return;
            const tasks = await TaskModel.deleteMany({ _id: { $in: id } });
            return tasks
        }
        
    }



  module.exports = Task; 
  //  export default Task;
