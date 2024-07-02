function main(){
    console.log("Ta lendo")
    function generalListener(){
        let loginActive = false;
        let tarefaActive = false;
        const dropLoginBtn = document.querySelector('.drop-login');
        const dropTarefaBtn = document.querySelector('.drop-tarefa');
        const dropLoginMenu = document.querySelector('.dropdown-log')
        const dropTarefaMenu = document.querySelector('.dropdown-tarefa')
        
        dropLoginBtn.addEventListener('mouseover',()=>{
            dropLoginMenu.classList.toggle('show')    
            dropLoginMenu.style.display = 'flex'
                
            })
        dropLoginBtn.addEventListener('mouseout',()=>{
            setTimeout(disableLogin, 300)
        })

        dropLoginMenu.addEventListener('mouseover',()=>{
            dropLoginMenu.style.display = "flex"
            
            loginActive = true;
        })
        dropLoginMenu.addEventListener('mouseout',()=>{
            loginActive = false;
            setTimeout(disableLogin, 300)
        })

        function disableLogin(){
            loginActive? "" :  dropLoginMenu.style.display = "none";
                
        }
        
        dropTarefaBtn.addEventListener('mouseover',()=>{
            dropTarefaMenu.style.display = 'block'
        })
        dropTarefaBtn.addEventListener('mouseout',()=>{
            setTimeout(disableDropMenu, 300)
        })

        dropTarefaMenu.addEventListener('mouseover',()=>{
            tarefaActive = true;
        })

        dropTarefaMenu.addEventListener('mouseout',()=>{
            tarefaActive = false;
            setTimeout(disableDropMenu, 300);
        })

        /*dropTarefaMenu.addEventListener*/
    
        
        function disableDropMenu(){

            if(tarefaActive) {
                return
            }
            dropTarefaMenu.style.display = "none";

        }
    }
    generalListener()
        }

       

main()