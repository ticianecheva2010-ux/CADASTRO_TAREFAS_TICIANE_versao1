const entradaTarefa = document.getElementById("entrada-tarefa"); const botaoAdicionar = document.getElementById("botao-adicionar"); const listaTarefas = document.getElementById("lista-tarefas"); const contadorTarefas = document.getElementById("contador-tarefas"); const botaoTema = document.getElementById("botao-tema");

const botaoAlteracoes = document.getElementById("botao-alteracoes"); const painelAlteracoes = document.getElementById("painel-alteracoes"); const fecharAlteracoes = document.getElementById("fechar-alteracoes");

// SALVAR TAREFAS

let tarefasSalvas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarTarefas() { localStorage.setItem("tarefas", JSON.stringify(tarefasSalvas)); }

// FRASES MOTIVACIONAIS

const frases = [ "Bora começar! 💜", "Você consegue! ✨", "Vai dar tudo certo! 🌷", "Você está indo muito bem! 💜", "Continue assim! ⭐", "Tá quase lá! 👀", "Mais uma e você consegue! 🔥", "Orgulho de você! 🥹💜", "Você tá arrasando! ✨", "Não para agora! 💪", "Olha só o progresso! 🌟", "Quase terminando! 🎯", "Você é muito braba! 💜", "Papoi` 🐸", "TUDO CONCLUÍDO! 🎉" ];

// ATUALIZAR CONTADOR

function atualizarContador() { const total = listaTarefas.children.length; const concluidas = listaTarefas.querySelectorAll(".concluida").length; const pendentes = total - concluidas;

if (total === 0) { contadorTarefas.textContent = frases[0]; } else if (pendentes === 0) { contadorTarefas.textContent = frases[14]; } else { const porcentagem = Math.floor((concluidas / total) * 100);

if (porcentagem >= 75) { contadorTarefas.textContent = frases[11]; } else if (porcentagem >= 50) { contadorTarefas.textContent = frases[7]; } else if (porcentagem >= 25) { contadorTarefas.textContent = frases[4]; } else { contadorTarefas.textContent = frases[1]; } } }

// ANIMAÇÃO DOS MINIONS E EMOJIS

function soltarFesta() {

const emojis = ["🎉", "🥳", "🎊", "✨", "💜", "⭐"];

for (let i = 0; i < 12; i++) {

const minio = document.createElement("img");

minio.src = "minio.png"; minio.alt = "Minion"; minio.style.position = "fixed"; minio.style.top = "-100px"; minio.style.left = Math.random() * 100 + "vw"; minio.style.width = 50 + Math.random() * 40 + "px"; minio.style.zIndex = "9999"; minio.style.pointerEvents = "none";

document.body.appendChild(minio);

const duracao = 2500 + Math.random() * 1500;

minio.animate( [ { transform: "translateY(0) rotate(0deg)", opacity: 1 }, { transform: "translateY(110vh) rotate(360deg)", opacity: 0 } ], { duration: duracao, easing: "ease-in", fill: "forwards" } );

setTimeout(function () { minio.remove(); }, duracao); }

for (let i = 0; i < 18; i++) {

const emoji = document.createElement("div");

emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

emoji.style.position = "fixed"; emoji.style.top = "-50px"; emoji.style.left = Math.random() * 100 + "vw"; emoji.style.fontSize = 20 + Math.random() * 25 + "px"; emoji.style.zIndex = "10000"; emoji.style.pointerEvents = "none";

document.body.appendChild(emoji);

const duracao = 2000 + Math.random() * 1500;

emoji.animate( [ { transform: "translateY(0) rotate(0deg)", opacity: 1 }, { transform: "translateY(110vh) rotate(360deg)", opacity: 0 } ], { duration: duracao, easing: "ease-in", fill: "forwards" } );

setTimeout(function () { emoji.remove(); }, duracao); } }

// ADICIONAR TAREFA

