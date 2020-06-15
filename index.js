var Game;
var PreGameState;
var MainMenuState = new State("MainMenu",
// Enter
() => {},
// Update
() => {},
// Render
() => {},
// Exit
() => {}
);
var MainMenuLoadingState = new State("MainMenu_Load", 
// Enter
() => {
    MainMenuLoadingState.Assign("DotNumber", 0);
    MainMenuLoadingState.Assign("Frames", 0);
},
// Update
() => {
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
() => {
    // Clear Screen with Black
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
() => {}
);
PreGameState = new State( "PreGame", 
// Enter
() => {
    $("#newGame").click(event => {Game.Enter(MainMenuLoadingState);});
},
// Update
() => { /* Blank because of obvious reasons */ },
// Render
() => { /* Blank because of obvious reasons*/ },
// Exit 
() => {
    $("#Form").hide();
    $("body").append("<canvas width = '800px' height = '600px'></canvas>");

}
);
Game = new GameController(PreGameState);
