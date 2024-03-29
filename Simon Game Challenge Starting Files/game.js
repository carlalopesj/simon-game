
var gamePattern = [];

//Criando as cores dos botões
const buttonColours = ["red", "blue", "green", "yellow"];

//Armazenando o valor clicado
var userClickedPattern = [];

//Variável booleana para começo do jogo
var started = false;

var level = 0;

//Recebendo se algum tecla do teclado foi teclado em todo o documento
$(document).keypress(function() {

    if (!started) {
        $("#level-title").text("Level " + level); //Mudança do h1 para o nível
        nextSequence(); //Chamando a função para iniciar
        started = true //Começou o jogo
    }

});

//Detectar o botão
$(".btn").click(function() {
    
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    console.log("Clicou " + userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    
    console.log(userClickedPattern);
    
});


//Gerando a sequência
function nextSequence() {
    userClickedPattern = []; //Zera a lista dos botões clicados pelo usuário

    //Indicando o nível
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    //Definindo a cor escolhida
    var randomChosenColour = buttonColours[randomNumber];
    //Adicionando a cor escolhida ao array dos padrões
    gamePattern.push(randomChosenColour);
    //Efeito Flash
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //Adicionando o audio
    playSound(randomChosenColour);
    
    console.log(randomNumber);

}

//Função responsável por chamar os áudios
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Função para animação dos botões clicados
function animatePress(currentColour) {
    $("#"+ currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+ currentColour).removeClass("pressed");
    },100);

}

//Função para verificar a resposta do usuário
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("sucess");

        //Chamando o próximo depois de 1000ms
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {
        
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
