/**
 * 设置页面随机背景图片
 * （从API获取图片）
 */
function setRandomBackground() {
  const url = "https://t.mwm.moe/fj/";
  document.write(
    "<style>body{background:url(" + url + ") no-repeat 50% 0}</style>"
  );
}
document.onload = setRandomBackground();

/**
 * 劫持表单提交
 * @param {String} mode 表单模式
 */
function interceptFormSubmit(mode) {
  event.preventDefault();
  if (mode === "register") handleRegister();
  if (mode === "login") handleLogin();
  if (mode === "update") handleUpdate();
}

/**
 * 验证注册表单
 */
function handleRegister() {
  const type = document.querySelector('input[name="type"]:checked').value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  if (!username || !password || !password2) {
    messageCard("请填写完整信息");
    if (!username) {
      animateCSS("#username", "delay-1s");
      animateCSS("#username", "tada");
    }
    if (!password) {
      animateCSS("#password", "delay-1s");
      animateCSS("#password", "tada");
    }
    if (!password2) {
      animateCSS("#password2", "delay-1s");
      animateCSS("#password2", "tada");
    }
    return;
  }

  if (password !== password2) {
    messageCard("两次密码不一致");

    animateCSS("#password", "delay-1s");
    animateCSS("#password", "tada");
    animateCSS("#password2", "delay-1s");
    animateCSS("#password2", "tada");
    return;
  }

  // 判断用户名是否合法(正则表达式)
  const reg = /^[a-zA-Z0-9_-]{4,16}$/;
  if (!reg.test(username)) {
    messageCard("用户名不合法\n（4-16位字母、数字、下划线、减号）");
    animateCSS("#username", "delay-1s");
    animateCSS("#username", "tada");
    return;
  }

  // 判断密码是否合法(正则表达式)
  const reg2 = /^[a-zA-Z0-9_-]{8,32}$/;
  if (!reg2.test(password)) {
    messageCard("密码不合法\n（8-32位字母、数字、下划线、减号）");
    animateCSS("#password", "delay-1s");
    animateCSS("#password", "tada");
    return;
  }

  // 发送请求
  const xhr = new XMLHttpRequest();
  const formData = `type=${type}&username=${username}&password=${password}`;
  console.log(formData);
  xhr.open("POST", "php/register.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(formData);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = xhr.responseText;
      if (res === "success") {
        messageCard("注册成功，正在前往登录...", "success");
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      } else if (res === "exist") {
        messageCard("用户名已存在");
        animateCSS("#username", "delay-1s");
        animateCSS("#username", "tada");
      } else {
        messageCard(res);
      }
    }
  };
}
/**
 * 验证登录表单
 */
function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username || !password) {
    messageCard("请填写完整信息");
    if (!username) {
      animateCSS("#username", "delay-1s");
      animateCSS("#username", "tada");
    }
    if (!password) {
      animateCSS("#password", "delay-1s");
      animateCSS("#password", "tada");
    }
    return;
  }

  // 发送请求
  const xhr = new XMLHttpRequest();
  const formData = `username=${username}&password=${password}`;
  console.log(formData);
  xhr.open("POST", "php/login.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(formData);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      if (res.status === "success") {
        messageCard("登录成功", "success");
        setLoginCookie(username, res.type);
        setTimeout(() => {
          window.location.href = "afterLogin.html";
        }, 1000);
      } else {
        messageCard(res);
      }
    }
  };
}
function logout() {
  document.cookie = "login=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "index.html";
}

function handleUpdate() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const password2 = document.getElementById("password2").value;
  if (!username) {
    messageCard("请填写完整信息");
    animateCSS("#username", "delay-1s");
    animateCSS("#username", "tada");
    return;
  }
  if (password !== password2) {
    messageCard("两次密码不一致");
    animateCSS("#password", "delay-1s");
    animateCSS("#password", "tada");
    animateCSS("#password2", "delay-1s");
    animateCSS("#password2", "tada");
    return;
  }
  if (username === getLoginCookie().username && !password) {
    messageCard("没有需要修改的信息～", "");
    return;
  }
  // 判断用户名是否合法(正则表达式)
  const reg = /^[a-zA-Z0-9_-]{4,16}$/;
  if (!reg.test(username)) {
    messageCard("用户名不合法\n（4-16位字母、数字、下划线、减号）");
    animateCSS("#username", "delay-1s");
    animateCSS("#username", "tada");
    return;
  }
  if (password) {
    // 判断密码是否合法(正则表达式)
    const reg2 = /^[a-zA-Z0-9_-]{8,32}$/;
    if (!reg2.test(password)) {
      messageCard("密码不合法\n（8-32位字母、数字、下划线、减号）");
      animateCSS("#password", "delay-1s");
      animateCSS("#password", "tada");
      return;
    }
  }
  // 发送请求
  const xhr = new XMLHttpRequest();
  const formData = `old_name=${
    getLoginCookie().username
  }&username=${username}&password=${password}`;
  console.log(formData);
  xhr.open("POST", "php/updateUserInfo.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(formData);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = xhr.responseText;
      if (res === "success") {
        messageCard("修改成功，正在前往登录...", "success");
        setTimeout(() => {
          logout();
        }, 1000);
      } else if (res === "exist") {
        messageCard("用户名已存在");
        animateCSS("#username", "delay-1s");
        animateCSS("#username", "tada");
      } else {
        messageCard(res);
      }
    }
  };
}

function setLoginCookie(username, type) {
  var cookieValue =
    encodeURIComponent(username) + "|" + encodeURIComponent(type);

  // 设置 Cookie 过期时间为7天
  var expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  // 构建 Cookie 字符串
  var cookieString =
    "login=" +
    cookieValue +
    "; expires=" +
    expiryDate.toUTCString() +
    "; path=/";

  // 设置 Cookie
  document.cookie = cookieString;
}
// 从 Cookie 中获取登录信息
function getLoginCookie() {
  var name = "login=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(";");

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      var cookieValue = cookie.substring(name.length);
      var loginArray = cookieValue.split("|");
      var username = decodeURIComponent(loginArray[0]);
      var type = decodeURIComponent(loginArray[1]);

      // 返回登录信息对象
      return {
        username: username,
        type: type,
      };
    }
  }
}
/**
 * 为元素添加动画
 * @param {String} element 使用css选择器
 * @param {String} animation 动画名称
 * @param {String} prefix 动画前缀（默认为animate__）
 * @returns {Promise} Promise(message)（动画结束后执行）
 */
const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

function messageCard(msg, type = "warning") {
  const ele = document.getElementById("message-card");
  ele.innerHTML = msg;

  ele.classList.remove("warning", "success");
  if (type === "warning") {
    ele.classList.add("warning");
  }
  if (type === "success") {
    ele.classList.add("success");
  }
  animateCSS("#message-card", "bounceIn");
  ele.style.display = "block";
}

function hideMessageCard() {
  const ele = document.getElementById("message-card");
  animateCSS("#message-card", "bounceOut").then((message) => {
    ele.style.display = "none";
    ele.classList.remove("warning", "success");
  });
}
