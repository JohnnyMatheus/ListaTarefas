const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks')
let minhaListaDeItens = [];

function adicionarNovaTarefa() {

    if (input.value.trim() === '') {
       
        alert('ADICIONA UMA TAREFA SEU VAGABUNDO');
        return; 
    }

    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })
    mostrarTarefas();
    input.value = '';
}

function mostrarTarefas() {

    let novaLi = '';
    minhaListaDeItens.forEach((item, posicao) => {
        novaLi = novaLi +
            `
    <li class="task ${item.concluida && "done"}">
         <img src="assets/img/check.svg" alt="check" onclick="concluirTarefa(${posicao})">
             <p>${item.tarefa}</p>
             <img src="assets/img/delete.svg" alt="deletar" onclick="deletarItem(${posicao})">
    </li>  
    
    `
    })

    listaCompleta.innerHTML = novaLi;
    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida;
    mostrarTarefas();
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1);
    mostrarTarefas();
    console.log(posicao);
}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista');
    if (tarefasDoLocalStorage) {


        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage);
    }
    mostrarTarefas();
}
recarregarTarefas();
button.addEventListener('click', adicionarNovaTarefa);