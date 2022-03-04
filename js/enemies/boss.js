class Boss extends Enemy {
    constructor(stats, i) {
        super(stats, i);
        this.r = 25;
        this.color = 'white';
        this.value = stats.value * 10;
        this.hp = stats.hp * 40;
        this.maxSpeed = 2;
        this.offset = 1000;
    }
}