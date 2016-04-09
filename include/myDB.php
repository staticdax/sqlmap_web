<?php

class MyDB extends SQLite3
{
    function __construct($db_name)
    {
        $this->open($db_name);
    }

}

?>
