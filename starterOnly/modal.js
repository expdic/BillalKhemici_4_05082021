function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const submitBtn = document.querySelectorAll(".btn-submit");
const validbg = document.querySelector(".bgroundvalid"); // je cree une const pour récuperer le css du modal de confirmation 

// je cree des const pour récuperer tout les input 
const first = document.getElementById("first");
const last = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const checkBox = document.getElementById("checkbox1");






// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// fermer le modal formulaire

document.getElementById("closer").addEventListener("click", function(closing) { // lors du clique sur la croix du formulaire dont l'id est closer : 
	modalbg.style.display = "none"; // le display de la class du modal (bground) devient none donc le modal se ferme 
});






// fermer le modale validation via le bouton terminer 

document.querySelector(".buttonvalid").addEventListener("click", function(closevalid) { // Lors du clique sur le bouton qui a la classe buttonvalid AKA le bouton fermer du modal validation :
	validbg.style.display = "none"; // le display de la class du modal (bgroundvalid) devient none donc le modal se ferme 
});


// fermer le modale validation via le bouton x

document.getElementById("closevalid").addEventListener("click", function(closevalid) { // Lors du clique sur le bouton qui a l'id closevalid AKA la croix du modal validation :
	validbg.style.display = "none"; // le display de la class du modal (bgroundvalid) devient none donc le modal se ferme 

});


// EMPECHER de valider le formulaire si des champs sont pas rempli 

modalbg.addEventListener("submit", (e) => {
  e.preventDefault(); // je desactive le submit 

  // je crée des var qui vérifie si les champs sont bien remplis, si c'est le cas, les variable egalent à 1 ou la variable quantity est égale à 2 car l'uilisateur a mit '0' dans le champ
  var firstvar = checkRequiredName(first);
  var lastvar = checkRequiredName2(last);
  var emailvar = checkRequiredEmail(email);
  var birthdayvar = checkRequiredBirthdate(birthdate);
  var quantityvar = checkRequiredQuantity(quantity);
  var checkcon = verifcheck("checkbox1");
  var checkloc = verifloc();

  if (firstvar === 1 && lastvar === 1 && emailvar === 1 && birthdayvar === 1 && quantityvar === 1 && checkcon === 1 && checkloc === 1) {
    // si toutes les variables égalent 1 qui veut dire que les champs ont bien été rempli : 
    modalbg.style.display = "none"; // le modale formulaire se ferme 
    validbg.style.display = "block"; // le modale validatiob s"ouvre
    document.getElementById("myform").reset(); // le modale formulaire se reinisialise 
    
  }

  else if (firstvar === 1 && lastvar === 1 && emailvar === 1 && birthdayvar === 1 && quantityvar === 2 && checkcon === 1 && checkloc === 1) {
    // si toutes les variables égalent 1 qui veut dire que les champs ont bien été rempli et quantity egale à 2 car le champ est 0 : 
    modalbg.style.display = "none"; // le modale formulaire se ferme 
    validbg.style.display = "block"; // le modale validatiob s"ouvre
    document.getElementById("myform").reset(); // le modale formulaire se reinisialise 
    
  }

  else {
    e.preventDefault(); // sinon le formulaire ne se ferme pas ! 
  }
  

})


// Vérifier le champ nom et prénom est rempli


