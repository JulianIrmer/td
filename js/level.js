class Level {
    constructor(iteration, windowWidth, windowHeight, tower, UI) {
        this.iteration = iteration;
        this.windowWidth = windowHeight;
        this.windowHeight = windowHeight;
        this.tower = tower;
        this.UI = UI;
        this.enemyAmount = this.getEnemyAmount();
        this.enemies = this.generateEnemies();
        this.enemyAttributes = this.enemies[0].getAttributeObject();
        UI.updateEnemy(this.enemyAttributes);
        UI.updateWaveCounter(iteration);
    }

    generateEnemies() {
        let arr = [];
        const calc = new Calculations();
        const dmg = calc.calcEnemyAttributePerWave(iteration);
        const hp = calc.calcEnemyAttributePerWave(iteration);
        const value = calc.calcEnemyValuePerWave(iteration);
        for (let i = 0; i < this.enemyAmount; i++) {
            if (i % 10 === 0) {
                const enemy = new Boss(this.windowWidth, this.windowHeight, this.tower, i, this.UI, this.iteration, dmg, hp, value);
                arr.push(enemy);
            } else {
                const enemy = new Enemy(this.windowWidth, this.windowHeight, this.tower, i, this.UI, this.iteration, dmg, hp, value);
                arr.push(enemy);
            }
        }

        arr = arr.sort((a, b) => a.calcTimeToTower() - b.calcTimeToTower());

        for (let i = 0; i < enemies.length; i++) {
            arr[i].setOrderNumber(i);
        }

        return arr;
    }

    getEnemyAmount() {
        return Math.floor((this.iteration * 1.1) + 50);
    }

    getEnemyArray() {
        return this.enemies
    }
}