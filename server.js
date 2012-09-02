/*
 *  Node.js Web Server for ODMarket App.
 */

//Used Express.js Framework. Cause I don't went to reinvent the whole motherf*cking wheel. ;)
var express = require('express');
var fs      = require('fs');

//In-memory data stores.
var products = getProducts();
var categories = getCategories();
var suppliers = getSuppliers();

/*Helper methods. Don't mind 'em*/

//Reads a file synchronously, uses utf8.
function readFileSync(path){
    return fs.readFileSync(path, 'utf8');
}

//Reads a file and returns it as json.
function get(path){
    var asString = readFileSync(path);
    var asJson = JSON.parse(asString);
    return asJson;
}

/*End of helper methods.*/

//The following three methods get data from local file system and provide them as JSON.
function getProducts(){
    return get('data/products.json');
}

function getCategories(){
    return get('data/categories.json');
}

function getSuppliers(){
    return get('data/suppliers.json');
}

var app = express(); //Create express application.

app.configure(function(){
    app.set('name', 'ODMarket');
    app.use(express.static(__dirname+'/www'));
});

//Routes.
app.get('/', function(req, res){
    res.sendfile('index.html');
    });

app.get('/api/products', function(req, res){
    res.json(200, products);
    });

app.get('/api/categories', function(req, res){
    res.json(200, categories);
    });

app.get('/api/suppliers', function(req, res){
    res.json(200, suppliers);
})

app.listen(8080);

console.log('Listening at http://localhost:8080');