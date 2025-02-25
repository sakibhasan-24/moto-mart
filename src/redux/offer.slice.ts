import { createSlice } from "@reduxjs/toolkit";

interface Offer {
  offer: number | null;
  claimed: boolean;
  expiryTime: number | null;
}

const loadState = (): Offer => {
  const savedOffer = localStorage.getItem("offer");
  return savedOffer
    ? JSON.parse(savedOffer)
    : { offer: null, claimed: false, expiryTime: null };
};

const saveState = (state: Offer) => {
  localStorage.setItem("offer", JSON.stringify(state));
};

const initialState: Offer = loadState();

const offerSlice = createSlice({
  name: "offer",
  initialState,
  reducers: {
    claimOffer: (state) => {
      if (!state.claimed) {
        const randomOffer = Math.floor(Math.random() * (30 - 5 + 1)) + 5;
        state.offer = randomOffer;
        state.claimed = true;
        state.expiryTime = Date.now() + 12 * 60 * 60 * 1000;
        saveState(state);
      }
    },
    checkOfferExpiry: (state) => {
      if (state.expiryTime && Date.now() > state.expiryTime) {
        state.offer = null;
        state.claimed = false;
        state.expiryTime = null;
        saveState(state);
      }
    },
  },
});

export const { claimOffer, checkOfferExpiry } = offerSlice.actions;
export default offerSlice.reducer;