function checkRequiredName(input) {
  var pattern1 = /^[a-z'-]+$/i; // regex pour permettre d'écrice un nom ou prénom 

  if ( !pattern1.test(input.value.trim()) ) { // si le champ n"est pas écrit comme le regex demande :
    showerror(input, "Veuillez saisir votre prénom"); // on appelle la fonction showerror qui montre le message 
  }
  else {
    const modalvalidation = input.parentElement; // récuperer le class du parent 
    modalvalidation.className = "formData"; // retirer la class erreurici pour ne plus afficher de message et les bordures rouges .
    return 1; // retourner 1 pour dire que le champ est bien rempli
    

  }
  
}

function checkRequiredName2(input) {
  var pattern1 = /^[a-z'-]+$/i; // regex pour permettre d'écrice un nom ou prénom 

  if ( !pattern1.test(input.value.trim()) ) {
    showerror(input, "Veuillez saisir votre nom");
  }
  else {
    const modalvalidation = input.parentElement;
    modalvalidation.className = "formData";
    return 1;
    

  }
  
}


// Vérifier le champ email est rempli

function checkRequiredEmail(input) {
  var pattern2 = /^[a-z0-9.-]{2,}@+[a-z0-9.-]{2,}.+[a-z]{2,}$/i; // regex pour permettre d'écrice un email
  if (input.value.trim() === '') // si le champ est vide 
    showerror(input, "Veuillez saisir votre adresse mail");
  else if ( !pattern2.test(input.value.trim()) ) {
    showerror(input, "Veuillez saisir une adresse mail valide.");
  }
  else {
    const modalvalidation = input.parentElement;
    modalvalidation.className = "formData";
    return 1;
    

  }
  
}

// Vérifier le champ date de naissance est rempli

function checkRequiredBirthdate(input) {
  var pattern3 = /^[0-2]{1}[0-9]{1}[/]|[3]{1}[0-1]{1}[/]+[0-1]{1}[0-9]{1}[/]+[0-2]{1}[0-9]{3}$/i; // regex pour permettre d'écrice une date de naissance 
  if (!pattern3.test(input.value.trim())) {
    showerror(input, "Veuillez saisir votre date de naissance au format jj/mm/aaaa");
  }
  else {
    const modalvalidation = input.parentElement;
    modalvalidation.className = "formData";
    return 1 

  }
}

// Vérifier le champ de nombre de tournois est rempli

function checkRequiredQuantity(input) {
  if (input.value.trim() === '' || input.value.trim() < 0 || !Number.isInteger(input.value.trim()*1) ) { 
    showerror(input, "Veuillez saisir un nombre ( Saisissez 0 si vous n'avez jamais participé à un tournois");
    // si le champ est vide ou le nombre est inférieur à 0 ou n'est pas nombre entier, afficher message d'erreur .
  
  }

  else if (input.value.trim() == 0) {
    const modalvalidation = input.parentElement;
    modalvalidation.className = "formData";
    return 2;
  }

  else{
    const modalvalidation = input.parentElement;
    modalvalidation.className = "formData";
    return 1;
  }


  

}


// Vérifier si les conditions d'uilisations sont acceptés et afficher message d'erreur 

function verifcheck(input) {
  if (document.getElementById(input).checked ) { // si la case est coché 
    var errr = document.getElementById("errloc"); // récuperer l'elment dont l'id est errloc aka le message d'erreur dans l'html 
    errr.style.display = "none"; // et le desactiver 
    return 1;
  }
  else {
    var errr = document.getElementById("errloc");
    errr.style.display = "block"; // le laisser bloquer 

  }
}

// Vérifier si une case de location est cochée et afficher message d'erreur 

function verifloc() {
  var quavar = checkRequiredQuantity(quantity);
  if (document.getElementById("location1").checked || document.getElementById("location2").checked || document.getElementById("location3").checked || document.getElementById("location4").checked || document.getElementById("location5").checked || document.getElementById("location6").checked ) {
    var errr = document.getElementById("errloc2"); // si une des cases est cochées, récuperer le message d'erreur 
    errr.style.display = "none"; // et le désactiver 
    return 1;
  }

  else if (quavar == 2) { // si le champ de nombre de participation est égale à 0
    var errr = document.getElementById("errloc2"); 
    errr.style.display = "none";
    return 1;
  }

  else {
    var errr = document.getElementById("errloc2");
    errr.style.display = "block";

  }
}


// fonction pour Changer le message d'erreur si Erreur il y'a 

function showerror(input, message) {
  const modalvalidation = input.parentElement; //creer une const qui est l'element parent du champ ( input )
  modalvalidation.className = "formData erreurici"; // changer la classe et ajouter erreurici pour afficher le message d'erreur et bordure rouge ( voir css )
  const errorMessage = modalvalidation.querySelector('small'); // séléctionner la balise small dans l'element séléctionner 
  errorMessage.innerText = message; // écrire le message dans le balise 
}


