var app = require('app');
var BrowserWindow = require('browser-window');

///<reference path="https://trello.com/1/client.js" />
///<reference path="http://code.jquery.com/jquery-1.7.1.min.js" />

var mainWindow = null;

app.on('window-all-closed', function() {
 if (process.platform != 'darwin')
 app.quit();
});

app.on('ready', function(){
	mainWindow = new BrowserWindow({width:800, height:600, icon:__dirname + '/resources/SupaStud.ico'});
	mainWindow.loadURL('file://' + __dirname + '/index.html');
	mainWindow.on('closed', function() {
		mainWindow =null;
	});
});



var authenticationSuccess = function() { console.log("Successful authentication"); };
var authenticationFailure = function() { console.log("Failed authentication"); };

function loginToTrello() {
	
	Trello.authorize({
		type: "popup",
		name: "Getting Started Application",
		scope: {
			read: true,
			write: true
		},
		expiration: "never",
		authenticationSuccess,
		authenticationFailure
	});
	
	

}

function addCard() {
	
	var myList = "567317217513a42e82c785f7";
	var creationSuccess = function(data) {
		console.log("Card created successfully.  Data returned:" + JSON.stringify(data));
		
	};
	var newCard = {name: "New Test Card", desc: "This is the description of our new card.", pos: "top", idList: myList};
	
	Trello.post("/cards", newCard, creationSuccess);
}

function getPRComments(){
    $.ajax({
        type: "GET",
        url: "https://bitbucket.org/api/2.0/repositories/yaharasoftware/natus_platformmigration/pullrequests/activity",
        dataTYpe: "json",
        async: false,
        headers: {
            "Authorization": "Basic " + btoa("gstarbuck" + ":" + "hgpass")
        },
        success: function(data) {
            alert(data);
        }
    })
}