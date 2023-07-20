const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criali() {//A função criali é definida para criar um elemento <li> (item de lista) e retorná-lo.
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function (e) {// Para ativar afunção quanto a tecla enter for apertada
    if (e.keyCode === 13) {//Dentro dessa função, é verificado se a tecla pressionada tem um código de tecla igual a 13, que é o código da tecla Enter
        if (!inputTarefa.value) return;//verifica-se se o inputTarefa não está vazio
        criaTarefa(inputTarefa.value);//Chama a função criaTarefa, passando o valor do inputTarefa como argumento.
    }
})

function limpaInput() {// A função limpaInput é definida para limpar o valor do inputTarefa definindo-o como uma string vazia. Em seguida, o foco é colocado novamente no inputTarefa usando o método focus().
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaBotaoApagar(li) {//criar botão apagar
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('Class', 'apagar');//Para adicionar uma class no botão
    botaoApagar.setAttribute('title', 'Apagar está tarefa')//Para adicionar um titulo
    li.appendChild(botaoApagar);
}

function criaTarefa(textoInput) {//A função criaTarefa é definida para criar uma nova tarefa. Ela chama a função criali para criar um novo elemento <li>, define o texto do elemento como o valor passado como argumento (textoInput), adiciona esse elemento como um filho do elemento tarefas e, em seguida, chama a função limpaInput para limpar o inputTarefa.
    const li = criali();
    li.innerText = textoInput;
    tarefas.appendChild(li);
    limpaInput()
    criaBotaoApagar(li)
    salvarTarefas()
}

btnTarefa.addEventListener('click', function (e) {// Quando o botão for clicado, a função anônima passada como segundo argumento será executada
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});
document.addEventListener('click',function(e){
    const el = e.target;

if(el.classList.contains('apagar')){
el.parentElement.remove()
salvarTarefas()
}}
)

function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li')
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas',tarefasJSON)
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);

    for(let tarefa of listaDeTarefas){
        criaTarefa(tarefa)
    }
}
adicionaTarefasSalvas();