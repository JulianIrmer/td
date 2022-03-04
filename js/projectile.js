class Projectile {
    constructor(windowWidth, windowHeight) {
        this.target = null;
        this.pos = createVector(windowWidth / 2, windowHeight / 2);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.Helper = new Helper();
        this.maxSpeed = 10;
        this.maxForce = 2;
        this.r = 2;
    }

    seek() {
        if (!this.target) return;
        let force = p5.Vector.sub(this.target.getPosition(), this.pos);
        force.setMag(this.maxSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        this.applyForce(force);
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        if (!this.target) return;
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0, 0);
    }

    show() {
        push();
        stroke(255);
        strokeWeight(2);
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r);
        pop();
    }

    hide() {
        this.r = 0;
        this.pos.y = -100;
        this.pos.x = -100;
    }

    isTargetHit() {
        if (!this.target) return false;
        if (this.Helper.isIntersecting(this, this.target, 15)) return true;
        return false;
    }

    getTarget() {
        return this.target;
    }

    setTarget(target) {
        this.target = target;
    }

    setPosition(x, y) {
        this.pos = createVector(x, y)
    }
}