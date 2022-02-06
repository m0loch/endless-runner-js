const SectionsDefinitions = {
    hole: [
        [],
    ],
    step: [
        [],
        [10, null],
        [],
    ],
    platform: [
        [],
        [3, null],
        [4, null],
        [4, null],
        [5, null],
    ],
    normal: [
        [],
        [0],
        [1],
        [1],
        [2],
    ],
    crate: [
        [],
        [0],
        [49, 1],
        [1],
        [2],
    ],
    tree: [
        [0],
        [1],
        [1],
        [22, 29, 37, 2],
    ],
}

const EmptyColumn = [null, null, null, null, null, null, null, null, null, null, null, null];

function Normalize(baseVal) {
    return EmptyColumn.slice(0, -baseVal.length).concat(baseVal);
}

class TerrainFactory {
    constructor() {
        this.depot = [];
        this.sections = Object.values(SectionsDefinitions);
    }

    GetInitialSetup() {
        const retVal = Array(16).fill(Normalize([1]));
        retVal.push(Normalize([2]));
        return retVal;
    }

    GetNext() {
        // Randomizes next section
        if (this.depot.length === 0) {
            const nextSection = this.sections[Math.floor((Math.random() * this.sections.length))];
            this.depot = [...nextSection];
        }

        return Normalize(this.depot.shift());
    }
}

export default TerrainFactory;