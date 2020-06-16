var Game;
var PreGameState;
var MainMenuState = new State("MainMenu",
// Enter
function(){},
// Update
function(){},
// Render
function(){},
// Exit
function(){}
);
var MainMenuLoadingState = new State("MainMenu_Load", 
// Enter
function(){
    MainMenuLoadingState.Assign("DotNumber", 0);
    MainMenuLoadingState.Assign("Frames", 0);
},
// Update
function(){
    if(MainMenuLoadingState.Get("Frames") >= 46 ){
        MainMenuLoadingState.Increment("DotNumber", 1);
        if(MainMenuLoadingState.Get("DotNumber") > 3){
            MainMenuLoadingState.Assign("DotNumber", 1);
        }
        MainMenuLoadingState.Assign("Frames", 0);
    }
    MainMenuLoadingState.Increment("Frames", 1);
}, 
// Render
function(){
    // Clear Screen with Blac
    k
    $("canvas").drawRect({
        fillStyle : "#000",
        x : 0, y : 0,
        width : 800, height : 600,
        fromCenter : false
    });
    for(var i = 0; i < MainMenuLoadingState.Get("DotNumber"); i++){
        $("canvas").drawEllipse({
            fillStyle : "#FFF",
            x : 250 + i * 150, y : 300,
            width : 20, height : 20
        });
    }
}, 
// Exit
function(){}
);
PreGameState = new State( "PreGame", 
// Enter
function(){
    $("#newGame").click(event => {Game.Enter(MainMenuLoadingState);});
},
// Update
function(){ /* Blank because of obvious reasons */ },
// Render
function(){ /* Blank because of obvious reasons*/ },
// Exit 
function(){
    $("#Form").hide();
    $("body").append("<canvas width = '800px' height = '600px'></canvas>");

}
);
Game = new GameController(PreGameState);
