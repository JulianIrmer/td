class Player {
    constructor() {
        this.UI = UI;
        this.money = 20;
    }

    hasPlayerEnoughMoney(cost) {
        if (cost <= this.money) return true;
        return false;
    }

    getMoney() {return this.money}

    increaseMoney(amount) {this.money += amount}
    decreaseMoney(amount) {this.money -= amount}
    setMoney(amount) {this.money = money}
}