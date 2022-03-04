class Calculations {
    constructor(){}

    calcEnemyAttributePerWave(level) {
        const base = 1;
        const factor = level * 0.34;
        const value = round(base * factor, 2);
        if (value < 1) return 1;
        return round(value, 2);
    }

    calcUpgradeCostPerLevel(level, cost) {
        const base = +cost || 8;
        const factor = level * 1.2;
        const value = (base + factor);
        return round(value, 2);
    }

    calcEnemyValuePerWave(level) {
        return round(1 + (level * 0.1), 2);
    }
}