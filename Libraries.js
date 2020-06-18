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
        clearInterval(this.UpdateInterval);
        clearInterval(this.RenderInterval);
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
class Triangle{
    constructor( x1, y1, x2, y2, x3, y3 ){
        this.X1 = x1;
        this.X2 = x2;
        this.X3 = x3;
        this.Y1 = y1;
        this.Y2 = y2;
        this.Y3 = y3;
    }
    Split(){
        return [new Triangle(this.X1, this.Y1, this.X2, this.Y2, this.X1, this.Y2),
            new Triangle(this.X1, this.Y1, this.X3, this.Y3, this.X1, this.Y3)];
    }
    Draw(){
        $("canvas").drawLine({
            strokeStyle : "#FFF",
            strokeWidth : 6,
            x1 : this.X1, y1 : this.Y1,
            x2 : this.X2, y2 : this.Y2,
            x3 : this.X3, y3 : this.Y3,
            closed : true
        });
    }
    CheckPoint( x, y ){
        return y >= this.Y3 && y <= (this.Y1 - this.Y3)/(this.X2 - this.X3) * x;
    }
}

function CheckBounds( ObjectPosition, Body ){
    if( Body.Rotation % 90 === 0 ){
        if(ObjectPosition.X >= Body.X && ObjectPosition.X <= Body.X + Body.Width ){
            if(ObjectPosition.Y >= Body.Y && ObjectPosition.Y <= Body.Y + Body.Height ){
                return true;
            }
        }
    }
    else{

    }
    return false;
}