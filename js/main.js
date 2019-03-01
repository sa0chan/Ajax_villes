'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

//creation des variables et tableau sans leurs attribuer 

let cp ;
let villeSelect;
let valeurCp;
let reponseRequete;
let villeContenu;


/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/



// je met dans une variable la valeur mis quand je tape au clavier
function keypress(){
   
    
    valeurCp = cp.value;
    /*console.log(valeurCp);*/
    
    obtenirDonnee();
}


// je vais chercher les données sur ma page ou il y a le json , la requete
function obtenirDonnee(){

        
        
        
    if (valeurCp.length >= 2)
    {
        
        console.log('ça marche')
        
        let urlRequete = 'http://sa0chan.sites.pixelsass.fr/JS/AJAX-Villes/villes.php?cp='+valeurCp;
        let requeteHttp = new XMLHttpRequest();
        
        requeteHttp.onreadystatechange = function() 
        {
            
           if (requeteHttp.readyState == XMLHttpRequest.DONE) 
           {
               
                if (requeteHttp.status == 200) 
                {
                    
                   /* console.log('cela veut dire que ya eu un status 200',requeteHttp.responseText);*/
                    reponseRequete = JSON.parse(requeteHttp.responseText);
                   /* console.log('ceci est la reponse de la requete',reponseRequete);*/
                   
                   
                    remplissageVille(reponseRequete);//fonction qui va me permettre de créer le tag option avec la value
                     
                } else 
                {
                    alert('Un problème est survenu avec la requête.');
                }
            }

        }
       
    
        requeteHttp.open('GET',urlRequete, true);// true permet d'asynchroniser  : va permettre de  continuer a avancer dans le programme
 
        requeteHttp.send();
  
            
      
     
    }
    
}

//recherche dans le tableau json du l'objet et création de l'option du select 

function remplissageVille(jsonObj){ 
    
    villeSelect.innerHTML='';
    
    for (var i = 0 ; i < jsonObj.length ; i++){
        
        
        villeContenu = jsonObj[i]['ville_nom'];
        
        
        let newOption = document.createElement('option');
        newOption.setAttribute("value",jsonObj[i]['ville_code_postal'])
        let newContenu = document.createTextNode(villeContenu);
        newOption.appendChild(newContenu);
        villeSelect.appendChild(newOption);

    }
    
  
}



/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
document.addEventListener("DOMContentLoaded", function() {

    //parametrage des variable et appel des fonctions
    
    //action lorsque l'on appui sur une touche
    cp = document.getElementById('cp');
    cp.addEventListener('keyup', keypress);
    
    villeSelect = document.getElementById('ville');
    


 });



