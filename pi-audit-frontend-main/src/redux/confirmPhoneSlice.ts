import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfirmPhoneState {
  otp: string[];
  isOtpComplete: boolean;
  attempts: number;
  errorMessage: string;
  timer: number;
  isResendDisabled: boolean;
  openConfirmationModal: boolean;
  activeStep: number;
}

const initialState: ConfirmPhoneState = {
  otp: Array(6).fill(''),
  isOtpComplete: false,
  attempts: 3,
  errorMessage: '',
  timer: 60,
  isResendDisabled: false,
  openConfirmationModal: false,
  activeStep: 1,
};

const confirmPhoneSlice = createSlice({
  name: "confirmPhone",
  initialState,
  reducers: {
    // Set OTP and check if it's complete
    setOtp: (state, action: PayloadAction<string[]>) => {
      state.otp = action.payload;
      state.isOtpComplete = action.payload.every((digit) => digit !== '');
    },

    // Set number of attempts left
    setAttempts: (state, action: PayloadAction<number>) => {
      state.attempts = action.payload;
    },

    // Set the error message to be displayed
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    // Set timer (used for resend OTP countdown)
    setTimer: (state, action: PayloadAction<number>) => {
      state.timer = action.payload;
    },

    // Disable/enable the resend OTP button
    setIsResendDisabled: (state, action: PayloadAction<boolean>) => {
      state.isResendDisabled = action.payload;
    },

    // Toggle the confirmation modal visibility
    setOpenConfirmationModal: (state, action: PayloadAction<boolean>) => {
      state.openConfirmationModal = action.payload;
    },

    // Set active step in the flow (e.g., step 1 for OTP entry)
    setActiveStep: (state, action: PayloadAction<number>) => {
      state.activeStep = action.payload;
    },

    // Reset state to initial values (e.g., when user goes back to the start)
    resetState: (state) => {
      state.otp = Array(6).fill('');
      state.isOtpComplete = false;
      state.attempts = 3;
      state.errorMessage = '';
      state.timer = 60;
      state.isResendDisabled = false;
      state.openConfirmationModal = false;
      state.activeStep = 1;
    }
  },
});

export const {
  setOtp,
  setAttempts,
  setErrorMessage,
  setTimer,
  setIsResendDisabled,
  setOpenConfirmationModal,
  setActiveStep,
  resetState, // Export resetState to be used when needed
} = confirmPhoneSlice.actions;

export default confirmPhoneSlice.reducer;
