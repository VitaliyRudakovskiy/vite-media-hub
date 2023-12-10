import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import { signin, signup } from "../features/Users/userActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const AuthForm = () => {
  const [isLogged, setIsLogged] = useState(true);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogged) {
      dispatch(signin(formData, navigate));
    } else {
      dispatch(signup(formData, navigate));
    }
  };

  const switchAuthMode = () => {
    setIsLogged((prevIsLogged) => !prevIsLogged);
  };

  const handlePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccess = async (res) => {
    const result = jwt_decode(res?.credential);
    const token = res?.credential;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/cards");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
    console.log("Something went wrong with Google Auth. Try again later.");
  };

  return (
    <GoogleOAuthProvider clientId="554245422479-es6572hgm8r7tok40g2fen7o3n92l0jk.apps.googleusercontent.com">
      <div className="my-0 mx-auto max-w-md">
        <div className="flex flex-col border-2 border-green-900">
          <h1 className="text-center text-4xl font-bold text-green-700 mb-3">
            Media Content Hub
          </h1>
          <p className="text-center text-2xl font-semibold">Authorization</p>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            {!isLogged && (
              <div>
                <Input
                  name="firstName"
                  label="Input name"
                  placeholder="Your name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Input last name"
                  placeholder="Your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            )}
            <Input
              name="email"
              type="email"
              label="Input email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={handleChange}
            />
            <div className="relative">
              <Input
                name="password"
                label="Input password"
                type={showPassword ? "password" : "text"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <div
                className="absolute right-2 top-8"
                role="button"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? (
                  <AiFillEye size={28} />
                ) : (
                  <AiFillEyeInvisible size={28} />
                )}
              </div>
            </div>

            {/* Google Authentication */}
            <GoogleLogin
              onSuccess={(response) => {
                googleSuccess(response);
              }}
              onError={(error) => {
                googleFailure(error);
              }}
            />

            <Button
              style={{ alignSelf: "center" }}
              variant="primary"
              type="submit"
            >
              {isLogged ? "Sign In" : "Sign Up"}
            </Button>

            <button
              className="p-2 bg-green-600"
              type="button"
              onClick={switchAuthMode}
            >
              {isLogged
                ? "Don't have an account. Sign Up"
                : "Already have account. Sign In"}
            </button>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthForm;
