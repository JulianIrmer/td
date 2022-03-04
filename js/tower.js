class Tower {
    constructor(windowWidth, windowHeight) {
        this.currentHp = 100;
        this.maxHp = 100;
        this.dmg = 20;
        this.as = 40;
        this.range = 300;
        this.absProts = 0;
        this.percentProts = 1;
        this.ls = 0;
        this.pos = createVector(windowWidth / 2, windowHeight / 2);
        this.diameter = 33;
        this.enemies = enemies;
        this.simultaneouslyTargets = 1;
        this.Helper = new Helper();
    }

    show() {
        push();
        strokeWeight(1);
        noFill();
        stroke('white');
        ellipse(this.pos.x, this.pos.y, this.diameter);

        strokeWeight(1);
        stroke('red');
        ellipse(this.pos.x, this.pos.y, this.range);
        pop();
    }

    calculateAttackSpeed() {
        const as = round(400 / this.as);
        return as;
    }

    calculateDmg(dmg) {
        const calculatedDmg = (dmg * this.getPercentProts()) - this.getAbsProts();
        return calculatedDmg > 0 ? calculatedDmg : 0;
    }

    isEnemyInRange(enemy) {
        const offset = this.diameter + (this.range / 2) + 15;
        if (this.Helper.isIntersecting(this, enemy, offset)) return true
        return false;
    }

    increaseAttribute(attr) {
        if (attr === 'hp') {
            this.increaseMaxHp(10);
            this.increaseCurrentHp(10);
            return;
        }
        if (attr === 'dmg') {
            this.setDmg(this.dmg + 1);
            return;
        }
        if (attr === 'as') {
            this.setAs(Math.round((this.as + 0.5) * 100) / 100);
            return;
        }
        if (attr === 'ls') {
            if (this.getLs() === 1.1) return;
            this.setLs(this.getLs() + 0.002);
            return;
        }
        if (attr === 'range') {
            if (this.getRange() === 400) return;
            this.setRange(this.getRange() + 2);
            return;
        }
        if (attr === 'absProts') {
            this.setAbsProts(this.getAbsProts() + 2);
            return;
        }
        if (attr === 'percentProts') {
            if (this.getPercentProts() === 0.5) return;
            this.setPercentProts(this.getPercentProts() - 0.05);
            return;
        }

        if (attr === 'targets') {
            this.getSimultaneouslyTargets(this.getSimultaneouslyTargets() + 1);
            return;
        }
    }

    applyLs() {
        const dmg = this.getDmg();
        const ls = this.getLs();
        const hp = dmg * ls;
        this.increaseCurrentHp(hp);
    }

    endGame() {
        noLoop();
    }

    increaseCurrentHp(hp) {
        if (this.getCurrentHp() + hp >= this.getMaxHp()) {
            this.setCurrentHp(this.getMaxHp())
            return;
        }
        this.setCurrentHp(this.getCurrentHp() + hp)
    }

    increaseMaxHp(hp) {
        this.maxHp += hp
    }

    decreaseCurrentHp(dmg) {
        this.currentHp -= this.calculateDmg(dmg);

        if (this.currentHp <= 0) this.endGame();
    }

    decreaseMaxHp(hp) {
        this.maxHp -= hp
    }

// GETTER
    getCurrentHp() {return round(this.currentHp, 2)}
    getMaxHp() {return round(this.maxHp, 2)}
    getDmg() {return this.dmg}
    getAs() {return this.as}
    getRange() {return this.range}
    getAbsProts() {return this.absProts}
    getPercentProts() {return this.percentProts}
    getLs() {return this.ls}
    getPosition() {return this.pos}
    getDiameter() {return this.diameter}
    getSimultaneouslyTargets() {return this.simultaneouslyTargets - 1}
    getAttributeObject() {
        return {
            hp: this.getMaxHp(),
            dmg: this.getDmg(),
            as: this.getAs(),
            range: this.getRange(),
            absProts: this.getAbsProts(),
            percentProts: this.getPercentProts(),
            ls: this.getLs(),
            targets: this.getSimultaneouslyTargets(),
        }
    }

// SETTER
    setCurrentHp(hp) {this.currentHp = hp}
    setMaxHp(hp) {this.maxHp = hp}
    setDmg(dmg) {this.dmg = dmg}
    setAs(as) {this.as = as}
    setLs(ls) {this.ls = ls}
    setRange(range) {this.range = range}
    setAbsProts(prots) {this.absProts = prots}
    setPercentProts(prots) {this.percentProts = prots}
    setSimultaneouslyTargets(num) {this.simultaneouslyTargets = num}
}