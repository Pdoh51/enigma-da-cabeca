const senhas = ["1", "1", "1", "1", "1"];
let faseAtual = 0;
let mensagemTimeout = null;

function verificarSenha() {
  const senhaDigitada = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagem");
  const cadeadosContainer = document.getElementById("cadeados");

  clearTimeout(mensagemTimeout);
  mensagem.classList.remove("ocultar");
  mensagem.style.opacity = "1";

  if (senhaDigitada === senhas[faseAtual]) {
    const cadeado = document.getElementById(`cadeado${faseAtual}`);
    cadeado.src = "./src/img/cadeado_aberto.png";
    cadeado.classList.add("verde");

    const acertoAudio = document.getElementById("acertoAudio");
    const musica = document.getElementById("musicaFase");

    if (musica) {
      musica.pause();
      musica.currentTime = 0;
    }

    if (acertoAudio) {
      acertoAudio.currentTime = 0;
      acertoAudio.play();

      acertoAudio.onended = () => {
        if (musica) {
          if (faseAtual + 1 < 7) {
            musica.src = `./src/audio/music_fase_${faseAtual + 1}.mp3`;
          }
          musica.loop = true;
          musica.play();
        }
      };
    }

    faseAtual++;

    if (faseAtual < senhas.length) {
      mensagem.textContent = `Senha correta!`;
      mensagem.style.color = "green";
      document.getElementById("senha").value = "";
      mostrarCursor();
      mostrarConteudoFase(faseAtual + 1);
      atualizarFaseVisual(faseAtual + 1);

      mensagemTimeout = setTimeout(() => {
        mensagem.style.opacity = "0";
      }, 3000);
    } else {
      mensagem.textContent = "Você completou o desafio!";
      mensagem.style.color = "green";
      document.querySelector(".linha-senha").style.display = "none";
      document.querySelector(".dica").style.display = "none";
      document.querySelector(".resposta-fase-container").style.display = "none";
      mensagem.style.marginTop = "120px";
      cadeadosContainer.style.marginTop = "140px";

      mensagemTimeout = setTimeout(() => {
        mensagem.style.opacity = "0";
        cadeadosContainer.style.opacity = "0";

        // Esconde a dica e o conteúdo das fases
        const dica = document.querySelector(".dica");
        const respostaContainer = document.querySelector(".resposta-fase-container");

        if (dica) dica.style.display = "none";
        if (respostaContainer) respostaContainer.style.display = "none";
      }, 7000);

      mensagemTimeout = setTimeout(() => {
      document.getElementById("video_parabens").style.display = "block";
    }, 7500);
  }
} else {
  mensagem.textContent = `Senha incorreta!`;
  mensagem.style.color = "red";

  const erroAudio = document.getElementById("erroAudio");
  if (erroAudio) {
    erroAudio.currentTime = 0;
    erroAudio.play();
  }

  mensagemTimeout = setTimeout(() => {
    mensagem.style.opacity = "0";
  }, 3000);
}
}

const video = document.getElementById("video_parabens");

// Ao clicar no vídeo, ele começa ou reinicia
video.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.currentTime = 0;
    video.play();
  }
});

// Quando terminar, volta para o início e espera novo clique
video.addEventListener("ended", () => {
  video.currentTime = 0;
});

function mostrarConteudoFase(fase) {
  const todasAsFases = document.querySelectorAll(".resposta-fase");
  todasAsFases.forEach(div => (div.style.display = "none"));

  const ativa = document.querySelector(`.fase_${fase}`);
  if (ativa) {
    ativa.style.display = "block";
  }
}

function atualizarFaseVisual(fase) {
  const container = document.querySelector(".container");
  container.classList.remove("fase-1", "fase-2", "fase-3", "fase-4", "fase-5");
  container.classList.add(`fase-${fase}`);
}

function esconderCursor() {
  document.getElementById("cursor").style.display = "none";
}

function mostrarCursor() {
  const senha = document.getElementById("senha").value;
  const cursor = document.getElementById("cursor");
  cursor.style.display = senha === "" ? "inline" : "none";
}

document.getElementById("senha").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    verificarSenha();
  }
});

window.onload = function () {
  document.getElementById("senha").focus();
  mostrarConteudoFase(1);
  atualizarFaseVisual(1);
};

