const windowWidth = 600;
const windowHeight = 600;
const cHelper = new Helper();
let tower;
let enemies = [];
let projectiles = [];
const firedProjectiles = [];

function setup() {
    frameRate(4);
    createCanvas(windowWidth, windowHeight);
    createProjectiles();
    tower = new Tower(windowWidth, windowHeight, projectiles);
    createEnemies();
}

function createProjectiles() {
    for (let i = 0; i < 500; i++) {
        projectiles.push(new Projectile());
    }
}

function createEnemies() {
    for (let i = 0; i < 40; i++) {
        const enemy = new Enemy(windowWidth, windowHeight, tower, i);
        enemies.push(enemy);
    }

    enemies = enemies.sort((a, b) => a.getDistance() - b.getDistance());

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].setOrderNumber(i);
    }
}

function draw() {
    background(20);
    tower.show(windowWidth, windowHeight);
    handleEnemies();
    handleBallistics();
}

function handleBallistics() {
    if (enemies.length === 0) return;
    for (let i = 0; i <= tower.getSimultaneouslyTargets(); i++) {
        if (!enemies[i]) continue;

        const currentTarget = enemies[i];
        const returnedProjectile = tower.fire(enemies[i]);
        if (returnedProjectile) {
            firedProjectiles.push(returnedProjectile);
        }

        for (let projectile of firedProjectiles) {
            if (!projectile.getCurrentTarget()) {
                console.log(currentTarget);
                projectile.setTarget(currentTarget);
            }

            projectile.show();
            projectile.move();

            if (!projectile.isTargetHit()) continue;

            enemy.applyDmg(tower.getDmg());
            projectile.setPosition(0, 0);
            projectile.setTarget(null);
        }
    }
}

function handleEnemies() {
    for (let i = enemies.length - 1; i >= 1 ; i--) {
        const enemy = enemies[i]
        enemy.show();
        enemy.move();

        if (enemy.isDead()) {
            enemies.splice(i, 1);
        }
    }
}