<?php
// 设置响应头, 允许跨域请求
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");

// 解析POST请求中的用户ID、用户名和密码
$old_name = $_POST['old_name'];
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

// 检查用户名是否合法
if (!preg_match("/^[a-zA-Z0-9_-]{4,16}$/", $username)) {
    echo "invalid_username";
    exit();
}
// 检查密码是否合法)
if ($password != "" && !preg_match("/^[a-zA-Z0-9_-]{8,32}$/", $password)) {
    echo "invalid_password";
    exit();
}
// 检查用户是否存在
$sql = "SELECT * FROM user WHERE username = '$username'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    echo "exist";
    exit();
}

// 更新用户信息
if ($password == "")
    $sql = "UPDATE user SET username = '$username' WHERE username = '$old_name'";
else
    $sql = "UPDATE user SET username = '$username', password = '$password' WHERE username = '$old_name'";
if ($conn->query($sql) === TRUE) {
    echo "success";
} else {
    echo "fail: " . $conn->error;
}

// 关闭数据库连接
$conn->close();
?>