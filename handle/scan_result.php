<?php
include '../include/connect_db.php';

if(isset($_POST['taskid']) && isset($_POST['content_type'])){
    $taskid = $_POST['taskid'];
    $content_type = $_POST['content_type'];


    //anti sqli method
    $stmt = $db->prepare('SELECT value FROM data where taskid=:taskid and content_type=:content_type');
    $stmt->bindValue(':taskid', $taskid, SQLITE3_TEXT);
    $stmt->bindValue(':content_type', $content_type, SQLITE3_INTEGER);
    //var_dump($stmt);
    $result = $stmt->execute();


    //No anti sqli query
    //$result = $db->query("SELECT value FROM data where taskid='61de7e16e0799987' and content_type=0");
    //var_dump($result->fetchArray());
    echo($result->fetchArray()["value"]);
}
else {
    echo 'error';
}
?>
