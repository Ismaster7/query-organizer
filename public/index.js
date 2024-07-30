
import {Task} from '../src/models/TaskModel.js' 


function main(){
    let acumulador = 0;
    const elemento = document.querySelector('.texto-interativo');
    const btnAddTask = document.querySelector('.tasks-add');
    const taskIncrementScreen = document.querySelector('.modal-tasks-increment');
    
    function generalListener(){
        
       const dropdown = document.querySelector('.dropdown')
        const completeDropdown = document.querySelector('.complete-dropdown')
        
        if(btnAddTask)btnAddTask.addEventListener('click',()=>{
            modalScreenOn();
        })

        window.addEventListener('click',(el)=>{
            if(el.target === taskIncrementScreen){
                modalScreenOff();
            }
            if(el.target.parentElement.className === 'line-table'){
                modalEdition(el.target.parentElement.getAttribute('data-item'))
            }
        })

        
        
        let valorNegativado = false;
       dropdown.addEventListener('click',()=>{
            completeDropdown.style.display = negative('block');
            console.log('clique')
       })

       async function modalScreenOn(id){
        document.querySelector('.modal-task').setAttribute('action', '/tasks/register');
        if(!id){
            taskIncrementScreen.style.display = "flex";
            return
        }
        try{
            const task = await Task.findById(id);
        }catch(e){
            alert('Erro ao buscar essa tarefa')
            return
        }
        document.querySelector('.modal-task').setAttribute('action', '/tasks/edit');

        taskIncrementScreen.style.display = "flex"
        fillFields()
        document.querySelector('.modal-task').setAttribute('action', '/tasks/register');
       }
       function fillFields(){
        document.querySelector('.modal-task').children.forEach(element => {
            if(element.getAttribute('name') === 'title'){
                element = 'julio';
            }
        });
       }


       function modalScreenOff(){
        taskIncrementScreen.style.display = "none";
       }

       function negative(blockOrFlex){
        valorNegativado = !valorNegativado;
        if(valorNegativado){
            dropdown.innerHTML = "x"
            return blockOrFlex === 'block'? 'block' : 'flex'
        }else{
            dropdown.innerHTML = "☰"
            return 'none'
        }
       }
    }
    function digitacao(texto, tempo){
        setTimeout(()=>{
            elemento.innerHTML = "";
        for(i=0; i < texto.length; i++){
            acumulador = 75*i;
            setTimeout(write, acumulador, texto[i])
        }

        }, tempo)
            
        };
    function write(letra){
        elemento.innerHTML += letra;
    }
    function digitacaoCompleta(){
        let tempo = 1500;
        digitacao('Estudar Html', tempo);
        tempo*=2;
       digitacao('Encontrar sapato perdido', tempo);
        tempo*=2;
       digitacao('Regar as plantas', tempo);
        tempo*=1.2;
        digitacao('Praticar Música', tempo);
       const timer = setTimeout(digitacaoCompleta, tempo);

    }

    

    generalListener()
    if(elemento)digitacaoCompleta()
        }

       

main()