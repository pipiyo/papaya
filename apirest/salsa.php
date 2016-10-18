<?php
header("Content-Type: application/json;charset=utf-8");

$array = array( array('nombre' => 'yoli',
					  'id' => '1'),
				array('nombre' => 'asdd',
					  'id' => '2'),
				array('nombre' => 'dhdfhg',
					  'id' => '3'),
				array('nombre' => 'yhdfg',
					  'id' => '4'),
				array('nombre' => 'werytu',
					  'id' => '5') );


echo json_encode($array);

?>