//game constants and variables
let inputDir={x:0, y:0};
let speed=12;
score=0;
lastPaintTime=0;
let snakeArr=[
    {x: 13, y: 15}
]

food={x:12,y:11}

//game function
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime- lastPaintTime)/1000<1/speed){
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
    
}

function isCollide(snake){

    //if you bump into yourself
    for (let i = 1 ; i < snakeArr.length; i++){
        if(snake[i].x===snake[0].x &&snake[i].y===snake[0].y){
            return true;
        }
    }

    //if you bump into the wall
        if(snake[0].x>=18 || snake[0].x<=0 ||snake[0].y>=18 || snake[0].y<=0 ){
            return true;       
        }
    }   


function gameEngine(){
    //Updating the snake array and food
    if(isCollide(snakeArr)){
        inputDir={x:0,y:0};
        alert(`Game over. Your score is ${score}! \nThe highscore is 58! Score 59 to beat it.\nPress any key to restart `);
        snakeArr=[{x:13,y:15}];
        score=0;
    }

    //if food is eaten,increment the score and regen the food

    if(snakeArr[0].y===food.y &&snakeArr[0].x===food.x){
        snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y:snakeArr[0].y+ inputDir.y});
        let a=2;
        b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
        score+=1;
    }

    //Moving the snake
     for (let i = snakeArr.length-2; i>=0; i--) {
        
        snakeArr[i+1]={...snakeArr[i]};
        
     }
     snakeArr[0].x+=inputDir.x;
     snakeArr[0].y+=inputDir.y;
     


    //Then display the snake and food in the next function

    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        //display the snake
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })
    //display the food
    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);  
}


//main logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //Starts the game
    switch (e.key) {
        case "ArrowUp":
        console.log("arrowup");
        inputDir.x=0;
        inputDir.y=-1;
            break;
            
        case "ArrowDown":
        inputDir.x=0;
        inputDir.y=1;
            break;

        case "ArrowLeft":
        inputDir.x=-1;
        inputDir.y=0;
            break;        

        case "ArrowRight":
        inputDir.x=1;
        inputDir.y=0;
            break;

        default:
            break;
    }
})