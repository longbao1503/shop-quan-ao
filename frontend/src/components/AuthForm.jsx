function AuthForm({
  isRegister,
  authForm,
  handleAuthChange,
  handleLogin,
  handleRegister,
  setIsRegister,
}) {
  return (
    <form
      className="auth-form"
      onSubmit={isRegister ? handleRegister : handleLogin}
    >
      <h2>{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h2>

      {isRegister && (
        <input
          type="text"
          name="name"
          placeholder="Nhập họ tên"
          value={authForm.name}
          onChange={handleAuthChange}
        />
      )}

      <input
        type="email"
        name="email"
        placeholder="Nhập email"
        value={authForm.email}
        onChange={handleAuthChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Nhập mật khẩu"
        value={authForm.password}
        onChange={handleAuthChange}
      />

      <button type="submit">{isRegister ? "Đăng ký" : "Đăng nhập"}</button>

      <p className="switch-auth">
        {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}{" "}
        <span onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Đăng nhập" : "Đăng ký"}
        </span>
      </p>
    </form>
  );
}

export default AuthForm;