// Inicia música ao clicar em "Abrir presente"
document.getElementById("botaoIniciar").addEventListener("click", () => {
  const musica = document.getElementById("musicaFase");
  const tela = document.getElementById("telaBoasVindas");

  if (musica) {
    musica.currentTime = 0;
    musica.loop = true;
    musica.play();
  }

  tela.style.display = "none";
});

// Para a música ao sair ou recarregar a página
window.addEventListener("beforeunload", () => {
  const musica = document.getElementById("musicaFase");
  if (musica) {
    musica.pause();
    musica.currentTime = 0;
  }
});

document.addEventListener("visibilitychange", () => {
  const musica = document.getElementById("musicaFase");
  if (document.hidden && musica) {
    musica.pause();
    musica.currentTime = 0;
  } else if (!document.hidden && musica && musica.paused) {
    musica.play().catch(() => {
      document.body.addEventListener("click", () => musica.play(), { once: true });
    });
  }
});

// Reinicia a música se o usuário voltar para a aba
document.addEventListener("visibilitychange", () => {
  const musica = document.getElementById("musicaFase");
  if (!document.hidden && musica && musica.paused) {
    musica.play().catch(() => {
      document.body.addEventListener("click", () => musica.play(), { once: true });
    });
  }
});

// ... outras funções como verificarSenha, mostrarConteudoFase, etc.

// Reinicia a música se o usuário voltar para a aba
document.addEventListener("visibilitychange", () => {
  const musica = document.getElementById("musicaFase");
  if (!document.hidden && musica && musica.paused) {
    musica.play().catch(() => {
      document.body.addEventListener("click", () => musica.play(), { once: true });
    });
  }
});

let mamacoEstado = 0;
let mamacoEstado2 = 0;
let mamacoEstado3 = 0;
let mamacoEstado4 = 0;
let mamacoEstado5 = 0;
let intervaloDigitacao = null;
let textoCompleto = "";
let pulando = false;

// Função para digitar texto como em jogo de diálogo
function digitarMensagem(texto, elementoId, velocidade = 40) {
  const elemento = document.getElementById(elementoId);
  elemento.textContent = "";
  elemento.style.display = "block";

  textoCompleto = texto;
  pulando = false;
  let i = 0;

  clearInterval(intervaloDigitacao);
  intervaloDigitacao = setInterval(() => {
    if (pulando) {
      elemento.textContent = textoCompleto;
      clearInterval(intervaloDigitacao);
      return;
    }

    if (i < texto.length) {
      elemento.textContent += texto.charAt(i);
      i++;
    } else {
      clearInterval(intervaloDigitacao);
    }
  }, velocidade);
}

// Permite pular a digitação ao clicar na mensagem
document.getElementById("mensagemMamaco").addEventListener("click", () => {
  pulando = true;

  // Simula o clique no Nokia
  document.querySelector(".nokia").click();
});

