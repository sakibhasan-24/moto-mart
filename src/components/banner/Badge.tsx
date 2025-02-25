import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { checkOfferExpiry, claimOffer } from "../../redux/offer.slice";

export default function Badge() {
  const dispatch = useAppDispatch();
  const { offer, claimed, expiryTime } = useAppSelector((state) => state.offer);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    dispatch(checkOfferExpiry());

    if (expiryTime) {
      const interval = setInterval(() => {
        const remainingTime = Math.max(
          0,
          Math.floor((expiryTime - Date.now()) / 1000)
        );
        setTimeLeft(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          dispatch(checkOfferExpiry());
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [dispatch, expiryTime]);

  const handleClaimOffer = () => {
    if (!claimed) {
      dispatch(claimOffer());
    }
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center justify-center mt-4">
      <div className="bg-gray-800 text-white px-5 py-2 rounded-md shadow-md text-sm font-semibold flex items-center gap-3">
        <span className="text-lg">🏍️</span>

        {claimed ? (
          <div className="flex flex-col">
            <span className="font-bold">🎉 {offer}% Off!</span>
            <span className="text-xs text-yellow-400">
              ⏳ Expires in: {formatTime(timeLeft)}
            </span>
          </div>
        ) : (
          <button
            onClick={handleClaimOffer}
            className="bg-yellow-500 text-black px-3 py-1 rounded-md text-xs font-bold hover:bg-yellow-600 transition"
          >
            🎁 Mystery Offer!
          </button>
        )}
      </div>
    </div>
  );
}
