class Level {
    constructor(iteration, windowWidth, windowHeight, tower, UI) {
        this.iteration = iteration;
        this.windowWidth = windowHeight;
        this.windowHeight = windowHeight;
        this.tower = tower;
        this.UI = UI;
        this.standardDmg;
        this.standardHp;
        this.standardValue;
        this.enemyAmount = this.getEnemyAmount();
        this.enemies = this.generateEnemies();
        this.enemyAttributes = this.getStandardStatsForEnemy();
        UI.updateEnemy(this.enemyAttributes);
        UI.updateWaveCounter(iteration);
    }

    getEnemyStatsObject() {
        const calc = new Calculations();
        this.standardDmg = calc.calcEnemyAttributePerWave(iteration);
        this.standardHp = calc.calcEnemyAttributePerWave(iteration);
        this.standardValue = calc.calcEnemyValuePerWave(iteration);

        return {
            windowWidth: this.windowWidth,
            windowHeight: this.windowHeight,
            tower: this.tower,
            UI: this.UI,
            iteration: this.iteration,
            dmg: this.standardDmg,
            hp: this.standardHp,
            value: this.standardValue
        };
    }

    generateEnemies() {
        let arr = [];
        const stats = this.getEnemyStatsObject();
        for (let i = 0; i < this.enemyAmount; i++) {
            if (i % 10 === 0) {
                const enemy = new Boss(stats, i);
                arr.push(enemy);
            } else if (i % 8 === 0) {
                const enemy = new Fast(stats, i);
                arr.push(enemy);
            } else {
                const enemy = new Enemy(stats, i);
                arr.push(enemy);
            }
        }

        arr = arr.sort((a, b) => a.calcTimeToTower() - b.calcTimeToTower());

        for (let i = 0; i < enemies.length; i++) {
            arr[i].setOrderNumber(i);
        }


        return arr;
    }

    getStandardStatsForEnemy() {
        return {
            dmg: this.standardDmg,
            hp: this.standardHp,
            value: this.standardValue
        }
    }

    getEnemyAmount() {
        return Math.floor((this.iteration * 1.1) + 40);
    }

    getEnemyArray() {
        return this.enemies;
    }
}