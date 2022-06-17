// Créateur : Hugo ; date : 20/11/2020
// Objectif : manipulation du chifffrement à l'aide de l'agoritme de Vigenere, et création d'une interraction avec l'utilisateur
// via une interface web. Création d'une illustration du fonctionnement de l'agorithme.

          //-------------------------------------------------------------//
         //       CREATION DU TABLEAU POUR LA BASE DU CHIFFREMENT       //
        //-------------------------------------------------------------//

var codeTab=function(pas){
	/*
		Function
	
		Function ( params : pas (int))
	
		Return Type:2D array
	
		Description:
		Take an int (pas), give a 2D array full of letters, each line moves a letter by an index of "pas".
	*/
	var baseChiffrement = new Array(26);
	for (var i = 0; i < baseChiffrement.length; i++) { 
		baseChiffrement	[i] = new Array(26); 
	}
	var decalage=0;
	var ajustement=0;
	for (var i = 0; i < 26; i++) {
		for (var j = 0; j<26;j++) {
			if (65+j+decalage<91) {
				baseChiffrement[i][j]=(String.fromCharCode(65+j+decalage));
			}else{
				ajustement=(65+j+decalage)-91;

				baseChiffrement[i][j]=(String.fromCharCode(65+ajustement));
			}
		}
		decalage+=pas;
	}	
	return baseChiffrement;
}

          //-------------------------------------------------------------//
         // 	   CHIFFRAGE D'UN MESSAGE A PARTIR D'UNE CLE            //
        //-------------------------------------------------------------//


var vigenereAlgorithm=function (message, key ,pas){
	/*
		Function
	
		Function ( params : message(string),key(string),pas(int))
	
		Return Type : string
	
		Description:
		Take a message, a key and encrypt the message with the vigenere Algorithm using the key and a tab defined by the function "codeTab(pas)"
	*/
	var keyLetter="";
	var messageLetter="";
	var messageChiffre="";
	//formatage
	message=message.toUpperCase();
	key=key.toUpperCase();
	//encodage
	baseChiffrement=codeTab(pas);
	for (var i = 0; i <message.length; i++) {
		messageLetter=message[i];
		keyLetter=key[i%key.length];
		var indiceK=keyLetter.charCodeAt()-65;
		var indiceJ=messageLetter.charCodeAt()-65;
		messageChiffre+=baseChiffrement[indiceK][indiceJ];
	}
	return messageChiffre ;
}	


var getMessage =function(){
	/*
		Function
	
		Function ( params : none)
	
		Return Type: 1D array
	
		Description:
		Take in the DOM value of 2 input balise type, and return them
	
	*/
	var message = document.getElementById("message").value.toUpperCase();;
	var key = document.getElementById("key").value.toUpperCase();;
	return [message,key];
}

var affichageMessageEnc=function(messageEnc){
	/*
		Function
	
		Function ( params : messageEnc(string))
	
		Return Type: none
	
		Description:
		
	*/
	var divAff = document.getElementById("divAff");
	divAff.innerHTML=messageEnc;
	return 0;
}

var encoderMess =function(elem){
	/*
		Function
	
		Function ( params :elem(DOMelement) )
	
		Return Type: string
	
		Description:
		Take input from the user (key and message) and encrypt it
	*/
	var parametre = getMessage();
	var messageChiffre=vigenereAlgorithm(parametre[0],parametre[1],1);
	affichageMessageEnc(messageChiffre);
	var lettres=messKeyTab(parametre[0],parametre[1],0);
	afficherTab(codeTab(1),lettres[0],lettres[1]);
	return messageChiffre;
}


          //-------------------------------------------------------------//
         //   				ANIMATION D'EXPLICATION 					//
        //-------------------------------------------------------------//


/*_________Affichage de base_______________*/

