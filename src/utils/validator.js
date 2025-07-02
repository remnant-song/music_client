// 手机号验证器
function validatorPhone(rule, value, callback) {
  if (value === "") {
    callback(new Error(" 手机号不能为空 "));
  } else if (
    !/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
      value
    )
  ) {
    callback(new Error(" 手机号格式错误 "));
  } else {
    callback();
  }
}
// 邮箱验证器
function validatorEmail(rule, value, callback) {
  if (value === "") {
    callback(new Error(" 邮箱不能为空 "));
  } else if (!/^\w+([-\.]\w+)*@\w+([\.-]\w+)*\.\w{2,4}$/.test(value)) {
    callback(new Error(" 邮箱格式错误 "));
  } else {
    callback();
  }
}

export default {
      // 手机号
  phoneRules: [
    {
      required: true,
      validator: validatorPhone,
      trigger: "change",
    },
  ],
  // 邮箱
  emailRules: [
    {
      required: true,
      validator: validatorEmail,
      trigger: "change",
    },
  ],
  // 密码
  passwordRules: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
    {
      min: 5,
      max: 18,
      message: "密码长度在 5 到 18 个字符",
      trigger: "blur",
    },
  ],
};