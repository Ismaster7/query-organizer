function main(){
    let acumulador = 0;
    const elemento = document.querySelector('.texto-interativo');
    const btnAddTask = document.querySelector('.tasks-add');
    const taskIncrementScreen = document.querySelector('.modal-tasks-increment');
    function generalListener(){
        
       const dropdown = document.querySelector('.dropdown')
        const completeDropdown = document.querySelector('.complete-dropdown')
        
        if(btnAddTask)btnAddTask.addEventListener('click',()=>{
            taskIncrementScreen.style.display = "flex";
        })

        window.addEventListener('click',(el)=>{
            if(el.target === taskIncrementScreen){
                taskIncrementScreen.style.display = "none";
            }
        })
        
        let valorNegativado = false;
       dropdown.addEventListener('click',()=>{
            completeDropdown.style.display = negative('block');
            console.log('clique')
       })

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