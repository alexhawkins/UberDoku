'use strict';
import should from 'should';
import chai from 'chai';
import App from '../src/app/app.module';

var expect = chai.expect;


describe('sanity test', () => {
    it('true should be true', () => {
        true.should.be.ok;
    });
});


describe("App", () => {
    let app = new App();
    describe("constructor", () => {
        it("should have a default name", () => {
            expect(app.name).to.equal("Uberdoku");
            expect(app).to.be.an.instanceof(App);
        });


    });
    describe("constructor", () => {
        it("should have the following methods & properties", () => {
            expect(app.service).to.be.an.instanceof(Function);
            expect(app.events).to.be.an.instanceof(Object);
            expect(app.initialize).to.be.an.instanceof(Function);
            expect(app.getData).to.be.an.instanceof(Function);
            expect(app.getData).to.be.an.instanceof(Function);
            expect(app.handleRequest).to.be.an.instanceof(Function);
        });

    });

    describe("modules", () => {
        it("should have loaded and attached the following modules", () => {
            expect(app.Header).to.be.an.instanceof(Object);
            expect(app.Footer).to.be.an.instanceof(Object);
            expect(app.Game).to.be.an.instanceof(Object);
        });

        it("should have received the eventing system", () => {
            expect(app.Game.events).to.be.an.instanceof(Object);
            expect(app.Header.events).to.be.an.instanceof(Object);
            expect(app.Footer.events).to.be.an.instanceof(Object);
        });
    });


    describe("default properties", () => {
        it("should have loaded the following properties", () => {
            expect(app.getProps()).to.be.an.instanceof(Object);
            expect(app.getProps().difficulty).to.equal(50);
            expect(app.getProps().userAnswers).to.be.an.instanceof(Map);
            expect(app.getProps().games).to.be.an.instanceof(Map);
            expect(app.getProps().board).to.be.an.instanceof(Map);
            expect(app.getProps().colors).to.be.an.instanceof(Object);
            expect(app.Game.getAllGames()).to.be.an.instanceof(Object);
        });
    });


    let data = {
        "0": [
            [9, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ],
        "1": [
            [5, 3, 4, 6, 7, 8, 9, 1, 2],
            [6, 7, 2, 1, 9, 5, 3, 4, 8],
            [1, 9, 8, 3, 4, 2, 5, 6, 7],
            [8, 5, 9, 7, 6, 1, 4, 2, 3],
            [4, 2, 6, 8, 5, 3, 7, 9, 1],
            [7, 1, 3, 9, 2, 4, 8, 5, 6],
            [9, 6, 1, 5, 3, 7, 2, 8, 4],
            [2, 8, 7, 4, 1, 9, 6, 3, 5],
            [3, 4, 5, 2, 8, 6, 1, 7, 9]
        ]
    };

    app.handleRequest(data);
    app.Game.initialize(data);
    describe("games", () => {

        it("should have made an ajax request and retrieved game data", () => {
            expect(app.Game.getAllGames()).to.be.an.instanceof(Map);
            expect(app.Game.getGameBoard()).to.be.an.instanceof(Map);
            expect(app.Game.getAllGames().get('all')).to.be.an.instanceof(Object);
            expect(Array.isArray(app.Game.getAllGames().get('all')[0]));
        });
        it("should be an array of games", () => {
            expect(app.Game.getAllGames().get('all').length).to.equal(1);
            expect(Array.isArray(app.Game.getAllGames().get('all')[0]));
            expect(Array.isArray(app.Game.getAllGames().get('all')[1]));
        });
        it("should have nine rows", () => {
            expect(app.Game.getAllGames().get('all')[0].length).to.equal(9);
        });
        it("should have nine columns", () => {
            expect(app.Game.getAllGames().get('all')[0][0].length).to.equal(9);
        });
    });


    describe("solution", () => {
        app.handleRequest(data);
        it("should have set a solution after retrieving game data", () => {
            expect(app.Game.getSolution()).to.be.an.instanceof(Map);
            expect(app.Game.getSolution().get('solution')).to.be.an.instanceof(Object);
            expect(Array.isArray(app.Game.getSolution().get('solution')[0]));
        });

        it("should be an array", () => {
            expect(app.Game.getSolution().get('solution').length).to.equal(9);
        });
        it("should be an array of nine rows and nine and nine columns", () => {
            let board = app.Game.getSolution().get('solution');
            board.forEach((row, i) => {
                    expect(row.length).to.equal(9);

                it("each row element should be a number from 0 to 9", () => {
                    expect(row[i] <= 9 && row[i] >= 0).to.equal(true);
                });


                it("each row should have nine columns", () => {
                    row.forEach((col, i) => {
                            expect(col.length).to.equal(9); 
                            it("each col element should be a number from 0 to 9", () => {
                            expect(col[i] <= 9 && col[i] >= 0).to.equal(true);
                        });
                    });

                });
            });
        });
    });
});
