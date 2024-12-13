const score = JSON.parse(localStorage.getItem('score')) || {wins: 0, losses: 0, ties: 0};

            updateResult();
            updateMoves();
            updateScore();

            function updateScore(){
                document.querySelector('.js-score').innerHTML = `\nWins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
            }

        function playGame(playerMove) {
            const randomNumber = Math.random();
            let computerMove = '';
            let result = '';

            if (randomNumber >= 0 && randomNumber < 1 / 3) {
                computerMove = 'Rock';
            } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
                computerMove = 'Paper';
            } else {
                computerMove = 'Scissors';
            }

            if (playerMove === computerMove) {
                result = 'Tie.';
            } else if (
                (playerMove === 'Rock' && computerMove === 'Scissors') ||
                (playerMove === 'Paper' && computerMove === 'Rock') ||
                (playerMove === 'Scissors' && computerMove === 'Paper')
            ) {
                result = 'You win.';
            } else {
                result = 'You lose.';
            }

            if(result === 'You win.'){
                score.wins++;
            }
            else if(result === 'You lose.'){
                score.losses++;
            }
            else if (result === 'Tie.'){
                score.ties++
            }

            localStorage.setItem('score', JSON.stringify(score));
    
            function updateResult(){
                document.querySelector('.js-result').innerHTML = result;
            }

            function updateMoves(){
                document.querySelector('.js-moves').innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}.`;
            }

            updateResult();
            updateMoves();
            updateScore();
        }