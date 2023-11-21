const swordOne = {
        name: "Stick",
        image:"texture_sword.png",
        damage: 10,
    };
    const swordTwo = {
        name: "Fishsword",
        image:"texture_fishsword.png",
        damage: 25,
    };
    const swordThree = {
        name: "Megasword",
        image:"texture_megasword.png",
        damage: 50,
    };
    const bowOne = {
        name: "bow1",
        image: "",
        damage: 10,
    };
    const bowTwo = {
        name: "bow2",
        image: "",
        damage: 25,
    };
    const bowThree = {
        name: "bow3",
        image: "",
        damage: 50,
    };
    const armourOne = {
        name: "Cardboard Armour",
        image: "",
        extraHealth: 50,
    };
    const armourTwo = {
        name: "Iron Armour",
        image: "",
        extraHealth: 75,
    };
    const armourThree = {
        name: "Titanium Armour",
        image: "",
        extraHealth:100,
    };
 
function Inventory(){
    this.items = [];
    this.addItem = function(item){
        this.addItem.push(item);
        console.log(item.name + "Added to inventory");
    }
this.removeItem = function(itemname){
    const index = this.items.findIndex(item => item.name === itemName);
    if (index !== -1){
        const removedItem = this.items.splice(index, 1)[0];
        console.log(removedItem.name + "Removed from inventory");
    } else {
        console.log("Item not found in inventory");
    }
};
this.displayInventory = function(){
    console.log("Inventory");
    if (this.items.length === 0){
        console.log("Empty");
    } else {
        this.items.forEach(item =>{
            console.log('${item.name}: {$item.description}');
        });
    }
}
 
}
 
function displayInventory(){
    let inventory = [swordOne];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
}
 
{
    let inventory = [swordTwo];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
}
 
{
    let inventory = [swordThree];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [bowOne];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [bowTwo];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [bowThree];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [armourOne];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [armourTwo];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 

{
    let inventory = [armourThree];
    for (let i=0;i<inventory.length; i++) {
        let img = document.createElement('img');
        img.src = i.image;
        document.body.appendChild(img);
}
} 