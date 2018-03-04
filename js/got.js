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
    for(let i in data){
        var mapMainDiv = document.getElementById('map');  //beszúrási hely kiválasztása
        var newDiv = document.createElement('div'); //div létrehozás
        var newP = document.createElement('p');

        (function(){
            newDiv.addEventListener('click', function(){
                writeCharacterData(data, i);
            });
            })(data, i);

        newDiv.setAttribute('class', 'divCharacters');
        newP.setAttribute('class', 'newP');
        
        newDiv.innerHTML = `<img src="${data[i].portrait}" alt="${data[i].name}">`;
        newP.innerHTML = `${data[i].name}`;
        
        mapMainDiv.appendChild(newDiv); //képet-nevet tartalmazó div hozzáadása a html-hez
        newDiv.appendChild(newP);
    }
}

function writeCharacterData(data, i){
        rightPic.innerHTML = `<img src="${data[i].picture}" alt="${data[i].name}">`;
        rightName.innerHTML = `${data[i].name}`;
        rightBio.innerHTML = `${data[i].bio}`;
        }

function searchByName(data){
        var searchCharacter = document.getElementById('search');
        var givenCharacter = searchCharacter.value.toLowerCase();
        
        for(var i = 0; i < data.length; i++){
        if(givenCharacter && (data[i].name).toLowerCase().indexOf(givenCharacter) > -1){
            writeCharacterData(data, i);
            searchCharacter.value = data[i].name;
            break;
        }
        else {
            rightName.innerHTML = 'Character not found';
            rightPic.innerHTML = '';
            rightBio.innerHTML = '';
        }
    }
}
