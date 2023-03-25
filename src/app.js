import {test} from './player.js';
import {startButtons} from './menu.js';

test();

function startCanvas(){
    const canvas = document.getElementById("canvas_bg");
    const c = canvas.getContext('2d');

    canvas.width = 960
    canvas.height = 540
    //canvas.style = "";


    c.fillRect(0, 0, canvas.width, canvas.height)
}

startCanvas();
startButtons();