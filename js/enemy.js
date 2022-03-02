class Enemy {
    constructor(windowWidth, windowHeight, tower, index) {
        this.index = index;
        this.orderNumber;
        this.hp = 1;
        this.dmg = 1;
        this.vel = createVector();
        this.acc = createVector();
        this.as = 0.5;
        this.towerX = windowWidth / 2;
        this.towerY = windowHeight / 2;
        this.windowWidth = windowWidth;
        this.windowHeight = windowHeight;
        this.pos = this.createPos();
        this.towerPos = tower.getPosition();
        this.towerRange = tower.getRange();
        this.distanceToTower = this.getDistance();
        this.Helper = new Helper();
    }

    createPos() {
        const coords = this.generateCoords();
        const x = random(coords.minX, coords.maxX);
        const y = random(coords.minY, coords.maxY);
        const pos = createVector(x, y);
        return pos;
    }

    generateCoords() {
        const coords = {
            minX: null,
            maxX: null,
            minY: null,
            maxY: null
        }

        while(!(coords.minX && coords.maxX && coords.minY && coords.maxY)) {
            let minX = random(-this.windowWidth * 2, this.windowWidth * 2);
            let maxX = random(-this.windowWidth * 2, this.windowWidth * 2);
            let minY = random(-this.windowHeight * 2, this.windowHeight * 2);
            let maxY = random(-this.windowHeight * 2, this.windowHeight * 2);
            coords.minX = this.isInView(minX) ? null : minX;
            coords.maxX = this.isInView(maxX) ? null : maxX;
            coords.minY = this.isInView(minY) ? null : minY;
            coords.maxY = this.isInView(maxY) ? null : maxY;
        }

        return coords;
    }

    isInView(coord, widthOrHeight) {
        if (coord > 0 && coord < widthOrHeight) {
            return true;
        }
        return false;
    }

    show() {
        stroke('blue');
        fill('blue');
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, 5, 5);
    }

    move() {
        const offset = tower.getDiameter() - 6;
        if (this.Helper.isIntersecting(this, tower, offset)) {
            // this.attack();
            return;
        } else {
            const diseredPos = p5.Vector.sub(this.towerPos, this.pos);
            diseredPos.setMag(4);
            const steer = p5.Vector.sub(diseredPos, this.vel);
            this.acc.add(steer);
            this.pos.add(this.vel);
            this.vel.add(this.acc);
        }
    }

    attack() {
        setInterval(() => {
            console.log('attack');
        }, this.as * 20000);
    }

    isDead() {
        if (this.hp < 1) return true;
        return false;
    }

    applyDmg() {
        if (this.isDead()) {
            return;
        } else {
            this.hp -= tower.getDmg();
        }
    }

    getPosition() {return this.pos}
    getIndex() {return this.index}
    getDistance() {return this.pos.dist(this.towerPos)}

    setOrderNumber(index) {this.orderNumber = index}
}