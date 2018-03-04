function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    console.log(userDatas);

   
    deleteDeadCharacter(userDatas);
    sortByName(userDatas);
    generateGrid(userDatas);
    document.getElementById('search-button').addEventListener('click', function () {
        searchByName(userDatas);
    });
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

/*var obj = (function(){
    var privateProp = 'privát tulajdonság';
    var publicProp = 'Publikus tulajdonság';
    function getPrivateProp(){
        console.log(privateProp)
    };
    function setPrivateProp(value){
        privateProp = value;
    };
    return {
        publicProp: publicProp, //a tulajdonság értéke bármi lehet
        getPrivateProp:getPrivateProp,
        setPrivateProp: setPrivateProp
    }
})(); */

/*
//végig kell először gondolni, hogy mire lesz szükségünk
getJsonContent()                //odaadja a json fájlt -- publikus
sortByName()                     //név szeerint rendezi az adatokat --privát
deleteDeadCharacter()           //törli a halott karaktereket --privát
generateGrid()                  // legenerálja a 6x8-as karakter adathalmazt a html-be -- publikus mehet privátba is, ha ez a sorrend marad, de inkább legyen külön!
addEventListenerForGridElement() //az egyes képekhez eseménykezelőt ad --privát
writeCharacterData()            // a kiválasztott karakter adatait megjeleníti a jobboldali sávban -- privát
searchByName()                  //név szerinti keresés -- privát
*/


//halott karakterek törlése
function deleteDeadCharacter(data){
    for(var i in data){
            if(data[i].dead === "true"){
             delete data[i]; 
            }
    }
}

//sorbarendezés
 function sortByName(data){
    data.sort(function (a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}

//characterek megjelenítése
function generateGrid(data){
    for(var i in data){
        var mapMainDiv = document.getElementById('map');  //beszúrási hely kiválasztása
        var newDiv = document.createElement('div'); //div létrehozás
        var newPicDiv = document.createElement('div');
        var newP = document.createElement('p');

        newDiv.setAttribute('class', 'divCharacters');
        newP.setAttribute('class', 'newP');
        
        newDiv.innerHTML = `<img src="${data[i].portrait}" alt="${data[i].name}">`;
        newP.innerHTML = `${data[i].name}`;
        
        mapMainDiv.appendChild(newDiv); //képet-nevet tartalmazó div hozzáadása a html-hez
        newDiv.appendChild(newPicDiv);
        newDiv.appendChild(newP);
    }
    document.querySelector('.divCharacters').addEventListener('mouseover', function() {
        writeCharacterData(data);
    });
}

function writeCharacterData(data){
        var rightPic = document.createElement('div');
        var rightName = document.createElement('p');
        var rightBio = document.createElement('text');

        for(var i in data){
        rightPic.innerHTML = `<img src="${data[i].picture}" alt="${data[i].name}">`;
        rightName.innerHTML = `${data[i].name}`;
        rightBio.innerHTML = `${data[i].bio}`;
        };
        document.getElementById('targetCharacter').appendChild(rightPic);
        document.getElementById('targetCharacter').appendChild(rightName);
        document.getElementById('targetCharacter').appendChild(rightBio);

}

function searchByName(data){
        var searchCharacter = document.getElementById('search').innerHTML;
        var givenCharacter = searchCharacter.valueOf().toLowerCase();
        
        for(var i in data){
        if(givenCharacter = (data[i].name).toLowerCase().indexOf(givenCharacter)){
            writeCharacterData(data, i);
            searchCharacter.value = data[i].name;
        }
        else {
            document.querySelector('.targetCharacter p:first-of-type').innerHTML = 'Character not found';
            document.querySelector('.targetCharacter div:first-child').innerHTML = '';
            document.querySelector('.targetCharacter text:first-of-type').innerHTML = '';
        }
    }
}