var afficherTab=function(tabEncodage,lettreI,lettreJ){
	/*
		Function
	
		Function ( params : tabEncodage(array),selecI(int),selecJ(int))
	
		Return Type : DOMelement
	
		Description:
		Create a tab DOMelement, with tabEncodage and thead top and left (using the alphabet). Gives class to select element using selecI and selecJ
	*/
	var compLine1=0;
	var compCol1=0;
	var selecJ =lettreI.charCodeAt()-65+1;//+1 car on a une case vide au debut de la ligne (indice[0][0]))
	var selecI =lettreJ.charCodeAt()-65+1; //+1 car on a une case vide au debut de la colone (indice [0][0]))
	var tab=document.createElement("table");
	for (var i = 0; i <27; i++) {
		var tr=document.createElement("tr");
		for (var j=0; j <27; j++) {
			if (i==0 && j==0){
				var td = document.createElement("th");
				var content = document.createTextNode("X");
				td.appendChild(content);
				tr.appendChild(td);
			}
			else if (i==0) {
				var td = document.createElement("th");
				if(j==selecJ){
					td.setAttribute("class", "selectedMess");
				}
				var content =document.createTextNode(String.fromCharCode(65+compLine1));
				td.appendChild(content);
				tr.appendChild(td);
				compLine1+=1;				
			}else if (j==0) {
				var td = document.createElement("th");
				if(i==selecI){
					td.setAttribute("class", "selectedKey");
				}
				var content =document.createTextNode(String.fromCharCode(65+compCol1));
				td.appendChild(content);
				tr.appendChild(td);
				compCol1+=1;
			}
			else{
				var td = document.createElement("td");
				if ((j==selecJ)&&(i==selecI)){
					td.setAttribute("id","choosenLettre");
					td.setAttribute("class", "selectedInTab");
				}else if((j==selecJ)||(i==selecI)){
					td.setAttribute("class", "selectedInTab");
				}
				var content =document.createTextNode(tabEncodage[i-1][j-1]);
				td.appendChild(content);
				tr.appendChild(td);
			}
		}
		tab.appendChild(tr);
	}
	var divTable = document.getElementById("divTabExplanation");
	divTable.innerHTML="";//suppression des anciens éléments de l'élément
	divTable.appendChild(tab);
	return tab ;
}

var messKeyTab =function(message,key,lettreSelec){
	/*
		Function
	
		Function ( params : message(string),jey(string),lettreSelec(int))
	
		Return Type: DOMelement
	
		Description:
		Transform a message (string) and it's key in a Table element of the DOM for a display purpose 
	*/
	var tabMessageKey=document.createElement("table");
	tabMessageKey.setAttribute("id", "tabMessage");
	var trMessage=document.createElement("tr");
	var trKey=document.createElement("tr");
	var lettresAnimation=Array(2);

	for (var i = 0; i <message.length; i++) {
		var tdMessage=document.createElement("td");
		var tdKey=document.createElement("td");
		if (i==lettreSelec){
			tdMessage.setAttribute("class","elementMessage selectedMess");
			tdKey.setAttribute("class", "selectedKey");
			lettresAnimation[0]=message[i];
			lettresAnimation[1]=key[i%key.length];
		}else{
			tdMessage.setAttribute("class","elementMessage");
		}

		var contentMess =document.createTextNode(message[i]);
		var contentKey =document.createTextNode(key[i%key.length]);
		
		tdKey.appendChild(contentKey);
		tdMessage.appendChild(contentMess);
		trMessage.appendChild(tdMessage);
		trKey.appendChild(tdKey);
	}	

	tabMessageKey.appendChild(trMessage);
	tabMessageKey.appendChild(trKey);
	var divTableEx = document.getElementById("tabMessageKey");
	divTableEx.innerHTML="";//suppression des anciens éléments de l'élément
	divTableEx.appendChild(tabMessageKey);
	return lettresAnimation;
}



/*_____________INTERACTION UTILISATEUR______________*/

var nextRight=function(elem){
	/*
		Function
	
		Function ( params :none )
	
		Return Type:none
	
		Description:
		when user click on rightarrow, shows the new model of the encryption for the new letter
	
	*/
	var elementMessage=document.querySelectorAll(".elementMessage");
	
	var searchInd=0;
	for (var i = 0; i < elementMessage.length; i++) {
		if (elementMessage[i].classList.contains("selectedMess")){
			break;
		}
		searchInd=searchInd+1;
	}
	if (searchInd<elementMessage.length-1){
		var lettres=messKeyTab(getMessage()[0],getMessage()[1],searchInd+1);
		afficherTab(codeTab(1),lettres[0],lettres[1]);
	}
}

var nextLeft=function(elem){
	/*
		Function
	
		Function ( params :none )
	
		Return Type:none
	
		Description:
		when user click on rightarrow, shows the new model of the encryption for the new letter
	*/
	var elementMessage=document.querySelectorAll(".elementMessage");
	var searchInd=0;
	for (var i = 0; i < elementMessage.length; i++) {
		if (elementMessage[i].classList.contains("selectedMess")){
			break;
		}
		searchInd=searchInd+1;
	}
	if (searchInd>0){
		var lettres=messKeyTab(getMessage()[0],getMessage()[1],searchInd-1);
		afficherTab(codeTab(1),lettres[0],lettres[1]);
	}
}


