const form =document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI objesini başlatma
const ui = new UI();
// Storage objesi üret
const storage = new Storage();


// Tüm eventleri yükleme
eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);

    });
    cardbody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);

}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        //hata
        ui.displayMessages("Tüm alanları doldurunuz... ","danger");
    }
    else {
        // YEni film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm);    // Arayüzze film ekleme
        storage.addFilmToStorage(newFilm);  // storage yeni film ekleme
        ui.displayMessages("Film başarıyla eklendi...","success");
    }

    ui.clearInputs(titleElement,urlElement,directorElement);

    e.preventDefault();
}
function deleteFilm(e){
    if(e.target.id === "delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme işlemi başarılı...","success");
    }
}
function clearAllFilms(){
    if (confirm("Emin misiniz ?")) {
        
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();

    }
}