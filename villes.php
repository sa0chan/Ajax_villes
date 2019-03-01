<?php


include('config/config.php');




try
{
    if (array_key_exists('cp',$_GET)){
        $numDept = $_GET['cp'];
    }
    else{
        echo ('Veuillez rentrer un chiffre dans la nav');
    }


    $dbh = new PDO(DB_SGBD.':host='.DB_SGBD_URL.';dbname='.DB_DATABASE.';charset='.DB_CHARSET, DB_USER, DB_PASSWORD);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

 
    $sth1 = $dbh->prepare('SELECT `ville_nom`,`ville_code_postal` FROM `villes_france_free` WHERE `ville_code_postal` LIKE :numDept OR 'ville_ code_postal' LIKE :numDept2');
    $sth1->bindValue(':numDept', $numDept.'%', PDO::PARAM_STR);
    $sth1->bindValue(':numDept', '-%'.$numDept, PDO::PARAM_STR);
    $sth1->execute();
    
    $result1 = $sth1->fetchAll(PDO::FETCH_ASSOC);
    
    header('content-type:application/json');
    echo json_encode($result1);
    

    /*include('templates/villes.phtml');*/

}
catch(PDOException $e)
{
    echo 'Une erreur s\'est produite : '.$e->getMessage();
}




