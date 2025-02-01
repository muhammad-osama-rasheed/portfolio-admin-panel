import React, { useState } from "react";
import styles from "./CustomInput.module.css";

function CustomInput({
  value,
  placeholder,
  type,
  onChange,
  name,
  title,
  required,
  rows,
  bad,
  disabled,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles["input-container"]}`}>
      <p
        style={{ color: bad ? "red" : "#666666" }}
        className={`${styles["input-title"]}`}
      >
        {title}
      </p>
      <div className="d-flex align-items-center">
        {type === "textarea" ? (
          <textarea
            style={{ borderColor: bad ? "red" : "#9e9e9e" }}
            className={`text-dark ${styles["custom-input"]}`}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required ? true : false}
            rows={rows || 2}
            disabled={disabled ? true : false}
          />
        ) : (
          <input
            style={{
              borderColor: bad ? "red" : "#d1d1d1",
            }}
            className={`text-dark ${styles["custom-input"]}`}
            name={name}
            type={showPassword ? "text" : type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required ? true : false}
            maxLength={type === "password" ? 40 : ""}
            multiple={true}
            disabled={disabled ? true : false}
          />
        )}

        {type === "password" && (
          <span
            className="position-absolute d-flex align-items-center"
            style={{ right: "10px" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img
              src={showPassword ? "/images/seen.png" : "/images/hide.png"}
              style={{
                width: "14px",
                height: "14px",
                opacity: "0.8",
                cursor: "pointer",
              }}
              alt="passsword"
            />
          </span>
        )}
      </div>
    </div>
  );
}

export default CustomInput;
