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
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, phone: string, password?: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<boolean>;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
  setLocation: (location: LocationOption) => void;
  updateAddress: (address: Address) => void;
  completeOnboarding: () => void;
}

// Reusable mock profile factory so both Login and OTP validation paths generate complete datasets
const createMockUser = (overrides: Partial<User> = {}): User => ({
  id: overrides.id || 'u1',
  name: overrides.name || 'Saket',
  email: overrides.email || 'user@nectar.app',
  phone: overrides.phone || '+8801700000000',
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
});

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

      login: async (email: string, _password?: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            const user = createMockUser({ email });
            set({ user, isAuthenticated: true, isLoading: false });
            resolve(true);
          }, 1200);
        });
      },

      signup: async (name: string, email: string, phone: string, _password?: string) => {
        set({ isLoading: true });
        return new Promise<boolean>((resolve) => {
          setTimeout(() => {
            // Stage the user data collected from NumberScreen
            const stagedUser: User = {
              id: 'u1',
              name,
              email,
              phone,
            };
            set({ user: stagedUser, isLoading: false });
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
              set((state) => {
                // Fix: Hydrate the staged signup user with full profile defaults/avatars on success
                const completedUser = createMockUser({
                  name: state.user?.name,
                  email: state.user?.email,
                  phone: state.user?.phone,
                });

                return {
                  user: completedUser,
                  otpVerified: true,
                  isAuthenticated: true,
                  isLoading: false,
                };
              });
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
          // Note: keeping onboardingComplete intact so they don't see splash sliders again
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
      partialize: (state: AuthState) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        selectedLocation: state.selectedLocation,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);