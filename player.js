function makePlayer(){
    let playerName = prompt("Who dares to enter the caves? ");
    let playerClass = parseInt(prompt("What is your trade?(1:Knight, 2:Archer, 3:Barb, 4:Mage) "))
    const classOne = {
        class: "Knight",
        health: 10,
        baseDMG: 3,
    };
    const classTwo = {
        class: "Archer",
        health: 7,
        baseDMG: 2,
    };
    const classThree = {
        class: "Barbarian",
        health: 20,
        baseDMG: 1,
    };
    const classFour = {
        class: "Mage",
        health: 7,
        baseDMG: 2,
    };
    if(playerClass == 1){
        playerClass = classOne;
    } else if(playerClass == 2){
        playerClass = classTwo;
    } else if (playerClass == 3){
        playerClass = classThree;
    } else if (playerClass == 4){
        playerClass = classFour;
    } else{
        return alert(playerName+", that was not one of your options!");
    }
    alert("Ah, you are "+playerName+", The "+playerClass.class);
}