document.querySelector(".nokia").addEventListener("click", () => {
  const imagemMamaco = document.querySelector(".nokia");
  const mensagem = document.getElementById("mensagemMamaco");

  if (faseAtual === 0) {
    if (mamacoEstado === 0) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Fala meu gorilão! Como que vai? tá precisando de uma ajuda nos enigmas aí?", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 1) {
      digitarMensagem("Hmmmmm deixa eu pensar aqui numa dica aqui pra você.", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 2) {
      digitarMensagem("Já sei! A resposta é um número, essa aí é difícil de pensar em, boa sorte aí.", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 3) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado += 1;
    } else if (mamacoEstado === 4) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Opa, tá querendo outra dica? Beleza, deixa eu pensar aqui hmmmmmm...", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 5) {
      digitarMensagem("Que tal essa, a senha é um número quebrado, com essa aí com certeza você acerta.", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 6) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado += 1;
    } else if (mamacoEstado === 7) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Oloco, tá querendo mais uma dica? Se sabe que é pra você fazer e não eu né? Mas tudo bem, deixa eu pensar aqui em outra dica hmmmmmm...", "mensagemMamaco");
      mamacoEstado += 1;
    } else if (mamacoEstado === 8) {
      digitarMensagem("O enigma é um labirinto e num labirinto você não fica parando, só vai direto pra saída e no final vé a resposta, entendeu? Se não aí o mamaco não sou só eu aqui, mas confio em você pra isso. Se for querer outra dica só vou ficar repetindo as mesmas coisas, quem tem que achar a resposta é tu não eu, boa sorte.", "mensagemMamaco");
      mamacoEstado += 1;
    } else {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado = 0;
    }
  } else if (faseAtual === 1) {
    if (mamacoEstado2 === 0) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Fala gorilão! Tô vendo aqui que você conseguiu passar de fase, meus parabéns sabia que você iria conseguir.", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 1) {
      digitarMensagem("Tá querendo uma dica agora né? Deixa eu pensar aqui hmmmm...", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 2) {
      digitarMensagem("A resposta da fase é a resposta das 3 perguntas tudo junto, sem espaço.", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 3) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 4) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Já quer outra dica? Beleza, deixa eu pensar hmmmmmm...", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 5) {
      digitarMensagem("Presta atenção na música e no contexto do texto, as respostas vão estar na origem desses 2.", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 6) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado2 += 1;
    } else if (mamacoEstado2 === 7) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Última dica em. As respostas são todas números e se você não percebeu ainda, as respostas estão no Clash Royale. Se tá difícil vai reclamar com quem fez essa merda.", "mensagemMamaco");
      mamacoEstado2 += 1;
    } else {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado2 = 0;
    }
  } else if (faseAtual === 2) {
    if (mamacoEstado3 === 0) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Fala golira! Parabéns pela última em, mas agora se tá fudidu essa tá em nerdes.", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 1) {
      digitarMensagem("Esse é complicado, deixa eu pensar numa dica aqui hmmmm...", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 2) {
      digitarMensagem("Essa aí pelo que me falaram a resposta é só traduzir esse texto e mandar ele inteiro.", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 3) {
      digitarMensagem(".............. hmmmmmmm ..............", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 4) {
      digitarMensagem("Pediram aqui também pra você não usar gpt ou pesquisar pra traduzir, se não mamaco não ganha banana e nerd que fez esse enigma fica triste, mas confio que você não vai fazer isso, né?", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 5) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 6) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Nerdes é difícil né? Mas eu te ajudo, deixa eu pensar aqui hmmmmm...", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 7) {
      digitarMensagem("Nesse texto tem alguns espaços de escrita, pra separar palavras e tals, eles são 00100000, 040 e 20, aí tu tenta resolver alguma coisa com isso.", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 8) {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 9) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Os orangotangos da sabedoria aqui perceberam que é meio complicado traduzir isso aí sem pesquisar. O que você não fez né? Bom, não importa muito, se você tá me ligando de novo não deve ter pesquisado, então eles me mandaram te entregar uma coisa aqui, deve chegar daqui a pouco...", "mensagemMamaco");
      mamacoEstado3 += 1;
    } else if (mamacoEstado3 === 10) {
      digitarMensagem("Opa! chegou aí né? Agora eu acho que da pra fazer de boa. Aliás essa foi a última dica tá, depois disso só vou repetir.", "mensagemMamaco");
      document.getElementById("imagemAlfabeto").style.display = "block";
      mamacoEstado3 += 1;
    } else {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado3 = 0;
    }
  } else if (faseAtual === 3) {
    if (mamacoEstado4 === 0) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      document.getElementById("imagemAlfabeto").style.display = "none";
      digitarMensagem("4", "mensagemMamaco");
      mamacoEstado4 += 1;
    } else if (mamacoEstado4 === 1) {
      digitarMensagem("Hmmmmm deixa eu pensar aqui numa dica pra você.", "mensagemMamaco");
      mamacoEstado4 += 1;
    } else {
      imagemMamaco.src = "./src/img/nokia.gif";
      mensagem.style.display = "none";
      mamacoEstado4 = 0;
    }
  } else if (faseAtual === 4) {
    if (mamacoEstado5 === 0) {
      imagemMamaco.src = "./src/img/mamaco.gif";
      digitarMensagem("Aí já tá de sacanagem, não faço ideia de como resolver, não tão me pagando bananas o suficiente pra tudo isso de ligação, nunca vi um mamaco tão burro quanto eu, pode falar pra eles que eu me demito, thau!", "mensagemMamaco");
      mamacoEstado5 += 1;
    } else {
      imagemMamaco.style.display = "none";
      mensagem.style.display = "none";
    }
  }
});