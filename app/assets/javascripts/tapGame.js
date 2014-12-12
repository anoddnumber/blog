
var startTapGame = function(){
	
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	
	//Lets save the cell width in a variable for easy control
	var rows;
    var numRows = 5;
    var numCols = 4;
	var cw = w/numCols; //cell width
	var ch = h/numRows; //cell height
	var score;
	var isInGame = false;
	
	function newGame() {
        if (isInGame) {
            return;
        } else {
            isInGame = true;
            init();
        }
    }
    
    function endGame() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = "black";
        ctx.strokeRect(0, 0, w, h);
        
        //Lets paint the score
        ctx.font="30px Verdana";
        ctx.fillStyle = "black";
        var score_text = "Score: " + score;
        ctx.fillText(score_text, w/3, h/3);
        ctx.fillText("Please click to start a new game", w/4, h/2);
        
        isInGame = false;
    }
    
	function init()
	{
		score = 0;
		createRows();
		update();
	}
	newGame();
	canvas.addEventListener("mousedown", newGame);
	
	function createRows() 
	{
		rows = [];
		for (var i = 0; i < numRows; i++) {
			rows.push(createRow());
		}
	}
	
	function createRow() {
	    var safeSquare = Math.floor(Math.random() * numCols); //[0, numCols)
        return {safe:safeSquare};
	}
	
	function update()
	{
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		for (var i = 0; i < rows.length; i++) {
		    var row = rows[i];
		    for (var j = 0; j < numCols; j++) {
		        if (j != row.safe) {
		            paint_cell(j, i);
		        }
		    }
		}
        document.getElementById("score").innerHTML = "Score: " + score;
	}
	
	
	//Lets first create a generic function to paint cells
	function paint_cell(x, y)
	{
		ctx.fillStyle = "black";
		ctx.fillRect(x*cw, y*ch, cw, ch);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cw, y*ch, cw, ch);
	}
	
	function move(col) {
	    var nextRow = rows[rows.length - 1];
	    if (nextRow.safe == col) {
	        console.log("safe!");
	        score++;
	        rows.pop();
	        rows.unshift(createRow());
	        update();
	    } else {
	        console.log("not safe");
	        // init();
	        endGame();
	        return;
	    }
	}
	
	//Lets add the keyboard controls now
	$(document).keydown(function(e){
	    var key = e.which;
	    if ( ! isInGame) {
	        switch(key) {
	            case " ".charCodeAt(0): newGame(); break;
	        }
	        
	        return;
	    }
		var col = -1;
		switch(key) {
		    // case "A".charCodeAt(0): col = 0; break;
		    // case "S".charCodeAt(0): col = 1; break;
		    case "D".charCodeAt(0): col = 0; break;
		    case "F".charCodeAt(0): col = 1; break;
		    case "J".charCodeAt(0): col = 2; break;
		    case "K".charCodeAt(0): col = 3; break;
		    // case "L".charCodeAt(0): col = 6; break;
		    case 186: col = 7; break; //186 is the code for ";"
		}
		if (col >= 0) {
		    move(col);
		}
	});
};

var ready = function() {
	if ($('body').hasClass('tap_game')) {
		startTapGame();
	}
};

$(document).ready(ready);
$(document).on('page:load', ready);

