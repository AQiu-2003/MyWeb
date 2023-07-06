<?php
$directory = 'uploads';

// 使用scandir()函数获取目录下的所有文件和文件夹
$files = scandir($directory);

// 遍历目录中的文件和文件夹
foreach ($files as $file) {
    if ($file != '.' && $file != '..') {
        echo '<a style="display:block;text-decoration: none;color: black;margin: 0.1rem;font-family: system-ui;" href="http://localhost:8080/downloadFile.php?filename='.$file.'" >'.$file.'</a><br>';
        // echo $file . '<br>'; // 输出文件名或文件夹名
    }
}
?>