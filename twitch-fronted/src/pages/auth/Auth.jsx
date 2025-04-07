import { useState } from "react";
import { Login } from "../../components/Login";

import "./authPage.css";

export const Auth = () => {
  
  const [isLogin, setIsLoading] = useState(true);

  const handleAuthPageToggle = () => {
    setIsLoading((prev) => !prev)
  }

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login switchAuthHandler={handleAuthPageToggle}/>
      ) : (
        register
      )}
    </div>
  )

  return (
    <div>
        Authpage
    </div>
  )
}

export default Auth
