class Boss extends Enemy {
    constructor(windowWidth, windowHeight, tower, index, UI, iteration, dmg, hp, value) {
        super(windowWidth, windowHeight, tower, index, UI, iteration, dmg, hp, value);
        this.r = 25;
        this.color = 'white';
        this.value = value * 10;
        this.hp = hp * 10;
        this.maxSpeed = 2;
    }
}