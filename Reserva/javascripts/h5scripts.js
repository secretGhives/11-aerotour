//////////////////////////
// DRAG N DROP RESERVATIONS
//
// select all the items to be dragged
var dragItems = document.querySelectorAll('#airNavMenuDrag > label, #heliNavMenuDrag > label');

for (var i = 0; i < dragItems.length; i++) {
  var el = dragItems[i];
  //make selected items draggable
  el.setAttribute('draggable', 'true');
  //add event that captures text of a dragged element as data
  addEvent(dragItems[i], 'dragstart', function (event) {
    // store the ID of the element, and collect it on the drop later on
    event.dataTransfer.setData('Text', this.innerText);
  });
}

// select all the drop zones
var recievers = document.querySelectorAll('ol.hours > li');

for (var i = 0; i < recievers.length; i++) {
  addEvent(recievers[i], 'drop', function (event) {
	  // stops the browser from redirecting off to the text.
	  if (event.preventDefault) {
		 event.preventDefault();
	  }

	  this.innerHTML += '<label>  > ' + event.dataTransfer.getData('Text') + '</label>';
	  this.setAttribute('class', 'reserved');
	  console.log("dnd RESERVED * " + this.innerText);
     document.getElementById("confirmModal").setAttribute('class', 'modal show');

	  return false;
  });

	// Tells the browser that we *can* drop on this target
	addEvent(recievers[i], 'dragover', cancel);
	addEvent(recievers[i], 'dragenter', cancel);

}

function cancel(event) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  return false;
}
 


//////////////////////////
// DRAG N DROP PROFILE VIEW UPLOAD
//
var holder = document.getElementById('dnd_area'),
	  state = document.getElementById('dnd_status');
 
if (typeof window.FileReader === 'undefined') {
  state.className = 'message error';
} else {
  state.className = 'message success';
  state.innerHTML = 'Ready!';
}
 
holder.ondragover = function () { this.className = 'hover'; return false; };
holder.ondragend = function () { this.className = ''; return false; };

holder.ondrop = function (e) {
	this.className = 'received';
	e.stopPropagation();
	e.preventDefault();

	var files = e.dataTransfer.files;
	var count = files.length;

	// Only call the handler if 1 or more files was dropped.
	if (count > 0)
		handleFiles(files);
}

function handleFiles(files) {
	var file = files[0];

	state.className = 'message info';
	state.innerHTML = "Processing " + file.name;

	var reader = new FileReader();

	// init the reader event handlers
	reader.onprogress = handleReaderProgress;
	reader.onloadend = handleReaderLoadEnd;

	// begin the read operation
	reader.readAsDataURL(file);
}

function handleReaderProgress(e) {
	if (e.lengthComputable) {
		var loaded = (e.loaded / e.total);

		//$("#progressbar").progressbar({ value: loaded * 100 });
		state.className = 'message warning';
		state.innerHTML = "Loading " + loaded;
	}
}

function handleReaderLoadEnd(e) {
	//$("#progressbar").progressbar({ value: 100 });
	state.className = 'message success';
	state.innerHTML = "Loaded";
	//var img = document.getElementById("preview");
	//img.src = e.target.result;
	holder.style.background = 'url(' + e.target.result + ') no-repeat center';
}

//holder.ondrop = function (e) {
//  this.className = 'received';
//  e.preventDefault();
// 
//  var file = e.dataTransfer.files[0],
//	   reader = new FileReader();
//  reader.onload = function (event) {
//	 holder.style.background = 'url(' + event.target.result + ') no-repeat center';
//	 console.log(event.target.result);
//  };
//  reader.readAsDataURL(file);
//  console.log(event.target.result);
//  console.log(reader.readAsDataURL(file));
// 
//  return false;
//};


//////////////////////////
// SESSION LOCAL STORAGE
//


// GET
//getStorage('session');
//getStorage('local');

// SET 
//sessionStorage.setItem('value', this.value);
//sessionStorage.setItem('timestamp', (new Date()).getTime());
//localStorage.setItem('value', this.value);
//localStorage.setItem('timestamp', (new Date()).getTime());

// CLEAR
//sessionStorage.clear();
//localStorage.clear();


//Report to Concole 
console.warn('↪ loaded HTML5 Native functionality');
