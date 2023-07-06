<?php
// 设置响应头, 允许跨域请求
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

// 解析POST请求中的用户名、密码和类型
$username = $_POST['username'];
$password = $_POST['password'];
$type = $_POST['type'];

// 检查是否为空
if ($username == "" || $password == "" || $type == "") {
    echo "empty";
    exit();
}
// 检查用户名是否合法
if (!preg_match("/^[a-zA-Z0-9_-]{4,16}$/", $username)) {
    echo "invalid_username";
    exit();
}
// 检查密码是否合法
if (!preg_match("/^[a-zA-Z0-9_-]{8,32}$/", $password)) {
    echo "invalid_password";
    exit();
}

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

// 查询数据库中是否存在匹配的用户名
$sql = "SELECT * FROM user WHERE username = '$username'";
$result = $conn->query($sql);

// 如果存在匹配的用户名，注册失败
if ($result->num_rows > 0) {
    echo "exist";
    exit();
}

// 插入新用户信息到数据库
$sql = "INSERT INTO user (username, password, type) VALUES ('$username', '$password', '$type')";
if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "fail: " . $conn->error;
}

// 关闭数据库连接
$conn->close();
?>
