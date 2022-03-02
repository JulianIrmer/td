class Projectile {
    constructor() {
        this.target = null;
        this.pos = createVector(300, 300);
        this.vel = createVector();
        this.acc = createVector();
        this.Helper = new Helper();
    }

    show() {
        ellipse(this.pos.x, this.pos.y, 3);
        fill(255);
        stroke(255);
    }

    move() {
        const diseredPos = p5.Vector.sub(this.target.getPosition(), this.pos);
        diseredPos.setMag(5);
        const steer = p5.Vector.sub(diseredPos, this.vel);
        this.acc.add(steer);
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }

    isTargetHit() {
        if (this.Helper.isIntersecting(this, this.target, 0)) return true;
        return false;
    }

    getCurrentTarget() {
        return this.target;
    }

    setTarget(target) {
        this.target = target;
    }

    setPosition(x, y) {
        this.pos = createVector(x, y)
    }
}