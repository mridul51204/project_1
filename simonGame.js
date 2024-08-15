let userInput=[];
let ansInput=[];
let highScore=[];
let options=["color1","color2","color3","color4"];
let start=false;
let level=0;
let p=document.querySelector('p');
let body=document.querySelector('body');
let h5=document.querySelector('h5');
let max=0;

document.addEventListener("keypress",function()
{
    if(start==false)
    {
        start=true;
        levelUp();
    }
});
function levelUp()
{
    level++;
    p.innerText=`Level ${level}`;
    let rand=Math.floor(Math.random()*3);
    let selectedOption=document.querySelector(`.${options[rand]}`);
    ansInput.push(options[rand]);
    gameFlash(selectedOption);
}
function gameFlash(btn)
{
    btn.classList.add("test");
    setTimeout(function()
    {
        btn.classList.remove("test");
    },250);
}
function userFlash(btn)
{
    btn.classList.add("userTest");
    setTimeout(function()
    {
        btn.classList.remove("userTest");
    },250);
}
function wrongFlash()
{
    body.classList.add("wrongAns");
    setTimeout(function()
    {
        body.classList.remove("wrongAns")
    },250);
}
let a=0;
function buttonPressed()
{
    let bttn=this;
    userFlash(bttn);
    userInput.push(bttn.getAttribute("id"));  
    a++;
    for(let h=0;h<=a;h++)
    {
        checkAnwer(h);
    }
    
}

let btns=document.querySelectorAll('.item');
for(btn of btns)
{
    btn.addEventListener('click',buttonPressed);//it adds eventListiner to every btn
}


function checkAnwer(num)
{
    let flag=0;
    for(let i=0;i<num;i++)
    {
        if(userInput[i]!=ansInput[i])
        {
            flag=1;
        }
    }
    if(flag==0 && num==level)
    {
        setTimeout(levelUp,1000);
        userInput=[];
        a=0;
    }
    else if(flag==1)
    {
        p.innerHTML=`Game over your score was <b>${level}</b><br> Press any key to start`;
        highScore.push(level);
        wrongFlash();
        reset();
        for(let i=0;i<highScore.length;i++)
        {   
            if(highScore[i]>max)
            max=highScore[i];
        }
        h5.innerText=`SCORE: ${max} `;

    }
}
function reset()
{
    start=false;
    level=0;
    userInput=[];
    ansInput=[];
    a=0;
    max=0;
}