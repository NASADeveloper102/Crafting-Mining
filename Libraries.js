class State{
    constructor(_Name,
        _OnEnter = () => {console.log("Entered");},
        _OnUpdate = () => {console.log("Updated");},
        _OnRender = () => {console.log("Rendered");},
        _OnExit = () => {console.log("Exited");}){
            this.Enter = _OnEnter;
            this.Update = _OnUpdate;
            this.Render = _OnRender;
            this.Exit = _OnExit;
            this.Name = _Name;
            this.Variables = {};
    }
    Assign( Name, Value ){this.Variables[Name] = Value;}
    Get( Name ) {return this.Variables[Name];}
    ClearAll(){this.Variables = {};}
    Clear( Name ){this.Variables[Name] = null;}
    Delete( Name ){delete this.Variables[Name];}
    Check( Name ){return (Boolean)(this.Variables[Name]);}
    Increment( Name, Value ){this.Variables[Name] += Value;}
}
class GameController{
    constructor( _State = new State("Error"), FrameRate = 60 ){
        this.FrameRate = FrameRate;
        this.CurrentState = _State;
        this.UpdateInterval = setInterval( this.CurrentState.Update, 1000/FrameRate );
        this.RenderInterval = setInterval( this.CurrentState.Render, 10 );
        this.CurrentState.Enter();
    }
    Enter( _State ){
        this.CurrentState.Exit();
        this.CurrentState = _State;
        this.CurrentState.Enter();
        this.UpdateInterval = setInterval( this.CurrentState.Update, 1000/this.FrameRate );
        this.RenderInterval = setInterval( this.CurrentState.Render, 10 );
    }
    Update(){
        this.CurrentState.Update();
    }
    Render(){
        this.CurrentState.Render();
    }
}


class Player{
    constructor( x, y ){

    }
}