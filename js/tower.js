class Tower {
    constructor(windowWidth, windowHeight, projectiles) {
        this.hp = 100;
        this.dmg = 2;
        this.as = 6;
        this.range = 300;
        this.pos = createVector(windowWidth / 2, windowHeight / 2);
        this.diameter = 33;
        this.enemies = enemies;
        this.simultaneouslyTargets = 1;
        this.projectiles = projectiles;
        this.Helper = new Helper();
    }

    show() {
        noFill();
        stroke('white');
        ellipse(this.pos.x, this.pos.y, this.diameter);
        strokeWeight(2);

        stroke('red');
        ellipse(this.pos.x, this.pos.y, this.range);
        strokeWeight(0.5);
    }

    fire(enemy) {
        const offset = this.diameter + (this.range / 2) - 25;
        if (this.Helper.isIntersecting(this, enemy, offset)) {
            const projectile = projectiles[enemy.getIndex()];
            return projectile;
        }
    }

    calculateAttackSpeed() {
        const as = 1000 / this.as;
        return as;
    }

// GETTER
    getHp() {return this.hp}
    getDmg() {return this.dmg}
    getAs() {return this.as}
    getRange() {return this.range}
    getPosition() {return this.pos}
    getDiameter() {return this.diameter}
    getSimultaneouslyTargets() {return this.simultaneouslyTargets - 1}


// SETTER
    setHp(hp) {this.hp = hp}
    setDmg(dmg) {this.dmg = dmg}
    setAs(as) {this.as = as}
    setRange(range) {this.range = range}
    setSimultaneouslyTargets(num) {this.simultaneouslyTargets = num}
}