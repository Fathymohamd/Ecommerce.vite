import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    }).then(() => {
    
      navigate("/");
    });
  }, [navigate]);

  return (
    <div className="logout">
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;