let index = 0;
const audio = document.querySelector("audio");
const botao = document.querySelector(".botao-play");
const proximo = document.querySelector(".fa-forward-fast");
const anterior = document.querySelector(".fa-backward-fast");
const capa = document.querySelector("img")
const player = document.querySelector(".player");
const musicas = document.querySelectorAll(".musicas");
const progresso = document.querySelector("progress");
const tempoAtualDom = document.querySelector(".inicio");
const tempoTotal = document.querySelector(".fim");

audio.addEventListener("timeupdate", () => {
  const tempoAtual = audio.currentTime;
  const duracao = audio.duration;

  progresso.value = (tempoAtual / duracao) * 100;

  const minutos = Math.floor(tempoAtual / 60).toString().padStart(2, "0")
  const segundos = Math.floor(tempoAtual % 60).toString().padStart(2, "0")

  tempoAtualDom.textContent = `${minutos}:${segundos}`;

  const minutosTotal = Math.floor(duracao / 60).toString().padStart(2, "0")
  const segundosTotal = Math.floor(duracao % 60).toString().padStart(2, "0")

  tempoTotal.textContent = `${minutosTotal}:${segundosTotal}`;
});

const tocarMusica = (src) => {
  audio.src = src;
  audio.load();
  audio.play();

  botao.classList.remove("fa-play");
  botao.classList.add("fa-pause");
};

botao.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    botao.classList.remove("fa-play");
    botao.classList.add("fa-pause");
  } else {
    audio.pause();
    botao.classList.remove("fa-pause");
    botao.classList.add("fa-play");
  }
});

musicas.forEach((element) => {
  element.addEventListener("click", () => {
    const src = element.getAttribute("data-src");
    tocarMusica(src);
    atualizarCapa(element);
  });
});

proximo.addEventListener("click", () => {
  index++;

  if (index >= musicas.length) {
    index = 0;
  }

  const elementoAtual = musicas[index];
  const src = elementoAtual.getAttribute("data-src");

  tocarMusica(src);
  atualizarCapa(elementoAtual);
});

anterior.addEventListener("click", () => {
  index--;

  if (index < 0) {
    index = musicas.length - 1;
  }

  const elementoAtual = musicas[index];
  const src = musicas[index].getAttribute("data-src");

  tocarMusica(src);
  atualizarCapa(elementoAtual);
});


const atualizarCapa = (element) => {
  const src = element.getAttribute("data-img");
  capa.src = src;
}


