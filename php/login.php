<?php
// 设置响应头, 允许跨域请求
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

// 解析POST请求中的用户名和密码
$username = $_POST['username'];
$password = $_POST['password'];

// 连接到MySQL数据库
$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "MyWeb";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 查询数据库中是否存在匹配的用户名和密码
$sql = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);

// 生成JSON
$json = array();
if ($result->num_rows > 0) {
    // 用户名和密码匹配，登录成功
    $json['status'] = "success";
    $json['type'] = $result->fetch_assoc()['type'];
} else {
    // 用户名和密码不匹配，登录失败
    $json['status'] = "fail";
}

// 输出JSON
echo json_encode($json);

// 关闭数据库连接
$conn->close();
?>
