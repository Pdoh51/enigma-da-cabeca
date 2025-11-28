// Seletores principais
const upload = document.querySelector('.upload');       // input de arquivo
const preview = document.querySelector('.preview');     // área de preview clicável
const previewImg = document.querySelector('.preview_img'); // imagem do preview
const modal = document.getElementById('crop-modal');    // modal de corte
const modalImg = document.getElementById('modal-img');  // imagem dentro da modal
const confirmar = document.getElementById('confirmar'); // botão confirmar
const cancelar = document.getElementById('cancelar');   // botão cancelar
const result = document.getElementById('result');       // área para mostrar resultado
let cropper;                                            // instância do Cropper

// Abrir seletor ao clicar no preview
preview.addEventListener('click', () => upload.click());

// Quando o usuário escolhe uma imagem
upload.addEventListener('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
        modalImg.src = e.target.result;

        // Espera a imagem carregar antes de iniciar o Cropper
        modalImg.onload = () => {
            modal.style.display = 'flex';       // abre modal
            if (cropper) cropper.destroy();     // limpa instância anterior
            cropper = new Cropper(modalImg, {
                aspectRatio: 1,       // corte quadrado fixo
                viewMode: 2,          // impede que o corte ultrapasse a imagem
                autoCrop: true,
                movable: true,        // permite mover o quadrado
                zoomable: true,       // permite aumentar/diminuir
                scalable: false,      // não distorce
                rotatable: false,     // não gira
                background: false,    // remove fundo quadriculado
                guides: true,         // mostra linhas de guia
                highlight: true,      // destaca área de corte
                cropBoxResizable: true, // permite redimensionar o quadrado
                cropBoxMovable: true    // permite mover o quadrado
            });
        };
    };
    reader.readAsDataURL(file);
});

// Confirmar corte
confirmar.addEventListener('click', () => {
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas();
    if (!canvas) return;

    
    // Atualiza apenas o preview principal com o recorte
    previewImg.src = canvas.toDataURL('image/jpeg', 0.9);

    // Fecha modal e destrói instância
    modal.style.display = 'none';
    cropper.destroy();
    cropper = null;
    upload.value = ''; // limpa o input para permitir reescolher a mesma imagem
});

// Cancelar e escolher outra imagem
cancelar.addEventListener('click', () => {
    modal.style.display = 'none'; // fecha modal
    upload.value = '';            // limpa input
    upload.click();               // reabre seletor
});


//------------------------------------------------------------------------------

const botoesPrincipais = document.querySelectorAll('.botao_lista');

botoesPrincipais.forEach(botaoPrincipal => {
    const targetSelector = botaoPrincipal.dataset.target;
    const lista = document.querySelector(targetSelector);
    const botoesLista = lista.querySelectorAll('button');

    // Mostra/esconde a lista ao clicar no botão principal
    botaoPrincipal.addEventListener('click', () => {
        if (lista.style.display === 'none' || lista.style.display === '') {
            lista.style.display = 'flex';
        } else {
            lista.style.display = 'none';
        }
    });

    // Ação ao clicar em cada botão da lista
    botoesLista.forEach(botao => {
        botao.addEventListener('click', () => {
            console.log("Você escolheu:", botao.textContent);
            botaoPrincipal.textContent = botao.textContent;
            lista.style.display = 'none'; // fecha a lista depois da escolha
        });
    });
});

//--------------------------------------------------------------------------------------------------------------------

const criarArquivoBtn = document.querySelector('.criar_arquivo');
const listaArquivos = document.querySelector('.lista_arquivos');
const menu = document.querySelector('.menu_principal');
const editor = document.querySelector('.editor_principal');
const voltarBtn = document.querySelector('.voltar_menu');

let arquivos = [];
let arquivoAtual = null;

// Criar novo arquivo
criarArquivoBtn.addEventListener('click', () => {
    const novoArquivo = {
        id: Date.now(),
        nome: 'Arquivo vazio*',
        dados: {}
    };

    arquivos.push(novoArquivo);
    renderizarArquivos();
});

// Renderizar lista de arquivos
function renderizarArquivos() {
    listaArquivos.innerHTML = '';

    arquivos.forEach(arquivo => {
        const card = document.createElement('div');
        card.className = 'arquivo_card';

        card.innerHTML = `
            <span>${arquivo.nome}</span>
            <button class="abrir_btn" data-id="${arquivo.id}">Abrir</button>
        `;

        listaArquivos.appendChild(card);
    });

    // botão abrir
    document.querySelectorAll('.abrir_btn').forEach(botao => {
        botao.onclick = () => abrirArquivo(botao.dataset.id);
    });
}

// Abrir arquivo
function abrirArquivo(id) {
    arquivoAtual = arquivos.find(a => a.id == id);
    if (!arquivoAtual) return;

    menu.classList.remove('ativo');
    menu.classList.add('oculto');
    editor.classList.remove('oculto');
    editor.classList.add('ativo');

}

// Capturar digitação apenas uma vez
document.querySelectorAll('.digitacao').forEach(campo => {
    campo.addEventListener('input', e => {
        if (arquivoAtual) {
            arquivoAtual.dados[e.target.id] = e.target.value;

            // Atualiza o nome do arquivo no menu quando o campo Nome muda
            if (e.target.id === 'Nome') {
                arquivoAtual.nome = e.target.value.trim() || 'Arquivo vazio*';
            }

        }
    });
});

// Voltar ao menu
voltarBtn.addEventListener('click', () => {
    editor.classList.remove('ativo');
    editor.classList.add('oculto');
    menu.classList.remove('oculto');
    menu.classList.add('ativo');

    renderizarArquivos();
});

//---------------------------------------------------------------------------------------

