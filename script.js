



const board = [
    [-2,-3,-4,-5,-6,-4,-3,-2],
    [-1,-1,-1,-1,-1, -1,-1,-1],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 4, 5, 6, 4, 3, 2]
  ];


  function updateMatrix(x,y){

    board[x[0]][x[1]]=x[2];

    board[y[0]][y[1]]=y[2];

    
  }



  const pieceMap = {
    '1': 'wp',  
    '2': 'wr',  
    '3': 'wn',  
    '4': 'wb',  
    '5': 'wq',  
    '6': 'wk',
    '-1': 'bp', 
    '-2': 'br', 
    '-3': 'bn', 
    '-4': 'bb', 
    '-5': 'bq', 
    '-6': 'bk' 

};
  
function renderBoard() {
    const boardElement = document.querySelector('.board');
    boardElement.innerHTML = '';

    boardElement.innerHTML =    '<svg class="numLett" viewBox="0 0 100 100" class="coordinates"><text x="0.75" y="3.5" font-size="2.8" class="coordinate-light">8</text><text x="0.75" y="15.75" font-size="2.8" class="coordinate-dark">7</text><text x="0.75" y="28.25" font-size="2.8" class="coordinate-light">6</text><text x="0.75" y="40.75" font-size="2.8" class="coordinate-dark">5</text><text x="0.75" y="53.25" font-size="2.8" class="coordinate-light">4</text><text x="0.75" y="65.75" font-size="2.8" class="coordinate-dark">3</text><text x="0.75" y="78.25" font-size="2.8" class="coordinate-light">2</text><text x="0.75" y="90.75" font-size="2.8" class="coordinate-dark">1</text><text x="10" y="99" font-size="2.8" class="coordinate-dark">a</text><text x="22.5" y="99" font-size="2.8" class="coordinate-light">b</text><text x="35" y="99" font-size="2.8" class="coordinate-dark">c</text><text x="47.5" y="99" font-size="2.8" class="coordinate-light">d</text><text x="60" y="99" font-size="2.8" class="coordinate-dark">e</text><text x="72.5" y="99" font-size="2.8" class="coordinate-light">f</text><text x="85" y="99" font-size="2.8" class="coordinate-dark">g</text><text x="97.5" y="99" font-size="2.8" class="coordinate-light">h</text></svg>' 


    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const sq = document.createElement('div');
            sq.classList.add('pieceContainer'),
         
            sq.style.gridColumn = col + 1;
            sq.style.gridRow = row + 1;

            sq.dataset.row = row;
            sq.dataset.col = col;
            sq.dataset.content = 0;

            const pieceNum = board[row][col];
            if (pieceNum !== 0) {
                // sq.dataset.code=pieceNum;
                const piece = pieceMap[pieceNum]; 
                sq.dataset.content = pieceNum;
                const img = document.createElement('img');
                img.src = `pieces/${piece}.png`; 
                img.alt = piece;
                img.classList.add('piece');
                sq.appendChild(img);
                 
            }
           

           boardElement.appendChild(sq);
        }
    }
    AddEvents();
}

renderBoard();

document.getElementById('clc').addEventListener('click' ,function test() {

    updateMatrix([6,4,0],[4,4,1]);
    renderBoard();


  
    
    
} )


let start = [null, null, null]; // To store row, col, and piece for the starting square
let end = [null, null, null];   // To store row, col, and piece for the ending square

function AddEvents() {
    const allPieces = document.querySelectorAll('.pieceContainer');

    allPieces.forEach(element => {
        element.addEventListener('click', function () {
            const row = parseInt(element.dataset.row, 10);
            const col = parseInt(element.dataset.col, 10);
            const pieceN = parseInt(element.dataset.content, 10);

            if (start[2] === null || start[2] === 0) {
                // First click: select the starting square
                start[0] = row;
                start[1] = col;
                start[2] = pieceN;
                if (pieceN==0) {

                    //
                    
                } else {
                      element.classList.add('selected');
                }
              

                console.log(`Start selected: Row ${row}, Col ${col}, Piece ${pieceN}`);
            } else if (start[0] === row && start[1] === col) {
                // Deselect the starting square if clicked again
                element.classList.remove('selected');
                console.log(`Deselected start: Row ${row}, Col ${col}`);
                start = [null, null, null];
            } else {
                // Second click: select the ending square
                end[0] = row;
                end[1] = col;
                end[2] = pieceN;

                console.log(`End selected: Row ${row}, Col ${col}, Piece ${pieceN}`);

                // Perform move
                updateMatrix(
                    [start[0], start[1], 0], // Clear the starting position
                    [end[0], end[1], start[2]] // Move the piece to the ending position
                );

                // Re-render the board
                renderBoard();

                // Clear start and end for the next move
                start = [null, null, null];
                end = [null, null, null];
            }
        });
    });
}
