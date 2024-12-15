const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

updateScore();

function updateScore() {
    document.querySelector('.js-score').innerHTML = `
        Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResult(result) {
    document.querySelector('.js-result').innerHTML = result;
}

function updateMoves(playerMove, computerMove) {
    if (!playerMove || !computerMove) {
        document.querySelector('.js-moves').innerHTML = '';
    } else {
        document.querySelector('.js-moves').innerHTML = `
            You picked <img style="height: 40px" src ='/Images/${playerMove}-emoji.png'>. Computer picked <img style="height: 40px" src ='/Images/${computerMove}-emoji.png'>.`;
    }
}

function playGame(playerMove) {
    const randomNumber = Math.random();
    let computerMove = '';
    let result = '';

    if (randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else {
        computerMove = 'Scissors';
    }

    if (playerMove === computerMove) {
        result = 'Tie.';
        score.ties++;
    } else if (
        (playerMove === 'Rock' && computerMove === 'Scissors') ||
        (playerMove === 'Paper' && computerMove === 'Rock') ||
        (playerMove === 'Scissors' && computerMove === 'Paper')
    ) {
        result = 'You win.';
        score.wins++;
    } else {
        result = 'You lose.';
        score.losses++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateResult(result);
    updateMoves(playerMove, computerMove);
    updateScore();
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    localStorage.removeItem('score');

    updateScore();
    updateResult('');
    updateMoves('', '');
}
