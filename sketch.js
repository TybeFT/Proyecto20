//Variables
var tom,tomStand,tomAnm,tomOver,jerry,jerryStand,jerryAnm,jerryOver;
var bg,bgImg;
var gameState = SERVE;
var SERVE,PLAY,END;
var SERVE = 2;
var PLAY = 1;
var END = 0;
//Utilice estados de juego para marcar la diferencia entre cada animacion y accion 

function preload()
{
    //Precargar imagenes y animaciones
    bgImg = loadImage("garden.png");

    tomStand = loadImage("tomOne.png");
    jerryStand = loadImage("jerryOne.png");

    tomAnm = loadAnimation("tomTwo.png","tomThree.png");
    jerryAnm = loadAnimation("jerryTwo.png","jerryThree.png");

    tomOver = loadImage("tomFour.png");
    jerryOver = loadImage("jerryFour.png");
}

//canvas y sprites
function setup()
{
    createCanvas(1000,800);

    bg = createSprite(500,400);
    bg.addImage(bgImg);
    bg.scale = 1.5;

    tom = createSprite(800,700);
    //tom.addImage(tomStand);
    tom.scale = 0.2;

    jerry = createSprite(210,730);
    //jerry.addImage(jerryStand);
    jerry.scale = 0.12;

    //Indicamos el estado del juego predeterminado
    gameState = SERVE;
}

//Funciones que pasan SIEMPRE
function draw()
{
    //Fondo (lo pongo por costrumbre jeje)
    background("black");

    //Estado del juego 1 condicion
    if(gameState === SERVE)
    {
        tom.addImage(tomStand);
        jerry.addImage(jerryStand);
        tom.velocityX = 0;
        jerry.velocityX = 0;

        //Condicion para pasar al siguiente estado del juego
        if(keyDown("LEFT"))
        {
            gameState = PLAY;
        }
    }
    else if(gameState === PLAY)
            {
                //Estado del juego 2:
                tom.addAnimation("TomRunning",tomAnm);
                tom.changeAnimation("TomRunning");
                tom.velocityX = -5;

                jerry.addAnimation("JerryNoStand",jerryAnm);
                jerry.frameDelay = 25;
                jerry.changeAnimation("JerryNoStand");

                //Condicion de tocar y para pasar al siguiente estado
                if(tom.x - jerry.x < (tom.width - jerry.width)/2)
                {
                    gameState = END;
                }
            }
            else if(gameState === END)
                    {
                        //Estado del juego 3:
                        tom.addAnimation("TomEND",tomOver);
                        tom.changeAnimation("TomEND");
                        tom.velocityX = 0;
                        tom.scale=0.2;

                        jerry.addAnimation("JerryEND",jerryOver);
                        jerry.changeAnimation("JerryEND");
                        jerry.velocityX = 0;
                        jerry.scale=0.12;
                    }

    //Tengo un problema con las animaciones: En el estado del juego PLAY que es cuando se mueve el gato, si cambia la imagen pero no se anima, solo se ve una imagen y no se como corregirlo                
    drawSprites();
}