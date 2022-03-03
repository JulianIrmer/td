class Bla {
    constructor(iteration, windowWidth, windowHeight, tower, UI) {
        this.iteration = iteration;
        this.windowWidth = windowHeight;
        this.windowHeight = windowHeight;
        this.tower = tower;
        this.UI = UI;
        this.enemyEnemyAmount = this.getEnemyAmount();
        this.enemies = this.generateEnemies();
    }

    generateEnemies() {
        let arr = [];
        for (let i = 0; i < this.enemyEnemyAmount; i++) {
            const enemy = new Enemy(this.windowWidth, this.windowHeight, this.tower, i, this.UI, this.iteration);
            if (i === 0) {console.log(enemy)}
            arr.push(enemy);
        }

        arr = arr.sort((a, b) => a.getDistance() - b.getDistance());

        for (let i = 0; i < enemies.length; i++) {
            arr[i].setOrderNumber(i);
        }

        console.log(arr);
        return arr;
    }

    getEnemyAmount() {
        return Math.floor((this.iteration * 1.1) + 30);
    }

    getEnemyArray() {return this.enemies}
}