function adicionarTarefa() {

const texto = entradaTarefa.value.trim();

if (texto === "") { alert("Digite uma tarefa!"); entradaTarefa.focus(); return; }

const item = document.createElement("li"); item.className = "item-tarefa";

const textoTarefa = document.createElement("span"); textoTarefa.textContent = texto;

const acoes = document.createElement("div"); acoes.className = "acoes-tarefa";

// CRIAR ID DA TAREFA

const idTarefa = Date.now().toString() + Math.random().toString(36).substring(2);

item.dataset.id = idTarefa;

// SALVAR TAREFA

tarefasSalvas.push({ id: idTarefa, texto: texto, concluida: false });

salvarTarefas();

// BOTÃO CONCLUIR

const botaoConcluir = document.createElement("button");

botaoConcluir.className = "botao-acao"; botaoConcluir.textContent = "✓"; botaoConcluir.title = "Concluir tarefa";

botaoConcluir.addEventListener("click", function () {

const concluidaAntes = item.classList.contains("concluida");

item.classList.toggle("concluida");

if (item.classList.contains("concluida")) {

botaoConcluir.textContent = "↩";

if (!concluidaAntes) { soltarFesta(); }

} else {

botaoConcluir.textContent = "✓"; }

// SALVAR STATUS DA TAREFA

const tarefa = tarefasSalvas.find( tarefa => tarefa.id === item.dataset.id );

if (tarefa) { tarefa.concluida = item.classList.contains("concluida");

salvarTarefas(); }

atualizarContador(); });

// BOTÃO EXCLUIR

const botaoExcluir = document.createElement("button");

botaoExcluir.className = "botao-acao excluir"; botaoExcluir.textContent = "🗑"; botaoExcluir.title = "Excluir tarefa";

botaoExcluir.addEventListener("click", function () {

// REMOVER DO SALVAMENTO

const index = tarefasSalvas.findIndex( tarefa => tarefa.id === item.dataset.id );

if (index !== -1) { tarefasSalvas.splice(index, 1); salvarTarefas(); }

item.remove(); atualizarContador(); });

acoes.appendChild(botaoConcluir); acoes.appendChild(botaoExcluir);

item.appendChild(textoTarefa); item.appendChild(acoes);

listaTarefas.appendChild(item);

entradaTarefa.value = "";

atualizarContador();

entradaTarefa.focus(); }

// BOTÃO ADICIONAR

botaoAdicionar.addEventListener("click", adicionarTarefa);

// ADICIONAR COM ENTER

entradaTarefa.addEventListener("keydown", function (evento) {

if (evento.key === "Enter") { adicionarTarefa(); }

});

// MODO ESCURO

botaoTema.addEventListener("click", function () {

document.body.classList.toggle("modoescuro");

if (document.body.classList.contains("modoescuro")) { botaoTema.textContent = "☀️"; } else { botaoTema.textContent = "🌙"; }

});

// BOTÃO DE ALTERAÇÕES

if (botaoAlteracoes && painelAlteracoes) {

botaoAlteracoes.addEventListener("click", function () {

painelAlteracoes.classList.toggle("aberto");

});

}

// FECHAR PAINEL

if (fecharAlteracoes && painelAlteracoes) {

fecharAlteracoes.addEventListener("click", function () {

painelAlteracoes.classList.remove("aberto");

});

}

// CARREGAR TAREFAS SALVAS

tarefasSalvas.forEach(function (tarefa) {

const item = document.createElement("li"); item.className = "item-tarefa"; item.dataset.id = tarefa.id;

const textoTarefa = document.createElement("span"); textoTarefa.textContent = tarefa.texto;

const acoes = document.createElement("div"); acoes.className = "acoes-tarefa";

// BOTÃO CONCLUIR

const botaoConcluir = document.createElement("button");

botaoConcluir.className = "botao-acao"; botaoConcluir.textContent = tarefa.concluida ? "↩" : "✓"; botaoConcluir.title = "Concluir tarefa";

if (tarefa.concluida) { item.classList.add("concluida"); }

botaoConcluir.addEventListener("click", function () {

const concluidaAntes = item.classList.contains("concluida");

item.classList.toggle("concluida");

if (item.classList.contains("concluida")) {

botaoConcluir.textContent = "↩";

if (!concluidaAntes) { soltarFesta(); }

} else {

botaoConcluir.textContent = "✓"; }

tarefa.concluida = item.classList.contains("concluida");

salvarTarefas();

atualizarContador(); });

// BOTÃO EXCLUIR

const botaoExcluir = document.createElement("button");

botaoExcluir.className = "botao-acao excluir"; botaoExcluir.textContent = "🗑"; botaoExcluir.title = "Excluir tarefa";

botaoExcluir.addEventListener("click", function () {

const index = tarefasSalvas.findIndex( t => t.id === tarefa.id );

if (index !== -1) { tarefasSalvas.splice(index, 1); salvarTarefas(); }

item.remove(); atualizarContador(); });

acoes.appendChild(botaoConcluir); acoes.appendChild(botaoExcluir);

item.appendChild(textoTarefa); item.appendChild(acoes);

listaTarefas.appendChild(item); });

// INICIAR

atualizarContador();