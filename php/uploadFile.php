<?php
header('Access-Control-Allow-Origin: *'); // 允许跨域访问

// 处理文件上传
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
  $targetDir = 'uploads/'; // 文件保存目录
  $targetFile = $targetDir . basename($_FILES['file']['name']);
  $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

  // 检查文件类型是否合法
  if ($fileType === 'ppt' || $fileType === 'pptx' || $fileType === 'key') {
    // 将文件从临时目录移动到目标目录
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
      http_response_code(200); // 设置响应状态为成功
    } else {
      http_response_code(500); // 设置响应状态为服务器错误
    }
  } else {
    http_response_code(400); // 设置响应状态为客户端错误
  }
  exit();
}

// 如果没有匹配的路由，返回404错误
http_response_code(404);
?>