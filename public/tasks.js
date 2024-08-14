 const selectedItens = [];
 function selectedTasks(id){
   if(selectedItens.includes(id)){
    selectedItens.splice(selectedItens.indexOf(id),1);
   }else{
    selectedItens.push(id);
   }
console.log(selectedItens)
if(selectedItens.length > 0){
    document.querySelector('.trash').style.display = 'inline-block';
} else {
    document.querySelector('.trash').style.display = 'none';
}
}

function excludeAll(){
    fetch('/tasks/delete', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            }, 
        body: JSON.stringify({itemIds: selectedItens}),

    }).then((response) =>response.json()).then((data)=>{
        console.log('Itens excluidos: ', data.deletedItens)
    }).catch((error)=>{console.error('Erro ao excluir os itens')})
}

    export {selectedTasks, excludeAll}

