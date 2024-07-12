const mongoose = require('mongoose'); // Importe da biblioteca para usar o mongoDB
const validator = require('validator'); //Imp orte biblioteca para validar formatos de email
const bcryptjs = require('bcryptjs');  // Biblioteca para criptografar senhas

const LoginSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login(){
        this.valida('login')
        if(this.errors.length > 0) return;
        await this.userLoginExists();
    }

   async register(){
        this.valida('cadaster')
        if(this.errors.length > 0)return;
        console.log('novamente, não há erros')

        await this.userExists();

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
      
        
        this.user = await LoginModel.create(this.body)
       
    }
    async userLoginExists(){
         this.user = await LoginModel.findOne({email: this.body.email})
        if(!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)){
            this.user = null;
            this.errors.push('E-mail ou senha incorretos!');
            
        }else{

        }

    }
    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email})
        if(user)this.errors.push('E-mail já cadastrado!')
    }
    valida(loginType){
        this.cleanUp(loginType)
        if(loginType === 'cadaster'){
            if(this.body.password !== this.body.passwordConfirm || this.body.email !== this.body.emailConfirm)this.errors.push('Senha ou e-mail não estão coincidindo!');
        }
        if(!validator.isEmail(this.body.email))this.errors.push('E-mail Inválido!');
        console.log(this.errors);
        if(this.body.password.length < 3 || this.body.password.length > 50 ){
            
        }
    }

    cleanUp(loginType){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        if(loginType === 'cadaster'){
            this.body = {
                email: this.body.email,
                password: this.body.password,
                emailConfirm: this.body.emailConfirm,
                passwordConfirm: this.body.passwordConfirm
            }
        }else{
            this.body = {
                email: this.body.email,
                password: this.body.password,
            }
        }

       
    }


    
}

module.exports = Login;

