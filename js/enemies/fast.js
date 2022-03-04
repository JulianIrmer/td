class Fast extends Enemy {
    constructor(stats, i) {
        super(stats, i);
        this.r = 7;
        this.color = 'red';
        this.value = stats.value;
        this.hp = stats.hp * 0.5 > 1 ? stats.hp * 0.5 : 1;
        this.maxSpeed = 6;
        this.offset = 0;
    }
}