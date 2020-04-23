!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var n=()=>{const e=(e,t)=>{const r=document.querySelectorAll(".wrapper section");document.getElementById(e).addEventListener("click",e=>{for(let e=0;e<r.length;e+=1){const{id:n}=r[e];r[e].style.display=n===t?"block":"none"}e.preventDefault()})},t=(e,t,r)=>{document.querySelector(e).innerHTML=`<span class="text-danger" id="${t}">${r}</span>`,setTimeout(()=>{document.querySelector("#"+t).remove()},2e3)};return{displayContinueToGame:()=>{e("start-btn","continue-to-game")},displayInstruction:()=>{e("read-instruction-btn","read-instruction")},returnToContinueToGame:()=>{e("return-to-continue-btn","continue-to-game")},displayStartGame:()=>{e("playgame-btn","playgame-section")},checkMarker:()=>{const e=document.getElementById("player1-marker");e.addEventListener("keyup",(function(){const r=["X","x"],n=["O","o"];r.includes(e.value)?document.getElementById("player2-marker").value=n[r.indexOf(e.value)]:n.includes(e.value)?document.getElementById("player2-marker").value=r[n.indexOf(e.value)]:""===e.value?document.getElementById("player2-marker").value="":t(".game-error-msg","error","Input either X or O")}))},exitGame:()=>{e("exit-game-btn","goodbye-section")},showErrorMsg:t,openBoard:()=>{document.getElementById("boardgame-section").style.display="block",document.getElementById("playgame-section").style.display="none"},msgAlert:e=>{document.getElementById("get-turn-msg").innerHTML=e}}};var o=(e,t)=>{let r=0;return{getName:()=>e,getMarker:()=>t,getScore:()=>r,score:r,increaseScore:()=>r+=1}};var a={renderBoard:e=>{let t="";for(let r=1;r<=e.length;r+=1)t+=`<button class="cell cell-${r}" id="cell-${r}">${e[r-1]}</button>`;return document.getElementById("display-board").innerHTML=t,t}};const l=(()=>{let e=["","","","","","","","",""];const t=()=>[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];return{boardArray:e,winningCombinations:t,thereIsWinner:t=>[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]].some(r=>r.every(r=>e[r-1]===t)),changeTurns:(e,t,r)=>e=e===t?r:t,placeMarker:(t,r)=>{e[t-1]=r},tieMove:()=>e.every(e=>""!==e),resetGame:()=>{e=[];for(let t=0;t<9;t+=1)e.push("");return e},getFilledCell:()=>{const t=[];return e.forEach((e,r)=>{""!==e&&t.push(r+1)}),t},isEmpty:()=>e.every(e=>""===e)}})(),c=n();var u=()=>{const e=e=>document.getElementById(e).value,t=()=>[o(e("player1-name"),e("player1-marker")),o(e("player2-name"),e("player2-marker"))],r=(e,t)=>{let r=l.boardArray;a.renderBoard(r);let n=e;c.msgAlert(n.getName()+", is your turn!"),document.addEventListener("click",o=>{if(o.target.classList.contains("cell")){const u=o.target.id.split("-")[1];l.placeMarker(u,n.getMarker()),a.renderBoard(r),((e,t,r)=>{if(l.thereIsWinner(e.getMarker())){c.msgAlert(`Congratulations, ${e.getName()}, you won the game!`),e.increaseScore(),document.querySelector("."+e.getMarker()).innerText="Score: "+e.getScore(),document.querySelectorAll(".cell").forEach(e=>{e.disabled=!0})}else l.tieMove()?c.msgAlert("The game is a draw"):(e=l.changeTurns(e,t,r),c.msgAlert(e.getName()+", is your turn!"))})(n,e,t),n=l.changeTurns(n,e,t),l.getFilledCell().forEach(e=>{document.getElementById("cell-"+e).disabled=!0})}if(o.target.classList.contains("play-again-btn")){document.querySelectorAll(".cell").forEach(e=>{e.disabled=!1}),r=l.resetGame(),a.renderBoard(r),n=e,c.msgAlert(e.getName()+", is your turn!")}})},u=()=>function(){const e=document.querySelectorAll(".playgame-section .form-control");if(Array.from(e).filter(e=>""===e.value).length>0){n().showErrorMsg(".game-error-msg","error-inputs","Please fill all inputs")}else{a.renderBoard(l.boardArray),c.openBoard();const e=t()[0],n=t()[1];(()=>{const e=t()[0],r=t()[1],n=document.querySelectorAll("#boardgame-section .form-control");Array.from(n).forEach(e=>{const{id:t}=e;e.innerText=document.querySelector(".playgame-section #"+t).value}),document.getElementById("player1-score").classList.add(""+e.getMarker()),document.getElementById("player2-score").classList.add(""+r.getMarker())})(),r(e,n)}};return{playGame:()=>{document.getElementById("set-player-btn").addEventListener("click",u())}}};const s=n();s.displayContinueToGame(),s.displayInstruction(),s.returnToContinueToGame(),s.displayStartGame(),s.checkMarker(),s.exitGame(),u().playGame()}]);