import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
  id: number;
  path: string;
  icon: string;
  label: string;
  tooltip: string;
}

interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: { id: string; name: string; role: string } | null;
  token: string | null;
  allowedMenuItems: MenuItem[];
  isAuthenticated: boolean;
}

interface LoginState {
  username: string;
  password: string;
  message: string;
  showPassword: boolean;
  isAuthenticated: boolean;
  userMenu: MenuItem[] | null;
  user: User;
}

const initialState: LoginState = {
  username: "",
  password: "",
  message: "",
  showPassword: false,
  isAuthenticated: false,
  userMenu: null,
  user: {
    email: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    togglePasswordVisibility: (state) => {
      state.showPassword = !state.showPassword;
    },
    loginSuccess: (state) => {
      state.isAuthenticated = true;
      state.userMenu = [
         { id: 1, path: "/admin", icon: "SuperAdmin", label: "Admin", tooltip: "Click here for the dashboard" },
        { id: 2, path: "/students", icon: "students", label: "students", tooltip: "Click here for the students" },
        { id: 3, path: "/question", icon: "Questions", label: "Questions", tooltip: "Click here for the Questions" },
        { id: 4, path: "/exam", icon: "Exams", label: "Exams", tooltip: "Click here for the Exams" },
        // { id: 1, path: "/dashboard", icon: "Dashboard", label: "Dashboard", tooltip: "Click here for the dashboard" },
        // { id: 2, path: "/projects", icon: "Projects", label: "Projects", tooltip: "Click here for the projects" },
        // { id: 3, path: "/clients", icon: "Clients", label: "Clients", tooltip: "Click here for the clients" },
      ];
    },
    resetLoginState: (state) => {
      state.username = "";
      state.password = "";
      state.message = "";
      state.showPassword = false;
      state.isAuthenticated = false;
      state.userMenu = null;
      state.user = {
        email: "",
        password: "",
      };
    },
    setLoginDetails: (state, action: PayloadAction<User>) => {
      const { email, password } = action.payload;
      console.log("action.payload", action.payload);
      state.user = {
        email,
        password,
      };
    },

    setAuthDetails: (state, action: PayloadAction<AuthState>) => {
      const { user, token, allowedMenuItems, isAuthenticated } = action.payload;
      console.log("action.payload", action.payload);
      state.user = {
        email: user?.id || "",
        password: user?.name || "",
      };
      state.username = user?.name || "";
      state.message = "I AM ADMIN";
      state.showPassword = false;
      state.isAuthenticated = isAuthenticated;
      state.userMenu = allowedMenuItems;
      localStorage.setItem("menuItems", JSON.stringify(action.payload));
    },

    resetLoginDetails: (state) => {
      state.user = {
        email: "",
        password: "",
      };
    },
    updateLoginDetails: (state, action: PayloadAction<Partial<User>>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
});

export const {
  setUsername,
  setPassword,
  setMessage,
  togglePasswordVisibility,
  loginSuccess,
  resetLoginState,
  setLoginDetails,
  setAuthDetails,
  resetLoginDetails,
  updateLoginDetails,
  
} = loginSlice.actions;

export const getLoginDetails = (state: { login: LoginState }) => state.login.user;

export default loginSlice.reducer;