
function updateStatus(alertDays, dueDate, priority){
    if(!dueDate)return "";
    const dateNow = new Date();
    const dateReq = new Date(dueDate);
    const difDays = Math.floor((dateReq - dateNow)/86400000);
    console.log(`a diferença de dias com vewnc para ${dueDate} é de ${difDays}`)
    if(difDays >= (3 + alertDays)){
     return 'Em dia';
    }else if(difDays > 0){
     return 'Entrega Proxima';
    }else if(difDays === 0){
     return "Ultimo Dia!"
 }else{
     return 'Atrasado';
    }
}

function dateFormat(date){
    if(!date)return '';
    const dateFormated = new Date(date)
    let day  = dateFormated.getDate() + 1;
    let month = dateFormated.getMonth() + 1;
    const year = dateFormated.getFullYear();
    if(day < 10)day = verifyZero(day);
    if(month < 10)month = verifyZero(month);
    function verifyZero(number){
        return `0${number}`
    }

       return `${day}/${month}/${year}`
}
exports.myMiddleware = (req, res, next)=>{
    res.locals.updateStatus = updateStatus;
    res.locals.dateFormat = dateFormat;
    res.locals.errors = req.flash('errors')
    res.locals.sucess = req.flash('sucess')
    res.locals.user = req.session.user;
    next()
}


exports.loginRequired = (req, res, next)=>{
    if(!req.session.user){
        req.flash('errors', 'Você precisa fazer login');
        req.session.save(() => res.redirect('/'));
    }
    next();
}
