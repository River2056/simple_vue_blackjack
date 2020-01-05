const app = new Vue({
    el: '#app',
    data: {
        isGameRunning: false,
        isGameEnded: false,
        playerHand: [],
        dealerHand: [],
        playerPoints: 0,
        dealerPoints: 0,
        deck: [],
        cardSwitch: []
    },
    beforeMount() {
        this.deck = this.generateCardPool();
        this.cardSwitch = new Array(52).fill(false);
    },
    methods: {
        startNewGame() {
            this.isGameRunning = true;
            for(let i = 0 ; i < 2 ; i++) {
                this.playerHand.push(this.dealCard());
                this.dealerHand.push(this.dealCard());
            }
            this.playerPoints = this.checkHandValue(this.playerHand);
            this.dealerPoints = this.checkHandValue(this.dealerHand);
        },
        hit() {
            this.playerHand.push(this.dealCard());
            this.playerPoints = this.checkHandValue(this.playerHand);
            if(this.playerPoints > 21) {
                this.playerPoints = 'Busted!'
                alert('You busted! YOU LOST...');
                this.isGameEnded = true;
                return;
            }
        },
        stand() {
            while(this.dealerPoints <= 16) {
                this.dealerHand.push(this.dealCard());
                this.dealerPoints = this.checkHandValue(this.dealerHand);
                if(this.dealerPoints > 21) {
                    this.dealerPoints = 'Busted!';
                    alert('Dealer busted! YOU WON!');
                    this.isGameEnded = true;
                    return;
                }
            }
            // compare hand with player
            if(this.dealerPoints > this.playerPoints) {
                alert('YOU LOST...');
            } else if(this.dealerPoints === this.playerPoints) {
                alert('DRAW');
            } else {
                alert('YOU WON!');
            }
            this.isGameEnded = true;
        },
        giveUp() {
            this.isGameRunning = false;
            this.isGameEnded = false;
            this.playerHand = [];
            this.dealerHand = [];
            this.playerPoints = 0;
            this.dealerPoints = 0;
        },
        clearBoardNStartNewGame() {
            this.giveUp();
            this.startNewGame();
        },
        generateCardPool() {
            const colors = ['S', 'H', 'D', 'C'];
            const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K'];
            const pool = [];
            values.map(v => {
                colors.map(c => {
                    pool.push(`${v}${c}`);
                });
            });
            return pool
        },
        checkHandValue(hand) {
            let value = 0;
            hand.map(e => {
                let v = e.slice(0, -1);
                if (Number.isNaN(parseInt(v)) && hand.length == 2 && v === 'A') {
                    v = 11;
                } else if(Number.isNaN(parseInt(v)) && hand.length >= 3 && v === 'A') {
                    v = 1;
                } else if(Number.isNaN(parseInt(v))) {
                    v = 10;
                } else {
                    v = parseInt(v);
                }
                value += v;
            });
            return value;
        },
        dealCard() {
            let index;
            do {
                index = Math.floor(Math.random() * 52);
            } while (this.cardSwitch[index]);
            const card = this.deck[index];
            this.cardSwitch[index] = true;
            return card;
        },
        getSource(name) {
            return `./PNG/${name}.png`;
        }
    }
});