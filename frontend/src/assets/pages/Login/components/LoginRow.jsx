function LoginRow({ keyName, label, value, onChange, type = "text" }) {
  return (
    <div className="row mb-3">
      <div className="col-12 col-md-4">
        <label htmlFor={keyName} className="form-label fw-bold">
          {label}
        </label>
      </div>
      <div className="col-12 col-md-8">
        <input
          type={type}
          name={keyName}
          id={keyName}
          className="form-control"
          value={value}
          onChange={onChange}
          autoComplete={keyName === "user" ? "on" : "off"}
        />
      </div>
    </div>
  );
}

export default LoginRow;

