export function startButtons(){
    document.getElementById('voltar').addEventListener('click', ()=>{
        restart();
    })
    document.getElementById('start').addEventListener('click',()=>{
        playButton();   
    })
}
function changeSairState(state){
    if(state){
        document.getElementById('voltar').style.display = 'block';
        document.getElementById('menu').style.display = 'none';
    }else{
        document.getElementById('voltar').style.display = 'none';
    }
}

export function restart(){
    document.getElementById('menu').style.display = 'block';
    changeSairState(false);
}

function playButton(){
    changeSairState(true);
}