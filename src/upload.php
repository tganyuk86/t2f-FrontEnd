<?php
// Output JSON
function outputJSON($msg, $status = 'error', $path=null){
    header('Content-Type: application/json');
    die(json_encode(array(
        'data' => $msg,
        'status' => $status,
        'path' => $path
    )));
}

// Check for errors
if($_FILES['SelectedFile']['error'] > 0){
    outputJSON('Error during upload');
}

if(!getimagesize($_FILES['SelectedFile']['tmp_name'])){
    outputJSON('Please ensure you are uploading an image.');
}

//Check filetype
if(!preg_match('/^image/', ($_FILES['SelectedFile']['type']))){
    outputJSON('Unsupported filetype uploaded.');
}

//Check filesize
if($_FILES['SelectedFile']['size'] > 10000000){
    outputJSON('File uploaded exceeds maximum upload size.');
}

// Check if the file exists
if(file_exists('upload/' . $_FILES['SelectedFile']['name'])){
    outputJSON('File with that name already exists.');
}

// Upload file
if(!move_uploaded_file($_FILES['SelectedFile']['tmp_name'], 'upload/' . $_FILES['SelectedFile']['name'])){
    outputJSON('Error uploading file - check destination is writeable.');
}

// Success!

$path = 'upload/' . $_FILES['SelectedFile']['name'];
outputJSON('File uploaded successfully to "' . $path . '".', 'success', $path);