const EmptyColumn = [69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69, 69];

class BackgroundFactory {
    GetInitialSetup() {
        return Array(17).fill(EmptyColumn);
    }

    GetNext() {
        return EmptyColumn;
    }
}

export default BackgroundFactory;