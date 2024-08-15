//Create an object to store the scores
let score = JSON.parse(localStorage.getItem('score'));
if (!score) {
    score =
    {
        Wins: 0,
        Losses: 0,   ///re-assign the value if local storage has null value by creating a default object
        Ties: 0
    };
}
updateScore();

function pickMove() {
    const randomno = Math.random()
    let ComputerMove = '';
    if (randomno >= 0 && randomno < 1 / 3) {
        ComputerMove = 'Rock';
    }
    else if (randomno >= 1 / 3 && randomno < 2 / 3) {
        ComputerMove = 'Paper';
    }
    else if (randomno >= 2 / 3 && randomno < 1) {
        ComputerMove = 'Scissors';
    }
    return ComputerMove;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML = `Wins : ${score.Wins}  &nbsp;  Losses : ${score.Losses}   &nbsp  Ties : ${score.Ties}`;
}

let isautoplay=false;

let intervalID;

function autoplay()
{
    if(!isautoplay)
{
    intervalID=setInterval(()=>
    {   
        const playerMove=pickMove();
        play(playerMove);
    },1000)
    isautoplay=true;
    document.querySelector('.auto-play').innerHTML="Stop Play";
}
else
{
    clearInterval(intervalID);
    isautoplay=false;
    document.querySelector('.auto-play').innerHTML="Auto Play";
}
}

document.querySelector('.js-rock-button').addEventListener('click',()=>{
    play('Rock');
})

document.querySelector('.js-paper-button').addEventListener('click',()=>{
    play('Paper');
})


document.querySelector('.js-scissor-button').addEventListener('click',()=>{
    play('Scissors');
})

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r')
    {
        play('Rock');
    }
    else if(event.key==='p')
    {
        play('Paper');
    }
    else if(event.key==='s')
    {
        play('Scissors');
    }
})






function play(playerMove) {
    const ComputerMove = pickMove();
    let res = '';
    if (playerMove === 'Scissors') {
        if (ComputerMove === 'Rock') {
            res = 'You Lose';
        }
        else if (ComputerMove === 'Paper') {
            res = 'You Win'
        }
        else if (ComputerMove === 'Scissors') {
            res = 'Tie';
        }
    }
    else if (playerMove === 'Paper') {
        if (ComputerMove === 'Rock') {
            res = 'You Win';
        }
        else if (ComputerMove === 'Paper') {
            res = 'Tie'
        }
        else if (ComputerMove === 'Scissors') {
            res = 'You Lose';
        }
    }
    else if (playerMove === 'Rock') {
        if (ComputerMove === 'Rock') {
            res = 'Tie';
        }
        else if (ComputerMove === 'Paper') {
            res = 'You Lose'
        }
        else if (ComputerMove === 'Scissors') {
            res = 'You Win';
        }
    }
    if (res === 'You Win') {
        score.Wins += 1;
    }
    else if (res === 'You Lose') {
        score.Losses += 1;
    }
    else if (res === 'Tie') {
        score.Ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));  //stores the score in the local storage of the computer

    updateScore();

    document.querySelector('.js-result').innerHTML = `${res}`;

    document.querySelector('.js-moves').innerHTML = `Your Move <img src="${playerMove}-emoji.png" alt="" class="moves">
    Computer Move <img src="${ComputerMove}-emoji.png" alt="" class="moves">`;

    

}