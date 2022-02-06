const Clouds = {
    small: [
        [52, 66],
    ],
    square: [
        [64,50,57],
        [65,51,58],
    ],
    comb: [
        [64,67],
        [52,66],
        [52,66],
        [52,66],
        [52,66],
        [65,68],
    ],
}

const EmptyColumn = [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69];

function CompileColumn(baseVal, tilesFromTop) {
    const retVal = Array(tilesFromTop).fill(69)
        .concat(baseVal)
        .concat(Array(12 - (tilesFromTop + baseVal.length)).fill(69));
    return retVal;
}

class BackgroundFactory {
    constructor() {
        this.depot = [];
        this.clouds = Object.values(Clouds);
    }

    GetInitialSetup() {
        let retVal = [];
        for (let i = 0; i < 17; i++) {
            retVal.push(this.GetNext());
        }
        return retVal;
    }

    GetNext() {
        // Randomizes next cloud section.
        // Also puts a random amount of space between clouds (min 2 cols).
        if (this.depot.length === 0) {
            this.depot = Array(Math.floor((Math.random() * 3)) + 2).fill(EmptyColumn);

            const tilesFromTop = Math.floor((Math.random() * 5)) + 1;
            const nextCloud = this.clouds[Math.floor((Math.random() * this.clouds.length))];

            nextCloud.map(col => this.depot.push(CompileColumn(col, tilesFromTop)));
        }

        return this.depot.shift();
    }
}

export default BackgroundFactory;