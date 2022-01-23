class TerrainFactory {
    static GetBase() {
        return  [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            1,
        ];
    }

    static GetNext() {
        let retval = [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            69,
        ];

        return retval;
    }
}

export default TerrainFactory;