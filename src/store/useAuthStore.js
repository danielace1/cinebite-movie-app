import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  unsubscribe: null,

  initAuth: async () => {
    const { data } = await supabase.auth.getSession();
    set({ user: data.session?.user ?? null, loading: false });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        set({ user: session?.user ?? null });
      }
    );

    set({ unsubscribe: listener.subscription.unsubscribe });
  },

  login: async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  },

  signup: async (email, password) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  },

  sendResetEmail: async (email) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  },

  updatePassword: async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
