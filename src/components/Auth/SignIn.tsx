import { Link } from "react-router-dom"
import { TextField, Button } from "@mui/material"
import "./Auth.css";

function SignIn() {
  return <div className="SignIn">
    <div className="Navigation">
      New to Wizer? <Link to="sign-up">Sign Up</Link>
    </div>
    <div className="Wrapper">
      <div className="Title">
        Sign In To Wizer
      </div>
      <div className="Subtitle">
        Discover more with a Wizer account
      </div>
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Password" variant="outlined" fullWidth />
      <Button variant="contained" fullWidth>Sign In</Button>
      <Link className="ForgotPassword" to="forgot-password">
        Forgot Password?
      </Link>
    </div>
  </div>
}

export default SignIn