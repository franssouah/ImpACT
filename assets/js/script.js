$(document).ready(function() {  /* chargement du DOM */

/* SOMMAIRE */
/* 1- BdD
/* 2- variables globales + fonctions
/* 3- Choix mission
/* 4- Affichage tuile Random --> bouton EXPLORER
/* 5- Activation Mobs --> bouton ImpACT
/* 6- Gestion Alarme
/* 7- boutonFinTour
/* 8- boutonHistorique
    
    /* 1- BdD
    *******************************************/
    // BdD Tuiles
    $tuilesImp=[
        "c19a","c20a","c21a","c22a","c23a","c24a","c25a","c26a","c27a","c28a","c29a","c30a","c31a","c33a",
        "o01a","o02a","o03a","o04a","o05a","o07a","o07a",
        "j02a","j07a","j10a","j13a"
    ];

    // BdD Mobs
    $mobsStormR1=[
        "Stormtrooper","Stormtrooper","Stormtrooper","Stormtrooper","Stormtrooper",
        "Droide_Sonde",
        "Officier",
        "aucun"
    ];
    $mobsStormR2=[
        "Trooper_Lourd",
        "Jet_Trooper",
        "Droide_Sonde",
        "Operateur_E-Web"
    ];
    $mobsStormR3=[
        "Trooper_Lourd",
        "Jet_Trooper",
        "Droide_Sentinelle","Droide_Sentinelle",
        "Garde_Royal","Garde_Royal"
    ];
    $mobsStormBoss=[
        "Dark_Vador"
    ];

    // BdD actions
    $actionsVsVert=[
        "Attaquer Vert (mouvement max 8)",
        "Attaquer Vert puis repli (Mouvement max 4)"
    ];
    $actionsVsBleu=[
        "Attaquer Bleu (mouvement max 8)",
        "Attaquer Bleu puis repli (Mouvement max 4)"
    ];
    $actionsVsRouge=[
        "Attaquer Rouge (mouvement max 8)",
        "Attaquer Rouge puis repli (Mouvement max 4)"
    ];
    $actionsVsObjectif=[
        "Se déplacer vers l'Objectif (Mouvement max 12)",
        "Se déplacer vers l'Objectif (Mouvement max 6)"
    ];
    $actionsVsBruit=[
        "Se déplacer vers le Marqueur Jaune (Mouvement max 6) puis regarder tout autour",
        "Se déplacer vers le Marqueur Jaune (Mouvement max 12) puis regarder tout autour",
    ]
    $actionsRAS=[
        "Se déplacer vers ↖ (Mouvement max 4)",
        "Se déplacer vers ↗ (Mouvement max 4)",
        "Se déplacer vers ↘ (Mouvement max 4)",
        "Se déplacer vers ↙ (Mouvement max 4)",
        "Se déplacer vers ↖ (Mouvement max 6)",
        "Se déplacer vers ↗ (Mouvement max 6)",
        "Se déplacer vers ↘ (Mouvement max 6)",
        "Se déplacer vers ↙ (Mouvement max 6)"
    ]

    //BdD directions
    $directions=["←","→","↑","↓"];

    /* 2- variables globales + fonctions
    *******************************************/
    // Déclaration des variables globales
        // Liste tuiles tirées
        $tuilesTirees=[];

        // Nb joueurs
        $nbJoueurs=0;

        // Choix mission
        $tuileDepart="";
        $tuileObjectif="";
        $tuileObjectif2="";
        $texteObjectif="";
        $texteObjectif2="";
        $messageObjectifTrouve="";
        $messageObjectifTrouve2="";

        //Alarme
        $Alarme=1;
        $Rang2=false;
        $Rang3=false;
        $RangBoss=false;

        //Evenement
        $texteEvenement="";
        $imageEvenementMap="";
        $imageEvenementMob="";
    

    // choix Mission
    function fonctionChoixMission(tuileDepart, tuileObjectif, texteObjectif, messageObjectifTrouve){
        // choix tuile de départ puis suppression de la liste
        $tuileDepart=tuileDepart;
        $tuilesMission=jQuery.grep($tuilesMission, function(value){
            return value !=$tuileDepart;
        });
        console.log($tuilesMission);
        // ajout dans l'historique
        $("#listeHistorique").append("<li>"+$tuileDepart+"</li>");

        // choix tuile Objectif puis suppression de la liste initiale
        $tuileObjectif=tuileObjectif;
        $tuilesMission=jQuery.grep($tuilesMission, function(value){
            return value !=$tuileObjectif;
        });

        // texte objectif
        $("#texteObjectif").html(texteObjectif);

        // messageObjectifTrouve
        $messageObjectifTrouve=messageObjectifTrouve;
    }

    // bouton Explorer
    function fonctionTirageMob(image, nomMob, nbMobs){
        // tirage au sort Mob
        $random=Math.floor(Math.random()*($mobsMission.length));
        $mobRandom=$mobsMission[$random];
        // affichage dans le html
            // conversion chaine de caractères
            $nomMobRandom=$mobRandom.replace(/[_]/g,' ');
        
        $(nomMob).html($nomMobRandom);
        $(image).attr("src", "assets/imgs/mobs/"+$mobRandom+".png");
        $(image+"Surcouche").attr("src", "assets/imgs/mobs/"+$mobRandom+"-surcouche.png");
            //nb de troopers :
            if($mobRandom === "Stormtrooper" || $mobRandom === "Jet_Trooper"){
                if($Rang2 === false){
                    $(nbMobs).html(Math.floor(Math.random()*($nbJoueurs))+1);
                }else{
                    $(nbMobs).html($nbJoueurs);
                }
            }else{
                $(nbMobs).html(1);
            }
            //nb gardes royaux
            if($mobRandom === "Garde_Royal" && $nbJoueurs>2){
                $(nbMobs).html(2);
            }
    }
    function fonctionEvenement(){
        $("#popupEvenement").addClass("visible");
        $("#texteEvenement").html($texteEvenement);
        $("#imageEvenementMap").attr("src", "assets/imgs/maps/"+$imageEvenementMap+".png");
        $("#imageEvenementMob").attr("src", "assets/imgs/mobs/"+$imageEvenementMob+".png");
        $("#imageEvenementMobSurcouche").attr("src", "assets/imgs/mobs/"+$imageEvenementMob+"-surcouche.png");
    }

    // gestion Alarme
    function fonctionAjoutMobsRangs(){
        //Ajout de mobs R2 [Alarme = 4]
        if($Alarme>3 && $Rang2===false){
            $Rang2=true;
            for($i=0; $i<$mobsStormR2.length; $i++){
                $mobsMission[$mobsMission.length]=$mobsStormR2[$i];
            }
            console.log($mobsMission);
        }
        //Ajout de mobs R3 [Alarme = 7]
        if($Alarme>6 && $Rang3===false){
            $Rang3=true;
            for($i=0; $i<$mobsStormR3.length; $i++){
                $mobsMission[$mobsMission.length]=$mobsStormR3[$i];
            }
            console.log($mobsMission);
        }

        //Ajout de mobs Boss [Alarme = 9]
        if($Alarme>8 && $RangBoss===false){
            $RangBoss=true;
            for($i=0; $i<$mobsStormBoss.length; $i++){
                $mobsMission[$mobsMission.length]=$mobsStormBoss[$i];
            }
            console.log($mobsMission);
        }
    }
    function fonctionAlarmePlus(){
        console.log("+");
        if($Alarme<9){
            $Alarme++; 
        }
        $("#nvAlarme").html($Alarme);
 
        fonctionAjoutMobsRangs();
        
    }

    function fonctionAlarmeMoins() {
        if($Alarme>1){
            $Alarme--; 
        }
        $("#nvAlarme").html($Alarme);
    }


    /* 3- Choix mission
    *******************************************/
    // Popup Choix mission
        $("#popupChoixMission").addClass('visible');

        $("#boutonValiderMission").on("click", function(){
            // thème
            $themeMission=$("#selectTheme").val();
            console.log($themeMission);
            if($themeMission === "imp"){
                $tuilesMission=$tuilesImp;
                $mobsMission=$mobsStormR1;
            }

            // objectif
            $objectifMission=$("#selectObjectif").val();
            console.log($objectifMission);
            $objectifTrouve=false;
            $objectifTrouve2=false;

            if($objectifMission === "fuir"){
            // MISSION FUITE
                $tuileDepart="c23a";
                $tuileObjectif="c19a";
                $texteObjectif='Atteignez cette Tuile pour vous enfuir de la base : ';
                $messageObjectifTrouve="Vous avez trouvé la sortie ! Tous les Héros doivent atteindre cette tuile pour terminer la mission.";
                fonctionChoixMission($tuileDepart, $tuileObjectif, $texteObjectif, $messageObjectifTrouve);
                // évènement :
                    $texteEvenement="<strong>Comité d'accueil !</strong> <br> Placez 2 Gardes royaux sur la Tuile Objectif. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>";
                    $imageEvenementMap=$tuileObjectif;
                    $imageEvenementMob="Garde_Royal";
            }else if($objectifMission === "liberer"){
            // MISSION SAUVETAGE
                $tuileDepart="c22a";
                $tuileObjectif="c33a";
                $texteObjectif="Retrouvez le prisonnier sur cette Tuile, puis escortez-le jusqu'à la Tuile de départ :";
                $messageObjectifTrouve="Vous avez trouvé le prisonnier ! Escortez-le jusqu'à la Tuile de départ pour gagner la mission.";
                fonctionChoixMission($tuileDepart, $tuileObjectif, $texteObjectif, $messageObjectifTrouve);
                // ajout conditions objectif 2:
                $tuileObjectif2=$tuileDepart;
                $texteObjectif2="Escortez le prisonnier jusqu'à la Tuile de départ :";
                $messageObjectifTrouve2="Tous les Héros doivent atteindre cette tuile pour terminer la mission.";
                // évènement :
                    $texteEvenement="<strong>Comité d'accueil !</strong> <br> Placez 2 Gardes royaux sur la Tuile Objectif. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>";
                    $imageEvenementMap=$tuileObjectif2;
                    $imageEvenementMob="Garde_Royal";
            }else if($objectifMission === "sabotage"){
            // MISSION SABOTAGE
                $tuileDepart="c19a";
                $tuileObjectif="o02a";
                $texteObjectif="Libérez votre vaisseau en désactivant le champ de force depuis cette Tuile :";
                $messageObjectifTrouve="Vous avez désactivé le champ de force ! Revenez vite au hangar pour fuir à bord de votre vaisseau et gagner la mission.";
                fonctionChoixMission($tuileDepart, $tuileObjectif, $texteObjectif, $messageObjectifTrouve);
                // ajout conditions objectif 2:
                $tuileObjectif2=$tuileDepart;
                $texteObjectif2="Revenez vite au hangar pour fuir à bord de votre vaisseau :";
                $messageObjectifTrouve2="Tous les Héros doivent atteindre cette tuile pour terminer la mission.";
                // modif Alarme initiale
                $Alarme=3;
                // évènement :
                    $texteEvenement="<strong>Comité d'accueil !</strong> <br> Placez 2 Gardes royaux sur la Tuile Objectif. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>";
                    $imageEvenementMap=$tuileObjectif2;
                    $imageEvenementMob="Garde_Royal";
            }

            // ajout dans le popupBriefing
            $("#imageTuileDepart").attr("src", "assets/imgs/maps/"+$tuileDepart+".png");
            $("#tuileDepart").html($tuileDepart);

            //affichage tuile objectif
            $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif+".png");
            $("#nomObjectif").html($tuileObjectif);

            //affichage nvAlarme initial
            $("#nvAlarme").html($Alarme);

            // Liste tuiles tirées
            $tuilesTirees=[$tuileDepart];
            console.log($tuilesTirees);

            // nombre de joueurs
            $joueurVert=$("#joueurVert").is(":checked");
            $joueurBleu=$("#joueurBleu").is(":checked");
            $joueurRouge=$("#joueurRouge").is(":checked");
            if ($joueurVert){
                $nbJoueurs++;
            }
            if ($joueurBleu){
                $nbJoueurs++;
            }
            if ($joueurRouge){
                $nbJoueurs++;
            }
            console.log("Joueurs : "+$nbJoueurs);

            //fermeture du popup
            $("#popupChoixMission").removeClass('visible');

            //ouverture popupBriefing
            $("#popupBriefing").addClass('visible');
        })

    // Fermeture popupBriefing
    $("#boutonValiderBriefing").on("click", function(){
        $("#popupBriefing").removeClass('visible');
    })

    /* 4- Affichage tuile Random --> bouton EXPLORER
    ******************************************/
    // Fonctions
        //function fonctionTirageMob(image, nomMob, nbMobs)

    // boutonTuileRandom
    $("#boutonTuileRandom").on("click", function(){
        // tirage au sort Tuile
        $random=Math.floor(Math.random()*($tuilesMission.length));
        $tuileRandom=$tuilesMission[$random];
            // vérification de l'objectif
            if($tuileRandom === $tuileObjectif){
                $objectifTrouve=true;
                console.log("Objectif trouvé !"+$objectifTrouve);
                $("#messageObjectifTrouve").html($messageObjectifTrouve);

                // augmentation Alarme
                if ($Alarme <4){
                    $Alarme=4;
                    fonctionAjoutMobsRangs();
                    $("#nvAlarme").html($Alarme);
                    fonctionEvenement();
                }

                // vérif existence objectif 2
                if($texteObjectif2 != ""){
                    $("#texteObjectif").html($texteObjectif2);
                    $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif2+".png");
                    $("#nomObjectif").html($tuileObjectif2);
                }
            }

        // tirage au sort Mob
        fonctionTirageMob("#imageMob", "#explorerMobs", "#nbMobs");
            // tirage au sort direction Mob
            $random=Math.floor(Math.random()*($directions.length));
            $("#directionMob").html($directions[$random]);


        // tirage au sort Caisse
        $random2=Math.floor(Math.random()*(3));
        $caisse=false;
        $("#imageCaisse").attr("src", "");
        if ($random2 === 0){
            $caisse=true;
            $("#imageCaisse").attr("src", "assets/imgs/caisse.png");
        }

        // affichage dans le html
        $("#explorer").html($tuileRandom);
        $("#imageTuile").attr("src", "assets/imgs/maps/"+$tuileRandom+".png");

        // affichage du popupTuileRandom
        $("#popupTuileRandom").addClass('visible');

        // suppression de la tuile dans la liste $tuilesMission
        $tuilesMission=jQuery.grep($tuilesMission, function(value){
            return value !=$tuileRandom;
        });
        console.log($tuilesMission);

        // ajout dans la liste tuilesTirees
        $tuilesTirees[$tuilesTirees.length]=$tuileRandom;
        console.log($tuilesTirees);

        // ajout dans l'historique
        $("#listeHistorique").append("<li>"+$tuileRandom+"</li>");

        // vérif possibilité ajout tuile objectif
        if($tuilesTirees.length === 8){
            $tuilesMission[$tuilesMission.length]=$tuileObjectif;
        }

        // bouton de validation
        $("#boutonValider").on("click", function(){
            // masquage du popup
            $("#popupTuileRandom").removeClass('visible');
            //vidage tuile
            $("#explorer").html("");
            $("#imageTuile").attr("src", "");
            $("#messageObjectifTrouve").html("");
        })
    })

     // Fermeture popupEvenement
     $("#boutonFermerEvenement").on("click", function(){
        $("#popupEvenement").removeClass('visible');
    })

    /* 5- Activation Mobs --> bouton ImpACT
    *****************************************/
    $("#boutonImpAct").on("click", function(){
        // affichage du popupActivation
        $("#popupActivation").addClass('visible');

        // RAZ des switches
        $("#persoVert").prop("checked", false);
        $("#persoBleu").prop("checked", false);
        $("#persoRouge").prop("checked", false);
        $("#alerteJaune").prop("checked", false);

        // boutonValiderActivation
        $("#boutonValiderActivation").on("click", function(){
            // visibilité
            $("#zoneListeActions").toggleClass("invisible");
            $("#zoneAffichageDes").html("");
            // vérif des switchs
            $herosVertRepere=$("#persoVert").is(":checked");
            $herosBleuRepere=$("#persoBleu").is(":checked");
            $herosRougeRepere=$("#persoRouge").is(":checked");
            $alerteJaune=$("#alerteJaune").is(":checked");
            // injection BdD actions
            $listeActions=[];
            if($herosVertRepere){
                for($i=0; $i<$actionsVsVert.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsVert[$i];
                }
            }
            if($herosBleuRepere){
                for($i=0; $i<$actionsVsBleu.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsBleu[$i];
                }
            }
            if($herosRougeRepere){
                for($i=0; $i<$actionsVsRouge.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsRouge[$i];
                }
            }
            if($objectifTrouve){
                for($i=0; $i<$actionsVsBleu.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsObjectif[$i];
                }
            }
            if($alerteJaune){
                for($i=0; $i<$actionsVsBruit.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsBruit[$i];
                }
            }
            if(!$herosVertRepere && !$herosBleuRepere && !$herosRougeRepere && !$objectifTrouve && !$alerteJaune){
                for($i=0; $i<$actionsRAS.length; $i++){
                    $listeActions[$listeActions.length]=$actionsRAS[$i];
                }
            }
            console.log($listeActions);

            // tirage au sort actions
            $("#listeActions").html("");
            $random=Math.floor(Math.random()*($listeActions.length));
            $("#listeActions").append("<li>"+$listeActions[$random]+"</li>");

            // bouton Refresh
            $("#boutonRefreshAction").on("click", function(){
                $("#listeActions").html("");
                $random=Math.floor(Math.random()*($listeActions.length));
                $("#listeActions").append("<li>"+$listeActions[$random]+"</li>");
            })

        })

        // boutonLancerDes
        $("#boutonLancerDes").on("click", function(){
            // récup valeurs
            $nbDes=$("#nbDes").val();
            $defenseDes=$("#defenseDes").val();
            $nbReussites=0;
            //console.log($nbDes, $defenseDes);
            $("#zoneAffichageDes").html("");
            for($i=0; $i<$nbDes; $i++){
                $de=Math.floor(Math.random()*(6)+1);
                console.log($de);
                if($de<$defenseDes){
                    $("#zoneAffichageDes").append('<p class="de deBlanc">'+$de+'</p>');
                }else{
                    $("#zoneAffichageDes").append('<p class="de deRouge">'+$de+'</p>');
                    $nbReussites++;
                }
            }
            $("#nbReussites").html("⇒ "+$nbReussites);
        })

        // boutonFermerActivation
        $("#boutonFermerActivation").on("click", function(){
            // masquage du popup
            $("#popupActivation").removeClass('visible');
            $("#zoneListeActions").toggleClass("invisible");
            //vidage tuile
            
        })
    })


    /* 6- Gestion Alarme
    ******************************************/
    // fonctions
        //function fonctionAlarmePlus()
        //function fonctionAlarmeMoins()
    

    // Bouton +
    $("#boutonAlarmePlus").on("click", function(){
        fonctionAlarmePlus();
    })

    // Bouton -
    $("#boutonAlarmeMoins").on("click", function(){
        fonctionAlarmeMoins();
    })

    /* 7- boutonFinTour
    *****************************************/
    $("#boutonFinTour").on("click", function(){
        $AlarmeInitiale=$Alarme;
        $("#popupFinTour").addClass("visible");
        $("#boutonValiderFinTour").removeClass("invisible");
        $("#mobsAlerte").prop("checked", false);

        $("#boutonValiderFinTour").on("click", function(){
            $("#boutonValiderFinTour").addClass("invisible");
            $("#divAffichageRenforts").removeClass("invisible");
            
            // vérif switch Alerte
            if($("#mobsAlerte").is(":checked")){
                // Arrivée de Renforts
                $("#affichageRenforts").html("Augmentation du niveau d'Alarme ! <br>Arrivée de Renforts (par la porte la plus proche) :")
                    // tirage au sort Mob
                    fonctionTirageMob("#imageRenforts", "#RenfortsMobs", "#nbRenforts");

                    // si objectif trouvé
                    if ($objectifTrouve){
                        $("#messageRenforts").html("Les Renforts entrent par la porte la plus proche située entre les Héros et l'Objectif, et peuvent faire un Mouvement (max 8) vers l'Objectif.")
                    }
                // augmentation Alarme
                fonctionAlarmePlus();
                    // régulation bug Alarme exponentielle
                    if ($Alarme > ($AlarmeInitiale+1)){
                        fonctionAlarmeMoins();
                    }
                    
            }else{
                $random=Math.floor(Math.random()*($Alarme)+1);
                // arrivée aléatoire conditionnée par nv Alarme
                if($random >= ($Alarme-2)){
                    $("#affichageRenforts").html("Arrivée de Renforts (par la porte fermée la plus proche) :")
                    // tirage au sort Mob
                    fonctionTirageMob("#imageRenforts", "#RenfortsMobs", "#nbRenforts");
                }else{
                    $("#affichageRenforts").html('La situation est sous contrôle !');
                    $("#RenfortsMobs").html('');
                    $("#imageRenforts").attr("src","");
                    $("#nbRenforts").html(''); 
                }
                
            }

            $("#boutonFermerFinTour").on("click", function(){
                $("#popupFinTour").removeClass("visible");
                $("#boutonValiderFinTour").addClass("invisible");
                $("#divAffichageRenforts").addClass("invisible");
            })

        })
    })

    /* 8- boutonHistorique
    ********************************************/
    $("#boutonHistorique").on("click", function(){
        $("#popupHistorique").addClass("visible");
        // fermeture
        $("#boutonFermerHistorique").on("click", function(){
            $("#popupHistorique").removeClass("visible");
        })
    })

})