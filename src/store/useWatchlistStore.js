import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export const useWatchlistStore = create((set) => ({
  list: [],
  keys: new Set(),
  loading: false,

  fetchWatchlist: async (userId) => {
    set({ loading: true });

    const { data, error } = await supabase
      .from("watchlist")
      .select("id, media_id, media_type, title, poster_path")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      set({
        list: data,
        keys: new Set(
          data.map((item) => `${item.media_type}:${item.media_id}`)
        ),
        loading: false,
      });
    } else {
      set({ list: [], keys: new Set(), loading: false });
    }
  },

  isWishlisted: (type, mediaId) => (state) =>
    state.keys.has(`${type}:${mediaId}`),

  addItem: (item) =>
    set((state) => ({
      list: [item, ...state.list],
      keys: new Set(state.keys).add(`${item.media_type}:${item.media_id}`),
    })),

  removeItem: async (id, media_type, media_id) => {
    await supabase.from("watchlist").delete().eq("id", id);

    set((state) => {
      const keys = new Set(state.keys);
      keys.delete(`${media_type}:${media_id}`);

      return {
        list: state.list.filter((i) => i.id !== id),
        keys,
      };
    });
  },
}));
