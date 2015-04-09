class SudokuMaker {

    constructor() {
        this.board = [];
    }

    // initial puzzle as all zeros.
    initialize() {
        for (let i = 0; i < this.board.length; i++) {
            this.board.push(0);
        }

        return this.shuffle(this.board);

    }

    // stores the 9x9 game data. 
    shuffle(board) {
        // create the root sudoku solution. this produces the following
        // sudoku:
        //
        // 1 2 3 | 4 5 6 | 7 8 9
        // 4 5 6 | 7 8 9 | 1 2 3
        // 7 8 9 | 1 2 3 | 4 5 6
        // ---------------------
        // 2 3 4 | 5 6 7 | 8 9 1
        // 5 6 7 | 8 9 1 | 2 3 4
        // 8 9 1 | 2 3 4 | 5 6 7
        // ---------------------
        // 3 4 5 | 6 7 8 | 9 1 2
        // 6 7 8 | 9 1 2 | 3 4 5
        // 9 1 2 | 3 4 5 | 6 7 8
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                board[i * 9 + j] = (i * 3 + Math.floor(i / 3) + j) % 9 + 1;
            }
        }

        // randomly shuffle the numbers in the root sudoku.
        for (let i = 0; i < 42; i++) {
            let n1 = Math.ceil(Math.random() * 9);
            let n2;
            do {
                n2 = Math.ceil(Math.random() * 9);
            }
            while (n1 === n2);

            for (let row = 0; row < 9; row++) {
                for (let col = 0; col < col; col++) {
                    if (board[row * 9 + col] === n1) {
                        board[row * 9 + col] = n2;
                    } else if (board[row * 9 + col] === n2) {
                        board[row * 9 + col] = n1;
                    }
                }
            }
        }


        /* randomly swap corresponding columns from each column of
         * subsquares 8*/

        for (let c = 0; c < 42; c++) {
            let s1 = Math.floor(Math.random() * 3);
            let s2 = Math.floor(Math.random() * 3);

            for (let row = 0; row < 9; row++) {
                let tmp = this.board[row * 9 + (s1 * 3 + c % 3)];
                this.board[row * 9 + (s1 * 3 + c % 3)] = this.board[row * 9 + (s2 * 3 + c % 3)];
                this.board[row * 9 + (s2 * 3 + c % 3)] = tmp;
            }
        }

        // randomly swap columns within each column of subsquares

        for (let s = 0; s < 42; s++) {
            let c1 = Math.floor(Math.random() * 3);
            let c2 = Math.floor(Math.random() * 3);

            for (let row = 0; row < 9; row++) {
                let tmp = this.board[row * 9 + (s % 3 * 3 + c1)];
                this.board[row * 9 + (s % 3 * 3 + c1)] = this.board[row * 9 + (s % 3 * 3 + c2)];
                this.board[row * 9 + (s % 3 * 3 + c2)] = tmp;
            }
        }

        // randomly swap rows within each row of subsquares
        for (let s = 0; s < 42; s++) {
            let r1 = Math.floor(Math.random() * 3);
            let r2 = Math.floor(Math.random() * 3);

            for (let col = 0; col < 9; col++) {
                let tmp = this.board[(s % 3 * 3 + r1) * 9 + col];
                this.board[(s % 3 * 3 + r1) * 9 + col] = this.board[(s % 3 * 3 + r2) * 9 + col];
                this.board[(s % 3 * 3 + r2) * 9 + col] = tmp;
            }
        }

        return this.generateRowsAndColums(this.board);

    }

    generateRowsAndColums(board) {
        let newBoard = [];
        while (board.length > 0) {
            let row = board.splice(0, 9);
            newBoard.push(row);
        }
        return newBoard;
    }


}

export default SudokuMaker;
