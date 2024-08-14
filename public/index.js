
import {selectedTasks, excludeAll}  from './tasks.js'
 
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
            if(el.target.parentElement.className === 'line-table' && !(el.target.className === 'exclude')){
                modalScreenOn(el.target.parentElement.getAttribute('data-item'))
            }
            if(el.target.className === 'exclude'){
                
               selectedTasks(el.target.closest('.line-table').getAttribute('data-item'))

            }
            if(el.target.className === 'trash'){
                excludeAll();
            }
        })
        
        
        
        let valorNegativado = false;
       dropdown.addEventListener('click',()=>{
            completeDropdown.style.display = negative('block');
            console.log('clique')
       })

      function modalScreenOn(id){
        const campoData = document.querySelector('.modal-task input[type="date"]');
    const dataAtual = new Date().toISOString().slice(0, 10);
    campoData.min = dataAtual;
        document.querySelector('.modal-task').setAttribute('action', `/tasks/register`);
        document.querySelector('.modal-task input[type="submit"]').setAttribute('value','Cadastrar Tarefa')
        document.querySelector('.modal-task h1').innerHTML = 'Descreva sua Tarefa'
        
        if(!id){
            taskIncrementScreen.style.display = "flex";
            return
        }
        
        document.querySelector('.modal-task').setAttribute('action', `/tasks/edit/${id}`);
        document.querySelector('.modal-task input[type="submit"]').setAttribute('value','Atualizar Tarefa')
        document.querySelector('.modal-task h1').innerHTML = 'Atualize sua Tarefa'
        fillFields(id);
        taskIncrementScreen.style.display = "flex";

       }


       function fillFields(id){

        const tableDad = document.querySelector(`tr[data-item="${id}"]`);
        const tableSon = tableDad.querySelectorAll(':scope > *');
        const filhoPrioridade = document.querySelector('.modal-tasks-increment div form');
        console.log(tableSon)
            document.querySelector(".modal-tasks-increment div form input[name='title']").value = tableSon[0].innerHTML;
            document.querySelector(".modal-tasks-increment div form textarea[name='description']").value = tableSon[1].innerHTML;
        for(let i = 6; i< 11; i++){
            filhoPrioridade.children[i].checked = false;
        }
        const priority = parseInt(tableSon[2].innerHTML);
        if( priority === 1){
            filhoPrioridade.children[7].checked = true;
        }else if(priority === 2){
            filhoPrioridade.children[7 + priority].checked = true;
        }else{
            filhoPrioridade.children[7 + Math.floor(priority*1.6)].checked = true;
        }
       // const dataFormatada = new Date(tableSon[3].innerHTML);
       const dataFormatada = dateFormat(tableSon[3].innerHTML); 
       document.querySelector(".modal-tasks-increment div form input[name='date']").value = dataFormatada;
       document.querySelector(".modal-tasks-increment div form input[name='alert']").value = tableDad.getAttribute('alert-days');
        
       }
       function dateFormat(date){
        if(!date)return '';
        let day = date.slice(0, 2);
        let month = date.slice(3, 5);
        let year = date.slice(6, 10);
        
    
           return `${year}-${month}-${day}`
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
        for(let i=0; i < texto.length; i++){
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