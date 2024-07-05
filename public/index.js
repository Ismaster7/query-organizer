function main(){
    console.log("Ta lendo")
    function generalListener(){
       const dropdown = document.querySelector('.dropdown')
        const completeDropdown = document.querySelector('.complete-dropdown')
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
    generalListener()
        }

       

main()