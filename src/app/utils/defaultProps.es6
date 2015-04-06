let defaultProps = {
    userAnswers: new Map(),
    difficulty: 50,
    games: new Map(),
    board: new Map(),
    cells: {
        rowId: null,
        colId: null,
        readOnly: null,
    },
    colors: {
        uberBlue: 'uberBlue',
        uberRed: 'uberRead',
        uberBlack: 'uberBlack'
    }
};

export default defaultProps;
