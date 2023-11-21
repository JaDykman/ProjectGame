const swordOne = {
        name: "Stick",
        image:"sword.png",
        damage: 10,
    };
    const swordTwo = {
        name: "Fishsword",
        damage: 25,
    };
    const swordThree = {
        name: "Megasword",
        damage: 50,
    };
    const bowOne = {
        name: "bow1",
        damage: 10,
    };
    const bowTwo = {
        name: "bow2",
        damage: 25,
    };
    const bowThree = {
        name: "bow3",
        damage: 50,
    };
    const armourOne = {
        name: "Cardboard Armour",
        extraHealth: 50,
    };
    const armourTwo = {
        name: "Iron Armour",
        extraHealth: 75,
    };
    const armourThree = {
        name: "Titanium Armour",
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
 
const stickSword = document.createElement("img");
img.src = "MicrosoftTeams-image (1).png";
document.body.appendChild(img);
 
const fishSword = document.createElement("img");
fishSword.src = "MicrosoftTeams-image.png";
document.body.appendChild(fishSword);
 
const megaSword = document.createElement("img");
megaSword.src = "MicrosoftTeams-image (2).png";
document.body.appendChild(megaSword);