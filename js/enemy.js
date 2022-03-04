class Enemy {
    constructor(windowWidth, windowHeight, tower, index, UI, iteration, dmg, hp, value) {
        this.math = new Calculations();
        this.Helper = new Helper();
        this.UI = UI;
        this.index = index;
        this.orderNumber;
        this.iteration = iteration;
        this.dmg = dmg;
        this.hp = hp;
        this.vel = createVector();
        this.acc = createVector();
        this.as = 0.5;
        this.tower = tower;
        this.towerX = windowWidth / 2;
        this.towerY = windowHeight / 2;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.pos = this.createPos();
        this.towerPos = tower.getPosition();
        this.towerRange = tower.getRange();
        this.distanceToTower = this.getDistance();
        this.value = value;
        this.color = 'blue';
        this.r = 5;
        this.maxSpeed = 3;
    }

    calculateDmg(iteration) {
        return ;
    }

    createPos() {
        const coords = this.generateCoords();
        const x = random(coords.minX, coords.maxX);
        const y = random(coords.minY, coords.maxY);
        const pos = createVector(x, y);
        return pos;
    }

    generateCoords() {
        return {
            minX: random(-4000, -1000),
            maxX: random(1000, 4000),
            minY: random(-4000, 1000),
            maxY: random(1000, 4000)
        };
    }

    show() {
        stroke(this.color);
        fill(this.color);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.r, this.r);
    }

    move() {
        const offset = tower.getDiameter() - 6;
        if (this.Helper.isIntersecting(this, tower, offset)) {
            this.attack(frameCount);
            return;
        } else {
            const diseredPos = p5.Vector.sub(this.towerPos, this.pos);
            diseredPos.setMag(this.maxSpeed);
            const steer = p5.Vector.sub(diseredPos, this.vel);
            this.acc.add(steer);
            this.acc.limit(1);
            this.pos.add(this.vel);
            this.vel.add(this.acc);
        }
    }

    attack(fCount) {
        const offset = Math.floor(random(4, 8));
        if (fCount % (60 - offset) !== 0) return;
        this.tower.decreaseCurrentHp(this.getDmg());
        this.UI.updateHpBar();
    }

    isDead() {
        if (this.hp < 1) return true;
        return false;
    }

    applyDmg() {
        if (this.isDead()) return;
        this.hp -= tower.getDmg();
    }

    calcTimeToTower() {
        const t = this.getDistance() / this.maxSpeed;
        return t;
    }

    getDmg() {return this.dmg}
    getHp() {return this.hp}
    getValue() {return this.value}
    getPosition() {return this.pos}
    getIndex() {return this.index}
    getDistance() {return this.pos.dist(this.towerPos)}
    getValue() {return this.value}
    getAttributeObject() {
        return {
            hp: this.getHp(),
            dmg: this.getDmg(),
            value: this.getValue()
        }
    }

    setOrderNumber(index) {this.orderNumber = index}
}