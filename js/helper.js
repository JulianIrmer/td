class Helper {
    constructor() {}

    isIntersecting(element1, element2, offset) {
        if (element1.pos.dist(element2.getPosition()) <= offset) {
            console.timeEnd('isIntersecting');
            return true;
        }
        return false;
    }
}