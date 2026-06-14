import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Address, LocationOption } from '@/types/index';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  otpSent: boolean;
  otpVerified: boolean;
  selectedLocation: LocationOption | null;
  onboardingComplete: boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  setLocation: (location: LocationOption) => void;
  updateAddress: (address: Address) => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      otpSent: false,
      otpVerified: false,
      selectedLocation: null,
      onboardingComplete: false,

      login: async (email: string) => {
        set({ isLoading: true });
        // Simulate API call
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const user: User = {
              id: 'u1',
              name: 'Saket',
              email,
              phone: '+8801700000000',
              avatar: '/images/avatar.png',
              address: {
                id: 'addr1',
                label: 'Home',
                street: 'Block B, Banasree',
                city: 'Dhaka',
                state: 'Dhaka Division',
                zipCode: '1219',
                isDefault: true,
              },
            };
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1200);
        });
      },

      signup: async (name: string, email: string, phone: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const user: User = {
              id: 'u1',
              name,
              email,
              phone,
            };
            set({ user, isLoading: false });
            resolve(true);
          }, 1200);
        });
      },

      sendOtp: async (_phone: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            set({ otpSent: true, isLoading: false });
            resolve(true);
          }, 800);
        });
      },

      verifyOtp: async (otp: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            if (otp.length === 4) {
              set({ otpVerified: true, isAuthenticated: true, isLoading: false });
              resolve(true);
            } else {
              set({ isLoading: false });
              resolve(false);
            }
          }, 1000);
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          otpSent: false,
          otpVerified: false,
        });
      },

      setLocation: (location: LocationOption) => {
        set({ selectedLocation: location });
      },

      updateAddress: (address: Address) => {
        set((state) => ({
          user: state.user ? { ...state.user, address } : null,
        }));
      },

      completeOnboarding: () => {
        set({ onboardingComplete: true });
      },
    }),
    {
      name: 'nectar-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedLocation: state.selectedLocation,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
