<?php
header('Access-Control-Allow-Origin: *'); // 允许跨域访问

// 处理文件下载
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['filename'])) {
    $filename = $_GET['filename'];
    $filePath = 'uploads/' . $filename;
    if (file_exists($filePath)) {
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
        readfile($filePath);
    } else {
        echo $filePath;
        echo '文件不存在！';
    }
    exit;
}

// 如果没有匹配的路由，返回404错误
http_response_code(404);
?>