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
        "o01a","o02a","o03a","o04a","o05a","o06a","o07a",
        "j02a","j07a","j10a","j13a"
    ];
    $tuilesJungle=[
        "c01a","c02a","c03a","c04a","c05a","c06a","c07a","c08a","c09a","c10a","c11a","c12a","c13a","c16a",
        "j01a","j03a","j04a","j05a","j06a","j08a","j09a","j11a","j12a","j14a"
    ]

    // BdD Mobs Empire
    $mobsStormR1=[
        //"nom", "nb dés"
        ["Stormtrooper","1"],["Stormtrooper","1"],["Stormtrooper","1"],["Stormtrooper","1"],
        ["Droide_Sonde","3"],
        ["Officier","2"],
        ["aucun","0"]
    ];
    $mobsStormR2=[
        ["Trooper_Lourd","3"],["Trooper_Lourd","3"],
        ["Jet_Trooper","2"],["Jet_Trooper","2"],
        ["Droide_Sonde","3"],
        ["Officier","2"],
        ["Operateur_E-Web","5"]
    ];
    $mobsStormR3=[
        ["Droide_Sentinelle","5"],["Droide_Sentinelle","5"],
        ["Garde_Royal","3"],["Garde_Royal","3"]
    ];
    $mobsStormBoss=[
        ["Dark_Vador","20"]
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
    ];
    $actionsRAS=[
        "Se déplacer vers ↖ (Mouvement max 4)",
        "Se déplacer vers ↗ (Mouvement max 4)",
        "Se déplacer vers ↘ (Mouvement max 4)",
        "Se déplacer vers ↙ (Mouvement max 4)",
        "Se déplacer vers ↖ (Mouvement max 6)",
        "Se déplacer vers ↗ (Mouvement max 6)",
        "Se déplacer vers ↘ (Mouvement max 6)",
        "Se déplacer vers ↙ (Mouvement max 6)"
    ];
    $actionsVador=[
        "Mouvement (max 12) vers Héros le plus proche, Attirer (portée max 6), Attaquer",
        "Mouvement (max 15) vers Héros le plus proche, Attaquer",
        "Mouvement (max 12) vers Héros le plus proche, Etrangler (4 dés, portée max 8), Attaquer",
        "Mouvement (max 12) vers Héros le plus proche, Eclair (8 dés, portée max 8)",
        "Attirer (portée max 10), Attaquer, Mouvement vers le Héros le plus proche"
    ]
    //BdD évènements
    $evenementsStorm=[
        // 0 "texte", 1 "Mob", 2 "Dés", 3 "nb"
        ["<strong>Comité d'accueil !</strong> <br> Placez ces Ennemis sur la Tuile indiquée. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>",
            "Garde_Royal","3","x2"],
        ["<strong>Vous ne sortirez pas d'ici !</strong> <br> Placez ces Ennemis sur la Tuile indiquée. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>",
            "Trooper_Lourd","3","x2"],
        ["<strong>Petit imprévu !</strong> <br> Placez ces Ennemis sur la Tuile indiquée. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>",
            "Stormtrooper","1","x4"],
        ["<strong>Blip blip bliiip !</strong> <br> Placez ces Ennemis sur la Tuile indiquée. <br> <strong>Ils ne s'activeront que quand les Héros seront en vue.</strong>",
            "Droide_Sonde","3","x2"],
        ["<strong>Aleeeerte !</strong> <br> Placez un jeton ▲ jaune sur la Tuile indiquée. <br> <strong>TOUS LES ENNEMIS effectuent IMMEDIATEMENT un mouvement (max 12) vers ce jeton.</strong><br>Supprimez ensuite le jeton.",
            "aucun","0",""],
        ["<strong>Verrouillage des portes !</strong> <br> Placez une Porte Blindée à chaque entrée de cette Tuile. <br> <strong>Les Portes Blindées sont considérées comme des Ennemis avec 5 dés, qui ne peuvent ni se déplacer ni attaquer.</strong>",
            "aucun","0",""],
        ["<strong>C'est un piège !</strong> <br> Si un Héros se trouve à l'entrée de cette Tuile, déplacez-le d'une case vers l'intérieur. Puis placez une Porte Blindée à chaque entrée de cette Tuile. <br> <strong>Les Portes Blindées ont une résistance de 5 dés.</strong>",
            "Stormtrooper","1","x4"]
    ]
    $EvenementsStormBoss=[
        // 0 "texte", 1 "Mob", 2 "Dés", 3 "nb"
        ["<strong>Fuyez, pauvres fous !</strong> <br> Faites entrer le Boss par la Porte la plus proche des Héros.<br><br><strong>Il s'activera à chaque Tour, juste après les autres Ennemis, avec le bouton BOSS.</strong>",
            "Dark_Vador","20",""],
    ]

    //BdD missions
    $missions=[
        //0 "titre", 1 $texteObjectif, 2 $messageObjectifTrouve,
            // 3[0 $tuileDepart imp, 1 $tuileObjectif imp, 2 $tuileDepart jungle, 3 $tuileObjectif jungle, 4 $objectif]
            // 4[0 $tuileObjectif2, 1 $texteObjectif2, 2 $messageObjectifTrouve2]
        ["Ravitaillement", 
            "Récupérez 5 caisses de ravitaillement impériales.", 
            "Vous avez récupéré suffisamment de caisses de ravitaillement. Sortez vite d'ici !",
            ["c01b+2c18b+c38a","","c03a","","caisses"],
            ["$tuileDepart", 
                "Bravo, vous avez trouvé le ravitaillement. <br>Dirigez-vous vite vers la sortie :", 
                "Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ],
        ["Fuite !", 
            "Atteignez cette Tuile pour vous enfuir de la base : ", 
            "Vous avez trouvé la sortie ! Tous les Héros doivent atteindre cette tuile pour terminer la mission.",
            ["c23a","c19a","c10a","c02a",""],
            ["", 
                "", 
                "Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ],
        ["Libérer le prisonnier", 
            "Retrouvez le prisonnier sur cette Tuile, puis escortez-le jusqu'à la Tuile de départ :", 
            "Vous avez trouvé le prisonnier ! Escortez-le jusqu'à la Tuile de départ pour gagner la mission.",
            ["c22a","c33a","j11a","c04a",""],
            ["$tuileDepart", 
                "Escortez le prisonnier jusqu'à la Tuile de départ :", 
                "Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ],
        ["Désactiver le champ de force", 
            "Libérez votre vaisseau en désactivant le champ de force depuis cette Tuile :", 
            "Vous avez désactivé le champ de force ! Rejoignez vite votre vaisseau pour fuir et réussir la mission.",
            ["c19a","o02a","c03a","j05a",""],
            ["$tuileDepart", 
                "Revenez vite à bord de votre vaisseau :", 
                "Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ],
        ["Piratage informatique", 
            "Vous devez trouver cette Tuile afin que votre droïde pirate le système informatique ennemi. Vous obtiendrez alors les coordonnées de la Tuile de sortie, afin de vous enfuir.", 
            "Votre droïde a piraté le système informatique de la base !",
            ["c27a","c20a","c01a","c04a",""],
            ["random", 
            "Fuyez jusqu'à cette Tuile pour réussir la mission :", 
            "Vous avez trouvé la sortie ! Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ],
        ["Diversion dangereuse", 
            "Vous devez faire un maximum de bruit pour attirer l'attention de Dark Vador.<br> Dès que vous l'aurez attiré, fuyez !", 
            "C'est bon, vous avez attiré Dark Vador. Maintenant, fuyez vite !",
            ["c25a","","c02a","","vador"],
            ["$tuileDepart", 
            "Fuyez vite vers la sortie !", 
            "Tous les Héros doivent atteindre cette tuile pour terminer la mission."]
        ]
    ]
      
    //BdD directions
    $directions=["←","→","↑","↓"];

    //BdD caisse
    $itemsCaisse=[
        ["medikit","Médikit"],["medikit","Médikit"],
        ["grenade", "Grenade"],
        ["comlink", "Comlink"],
        ["bouclier", "Bouclier énergétique"],
        ["booster", "Booster d'énergie"]
    ]

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
        $objectif="";
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

        //Compte-tour
        $numeroTour=1;
        $("#compteTour").html($numeroTour);

        //Compteur de caisses
        $nbBox=0;
    

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
        $mobRandom=$mobsMission[$random][0];
        $mobRandomDes=$mobsMission[$random][1];
        // affichage dans le html
            // conversion chaine de caractères
            $nomMobRandom=$mobRandom.replace(/[_]/g,' ');
        
        $(nomMob).html($nomMobRandom);
        $(image).attr("src", "assets/imgs/mobs/"+$mobRandom+".png");
        $(image+"Surcouche").attr("src", "assets/imgs/mobs/"+$mobRandomDes+".png");
            //nb de troopers :
            if($mobRandom === "Stormtrooper" || $mobRandom === "Jet_Trooper"){
                if($Rang2 === false){
                    $(nbMobs).html("x"+(Math.floor(Math.random()*($nbJoueurs))+1));
                }else{
                    $(nbMobs).html("x"+$nbJoueurs);
                }
            }else{
                $(nbMobs).html("x"+1);
            }
            //nb gardes royaux
            if($mobRandom === "Garde_Royal" && $nbJoueurs>2){
                $(nbMobs).html("x"+2);
            }
            // aucun
            if($mobRandom === "aucun"){
                $(nbMobs).html("");
            }
    }
    function fonctionEvenement(){
        //appel random BdD
        $random=Math.floor(Math.random()*($evenements.length));
        $evenement=$evenements[$random];
        //remplissage popup
        $("#popupEvenement").addClass("visible");
        $("#texteEvenement").html($evenement[0]);
        $("#imageEvenementMap").attr("src", "assets/imgs/maps/"+$imageEvenementMap+".png");
        $("#texteEvenementMap").html($imageEvenementMap);
        $("#imageEvenementMob").attr("src", "assets/imgs/mobs/"+$evenement[1]+".png");
        $("#imageEvenementMobSurcouche").attr("src", "assets/imgs/mobs/"+$evenement[2]+".png");
        $("#evenementMobNb").html($evenement[3]);
    }

    function fonctionEvenementBoss(){
        //appel random BdD
        $random=Math.floor(Math.random()*($evenementsBoss.length));
        $evenement=$evenementsBoss[$random];
        // bouton Boss
        $("#boutonBoss").removeClass("invisible");
        //remplissage popup
        $("#popupEvenement").addClass("visible");
        $("#texteEvenement").html($evenement[0]);
        $("#imageEvenementMap").attr("src", "assets/imgs/mobs/aucun.png");
        $("#texteEvenementMap").html("");
        $("#imageEvenementMob").attr("src", "assets/imgs/mobs/"+$evenement[1]+".png");
        $("#imageEvenementMobSurcouche").attr("src", "assets/imgs/mobs/"+$evenement[2]+".png");
        $("#evenementMobNb").html($evenement[3]);
        // message objectif boss
        if($objectif === "vador"){
            if($tuileObjectif2!=""){
                $("#texteObjectif").html($texteObjectif2);
                $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif2+".png");
                $("#nomObjectif").html($tuileObjectif2);
            }
        }
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
            fonctionEvenementBoss();
            /*for($i=0; $i<$mobsStormBoss.length; $i++){
                $mobsMission[$mobsMission.length]=$mobsStormBoss[$i];
            }
            $("#boutonBOSS").removeClass("invisible");
            console.log($mobsMission);*/
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
    // injection des choix dans le select
    for ($i=0; $i<$missions.length; $i++){
        $("#selectObjectif").append('<option value="'+$i+'">'+$missions[$i][0]+'</option>');
    }
    // Popup Choix mission
        $("#popupChoixMission").addClass('visible');

        $("#boutonValiderMission").on("click", function(){
            console.log($missions[0]);
            // thème
            $themeMission=$("#selectTheme").val();
            console.log($themeMission);
            if($themeMission === "imp"){
                $tuilesMission=$tuilesImp;
                $mobsMission=$mobsStormR1;
                $mobsBoss=$mobsStormBoss;
                $evenements=$evenementsStorm;
                $evenementsBoss=$EvenementsStormBoss;
            }
            if($themeMission === "jungle"){
                $tuilesMission=$tuilesJungle;
                $mobsMission=$mobsStormR1;
                $mobsBoss=$mobsStormBoss;
                $evenements=$evenementsStorm;
                $evenementsBoss=$EvenementsStormBoss;
            }

            // objectif
            $objectifMission=$("#selectObjectif").val();
            console.log($objectifMission);
            $objectifTrouve=false;
            $objectifTrouve2=false;
                //objectif autre qu'une tuile
                $objectif=$missions[$objectifMission][3][4];
            
            //lieu
            if($themeMission === "imp"){
                $tuileDepart=$missions[$objectifMission][3][0];
                $tuileObjectif=$missions[$objectifMission][3][1];
            }
            if($themeMission === "jungle"){
                $tuileDepart=$missions[$objectifMission][3][2];
                $tuileObjectif=$missions[$objectifMission][3][3];
            }

            // textes objectif
            $texteObjectif=$missions[$objectifMission][1];
            $messageObjectifTrouve=$missions[$objectifMission][2];

            // objectif 2
            $texteObjectif2=$missions[$objectifMission][4][1];
            $messageObjectifTrouve2=$missions[$objectifMission][4][2];
            $tuileObjectif2=$missions[$objectifMission][4][0];
            if($tuileObjectif2 === "$tuileDepart"){
                $tuileObjectif2=$tuileDepart;
            }
            console.log($tuileObjectif2);
            
            // fonction
            fonctionChoixMission($tuileDepart, $tuileObjectif, $texteObjectif, $messageObjectifTrouve);
            // évènement :
            $imageEvenementMap=$tuileObjectif;

            // ajout dans le popupBriefing
            $("#imageTuileDepart").attr("src", "assets/imgs/maps/"+$tuileDepart+".png");
            $("#tuileDepart").html($tuileDepart);

            //affichage tuile objectif
            $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif+".png");
            $("#nomObjectif").html($tuileObjectif);
                // si objectif autre que Tuile
                if($objectif === "vador"){
                    $("#imageObjectif").attr("src", "assets/imgs/mobs/Dark_Vador.png");
                    $("#nomObjectif").html("");
                }
                if($objectif === "caisses"){
                    $("#imageObjectif").attr("src", "assets/imgs/items/5box.png");
                    $("#nomObjectif").html("");
                }

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

                // modif affichage global
                $("#texteObjectif").html($messageObjectifTrouve);
                $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif+".png");
                $("#nomObjectif").html();

                // augmentation Alarme
                if ($Alarme <4){
                    $Alarme=4;
                    fonctionAjoutMobsRangs();
                    $("#nvAlarme").html($Alarme);
                    fonctionEvenement();
                }

                if($tuileObjectif2!=""){
                    if($tuileObjectif2="random"){
                        $random=Math.floor(Math.random()*($tuilesMission.length));
                        $tuileObjectif2=$tuilesMission[$random];
                    }
                    $("#texteObjectif").html($texteObjectif2);
                    $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif2+".png");
                    $("#nomObjectif").html($tuileObjectif2);
                }
            }
            // vérif existence objectif 2
            if($objectifTrouve && ($tuileRandom === $tuileObjectif2)){
                $("#messageObjectifTrouve").html($messageObjectifTrouve2);
            }

        // tirage au sort Mob
        fonctionTirageMob("#imageMob", "#explorerMobs", "#nbMobs");
            // tirage au sort direction Mob
            $random=Math.floor(Math.random()*($directions.length));
            $("#directionMob").html($directions[$random]);
            if($("#explorerMobs").html() === "aucun"){
                $("#directionMob").html("");
            }


        // tirage au sort Caisse
        $random2=Math.floor(Math.random()*(3));
        $caisse=false;
        $("#imageCaisse").attr("src", "");
        if ($random2 === 0){
            $caisse=true;
            $("#imageCaisse").attr("src", "assets/imgs/items/box.png");
            $nbBox++;
            console.log($nbBox);

            // vérif objectif caisses
                // affichage nb dans le html
                if($objectif === "caisses"){
                    $("#nbBox").html($nbBox);
                }
            if($objectif === "caisses" && $nbBox === 5){
                $objectifTrouve=true;
                $("#messageObjectifTrouve").html($messageObjectifTrouve);

                // augmentation Alarme
                if ($Alarme <4){
                    $Alarme=4;
                    fonctionAjoutMobsRangs();
                    $("#nvAlarme").html($Alarme);
                    // événement
                    $imageEvenementMap=$tuileDepart;
                    fonctionEvenement();
                }

                // affichage Obj2

                if($tuileObjectif2 === "random"){
                    $random=Math.floor(Math.random()*($tuilesMission.length));
                    $tuileObjectif2=$tuilesMission[$random];
                }
                $("#texteObjectif").html($texteObjectif2);
                    $("#imageObjectif").attr("src", "assets/imgs/maps/"+$tuileObjectif2+".png");
                    $("#nomObjectif").html($tuileObjectif2);
            }

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
        if($tuilesTirees.length === 5 && $tuileObjectif !=""){
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
        $("#zoneListeActions").addClass("invisible");
        $("#defenseDes").val("4").change();
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
            $("#zoneListeActions").removeClass("invisible");
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
                // condition pour enlever ces actions dans un défi boss
                if ($objectif != "boss"){
                    for($i=0; $i<$actionsVsBleu.length; $i++){
                    $listeActions[$listeActions.length]=$actionsVsObjectif[$i];
                    }
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

    // Activation BOSS
    /***********************************/
    $("#boutonBoss").on("click", function(){
        $("#defenseDesBoss").val("4").change();
        // affichage du popupActivation
        $("#popupBoss").addClass('visible');
        // injection BdD actions
        $listeActionsBoss=[];
        $actionsBoss=$actionsVador;
        for($i=0; $i<$actionsBoss.length; $i++){
            $listeActionsBoss[$listeActionsBoss.length]=$actionsBoss[$i];
        }

        console.log($listeActionsBoss);

        // tirage au sort actions
        $("#listeActionsBoss").html("");
        $random=Math.floor(Math.random()*($listeActionsBoss.length));
        $("#listeActionsBoss").append("<li>"+$listeActionsBoss[$random]+"</li>");

        // bouton Refresh
        $("#boutonRefreshActionBoss").on("click", function(){
            $("#listeActionsBoss").html("");
            $random=Math.floor(Math.random()*($listeActionsBoss.length));
            $("#listeActionsBoss").append("<li>"+$listeActionsBoss[$random]+"</li>");
        })


        // boutonLancerDes
        $("#boutonLancerDesBoss").on("click", function(){
            // récup valeurs
            $nbDes=$("#nbDesBoss").val();
            $defenseDes=$("#defenseDesBoss").val();
            $nbReussites=0;
            //console.log($nbDes, $defenseDes);
            $("#zoneAffichageDesBoss").html("");
            for($i=0; $i<$nbDes; $i++){
                $de=Math.floor(Math.random()*(6)+1);
                console.log($de);
                if($de<$defenseDes){
                    $("#zoneAffichageDesBoss").append('<p class="de deBlanc">'+$de+'</p>');
                }else{
                    $("#zoneAffichageDesBoss").append('<p class="de deRouge">'+$de+'</p>');
                    $nbReussites++;
                }
            }
            $("#nbReussitesBoss").html("⇒ "+$nbReussites);
        })

        // boutonFermerActivation
        $("#boutonFermerBoss").on("click", function(){
            // masquage du popup
            $("#popupBoss").removeClass('visible');
            
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
        $numeroTourInitial=$numeroTour;
        console.log("num initial : "+$numeroTourInitial);
        $("#popupFinTour").addClass("visible");
        $("#boutonValiderFinTour").removeClass("invisible");
        $("#mobsAlerte").prop("checked", false);

        $("#boutonValiderFinTour").on("click", function(){
            $("#boutonValiderFinTour").addClass("invisible");
            $("#divAffichageRenforts").removeClass("invisible");
            
            // vérif switch Alerte
            if($("#mobsAlerte").is(":checked")){
                // Arrivée de Renforts
                $("#affichageRenforts").html("<strong>Augmentation du niveau d'Alarme !</strong> <br><br>Arrivée de Renforts (porte la plus proche). <br><br>Si les Renforts aperçoivent un Héros, ils font IMMEDIATEMENT une Activation.")
                    // tirage au sort Mob
                    fonctionTirageMob("#imageRenforts", "#RenfortsMobs", "#nbRenforts");
                    if($Alarme>6){
                        fonctionTirageMob("#imageRenforts2", "#RenfortsMobs2", "#nbRenforts2");
                    }

                    // si objectif trouvé
                    if ($objectifTrouve){
                        $("#messageRenforts").html("Les Renforts entrent par la porte la plus proche de l'Objectif, et située entre les Héros et l'Objectif. <br> Ils peuvent faire un Mouvement (max 8) vers l'Objectif.")
                    }
                // augmentation Alarme
                fonctionAlarmePlus();
                    // régulation bug Alarme exponentielle
                    if ($Alarme > ($AlarmeInitiale+1)){
                        fonctionAlarmeMoins();
                    }
                    
            }else{
                $random=Math.floor(Math.random()*($Alarme+1));
                console.log($random);
                // arrivée aléatoire conditionnée par nv Alarme
                if($random < $Alarme || $Rang3){
                    $("#affichageRenforts").html("Arrivée de Renforts (par la porte fermée la plus proche) :")
                    // tirage au sort Mob
                    fonctionTirageMob("#imageRenforts", "#RenfortsMobs", "#nbRenforts");
                    // 2ème tirage si alarme > 6
                    if($Alarme>6){
                        fonctionTirageMob("#imageRenforts2", "#RenfortsMobs2", "#nbRenforts2");
                    }
                    // si objectif trouvé
                    if ($objectifTrouve){
                        $("#messageRenforts").html("Les Renforts entrent par la porte la plus proche de l'Objectif, et située entre les Héros et l'Objectif. <br> Ils peuvent faire un Mouvement (max 8) vers l'Objectif.")
                    }
                }else{
                    $("#affichageRenforts").html('La situation est sous contrôle !');
                    //RAZ renforts 1
                    $("#RenfortsMobs").html('');
                    $("#imageRenforts").attr("src","");
                    $("#imageRenfortsSurcouche").attr("src","");
                    $("#nbRenforts").html(''); 
                    //RAZ renforts 2
                    $("#RenfortsMobs2").html('');
                    $("#imageRenforts2").attr("src","");
                    $("#nbRenforts2").html(''); 
                    $("#imageRenforts2Surcouche").attr("src","");
                }
                
            }

            // gestion compte-tour
            
            $numeroTour++;
                // régulation bug compte-tours exponentiel
                for ($i=0; $i<10; $i++){
                    if ($numeroTour > ($numeroTourInitial+1)){
                    $numeroTour--;
                    console.log("num tour : "+$numeroTour);
                    }
                }
            $("#compteTour").html($numeroTour);
                // ajout d'évènement tous les 5 tours
                if ($numeroTour%5 == 0){
                    $imageEvenementMapTampon=$imageEvenementMap;
                    $imageEvenementMap=$tuilesTirees[Math.floor(Math.random()*($tuilesTirees.length))];
                    fonctionEvenement();
                    $imageEvenementMap=$imageEvenementMapTampon;
                }
                
                


            // boutonFermerFinTour
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

    /* 9- boutonCaisse
    ********************************************/
    $("#boutonCaisse").on("click", function(){
        $("#popupCaisse").addClass("visible");
        // random
        $random=Math.floor(Math.random()*($itemsCaisse.length));
        $itemRandom=$itemsCaisse[$random];
        // affichage dans le html
        $("#nomItem").html($itemRandom[1]);
        $("#imageItem").attr("src", "assets/imgs/items/"+$itemRandom[0]+".png");
        // fermeture
        $("#boutonFermerCaisse").on("click", function(){
            $("#popupCaisse").removeClass("visible");
        })
    })

})