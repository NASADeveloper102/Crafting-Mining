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
    Equals( OtherWeapon ){
        if( this.Name == OtherWeapon.Name ){
            for( attribute in this.Stats ){
                if( this.Stats[attribute] != OtherWeapon.Stats[attribute] ){
                    return false;
                }
            }
            return true;
        }
        return false;

    }
}
// Not an item boomer hahah 
class Breakable{
    constructor( Name, x, y, rotation = 0, filePath = "N/A", ItemDropped = null ){
        this.Name = Name;
        this.X = x;
        this.Y = y;
        this.File = filePath;
        this.ItemDropped = ItemDropped;
        this.Rotation = rotation;
    }
    LoadHitBox( width = null, height = null ){
        this.Width = width;
        this.Height = height;
    }
    OnTriggerEnter( CollidingBody ){

    }
    CheckCollision( Body ){
        return CheckBounds( { X : this.X, Y : this.Y }, Body ) || 
            CheckBounds( { X : this.X + this.Width, Y : this.Y }, Body ) || 
            CheckBounds( { X : this.X, Y : this.Y + this.Height }, Body ) || 
            CheckBounds( { X : this.X + this.Width, Y : this.Y + this.Height }, Body ) ||
            CheckBounds( { X : Body.X, Y : Body.Y }, this ) || 
            CheckBounds( { X : Body.X, Y : Body.Y + Body.Height }, this ) || 
            CheckBounds( { X : Body.X + Body.Width, Y : Body.Y }, this ) || 
            CheckBounds( { X : Body.X + Body.Width, Y : Body.Y + Body.Height}, this );
    }
}

class Inventory{
    MaxTotalItems = 32
    SlotCapacity = 32
    constructor( ){
        this.Items = {};
        this.ItemCount = 0;
    }
    // Returns the number of items that it could not fit in
    AddItem( Item, Amount=1 ){
        ItemType = Item.constructor.name;
        // Contains the array representing the items of the same type
        SameTypeItems = this.Items[ItemType];
        if( SameTypeItems == null ){
            AmountLeft = Amount;
            this.Items[ItemType] = [];
            SameTypeItems = this.Items[ItemType];
            while( AmountLeft > 0 ){
                // TODO consider removing this after debugging...
                if( this.ItemCount > MaxTotalItems ){
                    console.error('BUG - ItemCount exceeds MaxTotalItems');
                    return AmountToInsert;
                }
                if( this.ItemCount == MaxTotalItems ){
                    return AmountToInsert;
                }
                AmountToInsert = Math.min(AmountLeft, SlotCapacity)
                SameTypeItems.push([Item, AmountToInsert])
                this.ItemCount++;
                AmountLeft -= AmountToInsert;
            }
            return 0;
        }else{
            LeftOver = Amount;
            for( i = 0; i < SameTypeItems.length; i++ ){
                if( Item.Equals(SameTypeItems[i][0]) ){
                    SameTypeItems[i][1] += LeftOver;
                    if( SameTypeItems[i][1] > SlotCapacity ){
                        LeftOver = SameTypeItems[i][1] - SlotCapacity;
                        SameTypeItems[i][1] = SlotCapacity;
                    }else{
                        return 0;
                    }
                }
            }
            while( LeftOver > 0 ){
                // TODO consider removing this after debugging...
                if( this.ItemCount > MaxTotalItems ){
                    console.error('BUG - ItemCount exceeds MaxTotalItems');
                    return LeftOver;
                }
                if( this.ItemCount == MaxTotalItems ){
                    return LeftOver;
                }
                AmountToInsert = Math.min(LeftOver, SlotCapacity);
                SameTypeItems.push([Item, LeftOver]);
                this.ItemCount++;
                LeftOver -= AmountToInsert;
            }
            return 0;
        }
    }
}

class Player{
    constructor( x, y ){
        this.X = x;
        this.Y = y;
        this.Weapons = {} // []
        this.Consumables = {} // []
    }
}