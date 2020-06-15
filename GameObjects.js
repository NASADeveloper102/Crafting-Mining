class Consumable{
    constructor( Name, Quantity = 0, Effect = function( Player ){}, Price = 0){
        this.Name = Name;
        this.Quantity = Quantity;
        this.Effect = Effect;
        this.Price = Price;
    }
    Add( Number ){
        this.Quantity += Number;
    }
}
class Weapon{
    constructor( Name, Stats = { Durability : 0, Attack : 0, Defense : null }, Effect = function(){}){
        this.Name = Name;
        this.Stats = Stats;
        this.Effect = Effect;
    }
}
// Not an item boomer hahah 
class Breakable{
    constructor( Name, x, y, filePath = "N/A", ItemDropped = null){
        this.Name = Name;
        this.X = x;
        this.Y = y;
        this.File = filePath;
        this.ItemDropped = ItemDropped;
    }
}


class Player{
    constructor( x, y ){
        this.X = x;
        this.Y = y;
        this.Weapons = {} // []
        this.Consumables = {} // []
    }
    AddWeapon( , Number ){
        
    }
}