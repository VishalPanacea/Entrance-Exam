import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  password: string;
}

interface SignupState {
  formData: {
    username: string;
    password: string;
    repeatPassword: string;
    phoneNumber: string;
    captcha: string;
    countryCode: string;
  };
  validation: {
    username: boolean;
    password: boolean;
    repeatPassword: boolean;
    phoneNumber: boolean;
    captcha: boolean;
  };
  showPassword: boolean;
  showRepeatPassword: boolean;
  captchaText: string;
  activeStep: number;
  user: User;
}

const initialState: SignupState = {
  formData: {
    username: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
    captcha: "",
    countryCode: "+91",
  },
  validation: {
    username: true,
    password: true,
    repeatPassword: true,
    phoneNumber: true,
    captcha: true,
  },
  showPassword: false,
  showRepeatPassword: false,
  captchaText: "",
  activeStep: 0,
  user: {
    username: "",
    email: "",
    password: "",
  },
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateField: (state, action: PayloadAction<{ name: string; value: string }>) => {
      state.formData[action.payload.name as keyof SignupState["formData"]] = action.payload.value;
    },
    validateField: (state, action: PayloadAction<{ name: string; value: string }>) => {
      const { name, value } = action.payload;
      let isValid = true;

      if (name === "username") {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      } else if (name === "password") {
        isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,14}$/.test(value);
      } else if (name === "repeatPassword") {
        isValid = value === state.formData.password;
      } else if (name === "phoneNumber") {
        isValid = /^[0-9]{10}$/.test(value);
      } else if (name === "captcha") {
        isValid = value === state.captchaText;
      }

      state.validation[name as keyof SignupState["validation"]] = isValid;
    },
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    toggleRepeatPasswordVisibility: (state) => {
      state.showRepeatPassword = !state.showRepeatPassword;
    },
    generateCaptcha: (state) => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
      let captcha = "";
      for (let i = 0; i < 6; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      state.captchaText = captcha;
    },
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },
    setSignupDetails: (state, action: PayloadAction<User>) => {
      const { username, email, password } = action.payload;
      console.log("action.payload", action.payload);
      state.user = {
        username,
        email,
        password,
      };
    },
    resetSignupDetails: (state) => {
      state.user = {
        username: "",
        email: "",
        password: "",
      };
    },
  },
});

export const {
  updateField,
  validateField,
  togglePasswordVisibility,
  toggleRepeatPasswordVisibility,
  generateCaptcha,
  setActiveStep,
  setSignupDetails,
  resetSignupDetails,
} = signupSlice.actions;

export const getSignupDetails = (state: { signup: SignupState }) => state.signup.user;

export default signupSlice.reducer;