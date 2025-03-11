import axios from "axios";
import React, { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5247/api";

export const GetAllHotels = async (
  city?: string,
  checkInDate?: string,
  checkOutDate?: string,
  guest?: number
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Hotels`, {
      params: {
        city,
        checkInDate,
        checkOutDate,
        guest,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching hotels: ", error);
    throw error;
  }
};
