// Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;

//Variáveis da velocidade da Bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raio = diametro / 2;

//Variáveis da minha raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis da raquete do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//colisão 
let colidiu = false

//Placar do jogo
let meusPontos = 0;
let pontoDoOponente = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Chances do oponente errar
let chanceDeErrar = 0;

function preload(){
  
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup(){
  createCanvas(600, 400);
  trilha.loop();
}

function draw(){
  background('#2F4F4F');
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
  marcaPonto();
  calculaChanceDeErrar()
}

function mostraBolinha(){ 
  
  circle(xBolinha, yBolinha, diametro);

}

function movimentaBolinha(){
  
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
  
}

function verificaColisao(){
  
  if (xBolinha + raio > width || xBolinha + (-raio) < 0){
    velocidadeXBolinha *= -1;
  }
  

  if (yBolinha + raio > height || yBolinha + (-raio) < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostraRaquete(x, y){
  
  rect(x, y, raqueteComprimento, raqueteAltura);
  
}

function movimentaMinhaRaquete(){
  
  if (keyIsDown(UP_ARROW)){
    
    yRaquete -= 10
    
  }
  if (keyIsDown(DOWN_ARROW)){
    
    yRaquete += 10
    
  }
  
}

function verificaColisaoRaquete(){
  
  if(xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
  
}

function colisaoRaqueteBiblioteca(x, y){
  
  colidiu = 
collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();

  }
}

function movimentaRaqueteOponente(){
  
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
  
}

function calculaChanceDeErrar(){
  if (pontoDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill ('#00FF7F');
  text(meusPontos, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill('#00FF7F');
  text(pontoDoOponente, 470, 26);
  
}

function marcaPonto(){
  
  if(xBolinha > 590){
    meusPontos += 1;
    ponto.play();
    
  }
  if(xBolinha < 10){
    
    pontoDoOponente += 1;
    ponto.play();
  }
  
}
