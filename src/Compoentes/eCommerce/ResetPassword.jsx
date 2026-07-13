import React, { useState } from "react";
import { useParams } from "react-router-dom";


function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
     if(password ==  "" && confirmPassword == "") {
        setMessage("Passwords and  confirmPassword is required");
      return;
     }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password , token}),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }else {
        setMessage(data.message);
        setPassword("")
        setConfirmPassword("")
      }
    } catch (error) {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-card">
        <h2>Reset Password</h2>

        <p>Create a new password for your account.</p>

        {message && <p className="message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;