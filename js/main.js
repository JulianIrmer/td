const windowWidth = 600;
const windowHeight = 600;
const cHelper = new Helper();
let UI;
let PlayerClass;
let tower;
let level;
let enemies = [];
let projectiles = [];
let targetedProjectiles = [];
let iteration = 1;

function setup() {
    createCanvas(windowWidth, windowHeight);
    tower = new Tower(windowWidth, windowHeight);
    PlayerClass = new Player();
    UI = new Ui(tower, PlayerClass);
    level = new Level(iteration, windowWidth, windowHeight, tower, UI);
    enemies = level.getEnemyArray();

    for (let i = 0; i < 1000; i++) {
        projectiles.push(new Projectile(windowWidth, windowHeight));
    }
}

function draw() {
    if (enemies.length === 0) {
        iteration++;
        spawnNewWave();
        targetedProjectiles.length = 0;
    }

    background(20);
    tower.show(windowWidth, windowHeight);
    handleEnemies();
    handleBallistics();
}

function spawnNewWave() {
    noLoop();
    level = new Level(iteration, windowWidth, windowHeight, tower, UI);
    enemies = level.getEnemyArray();
    setTimeout(() => {
        loop();
    }, 1000);
}

function handleBallistics() {
    if (frameCount % tower.calculateAttackSpeed() === 0) {
        addNewTargets();
    }
    updateExistingProjectiles();
}

function isTowerShooting() {
    for (let i = 0; i < targetedProjectiles.length; i++) {
        if (targetedProjectiles[i].getTarget() === null) {
            break;
            return false;
        }
    }
    return true;
}

function addNewTargets() {
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];

        if (!tower.isEnemyInRange(enemy)) continue;
        if (i <= tower.getSimultaneouslyTargets()) {
            const projectile = projectiles[enemy.index];
            projectile.setTarget(enemy);
            targetedProjectiles.push(projectile);
        }
    }
}

function updateExistingProjectiles() {
    for (let i = targetedProjectiles.length - 1; i > 0; i--) {
        const projectile = targetedProjectiles[i];

        if (!projectile.isTargetHit()) {
            projectile.seek();
            projectile.update();
            projectile.show();
        } else if (projectile.isTargetHit()) {
            const target = projectile.getTarget();
            target.applyDmg();
            UI.updateHpBar();

            projectiles[target.index].setTarget(null);
            projectiles[target.index].hide();
            projectiles[target.index] = new Projectile(windowWidth, windowHeight);
            tower.applyLs();

            targetedProjectiles.splice(i, 1);
        }
    }
}

function handleEnemies() {
    for (let i = enemies.length - 1; i >= 0 ; i--) {
        const enemy = enemies[i]
        enemy.show();
        enemy.move(frameCount);

        if (enemy.isDead()) {
            PlayerClass.increaseMoney(enemy.getValue());
            UI.updateMoney();
            enemies.splice(i, 1);
        }
    }
}