var easyUndoRedo = function(options) {
	var settings = options ? options : {};
	var undoRedoFlag =0 ;
	var defaultOptions = {
		stackLength: 20 ,
		initialValue:'null'
	};
	
	this.stackLength = (typeof settings.stackLength != 'undefined') ? settings.stackLength : defaultOptions.stackLength;
	this.initialValue = (typeof settings.initialValue != 'undefined') ? settings.initialValue : defaultOptions.initialValue;
	var undoRedoStack = new Array ();
	undoRedoStack.push (this.initialValue);
	
	this.undo = function () {
		if ( undoRedoFlag >0 ) {
			undoRedoFlag--;
			return undoRedoStack[undoRedoFlag] ;
		}else {
			//alert ("Undo last limit reached");
			return undoRedoStack[undoRedoFlag];
		}
	}
	this.redo = function () {
		if ( undoRedoFlag == undoRedoStack.length-1 ) {
			//alert ("Redo last limit reached");
			return undoRedoStack[undoRedoFlag];
		}else {
			undoRedoFlag++;
			return undoRedoStack[undoRedoFlag];
		}
	}
	this.save = function (value) {
        if (  undoRedoFlag < undoRedoStack.length-1 ) {
            undoRedoStack.splice( undoRedoFlag+1 , undoRedoStack.length-1);
            undoRedoFlag++;
            undoRedoStack.push (value);
        }else {
            if(this.stackLength >= undoRedoStack.length){
                undoRedoFlag++;
                undoRedoStack.push (value);
            }else{
                undoRedoStack.shift();
                undoRedoStack.push (value);
            }
        }
    }
};
