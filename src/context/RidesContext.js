import React, { createContext, useState } from 'react';

export const RidesContext = createContext();

export const RidesProvider = ({ children }) => {
  const [acceptedRides, setAcceptedRides] = useState([]);
  const [rides, setRides] = useState([
    { id: '1', driver: 'João', destination: 'Centro da Cidade', time: '09:00', date: '2023-10-28', spots: 1, imageUrl: 'https://via.placeholder.com/80' },
    { id: '2', driver: 'Maria', destination: 'Shopping Metropolitano', time: '13:30', date: '2023-10-29', spots: 3, imageUrl: 'https://via.placeholder.com/80' },
    { id: '3', driver: 'Lucas', destination: 'Estação Jardim Oceânico', time: '18:00', date: '2023-10-30', spots: 1, imageUrl: 'https://via.placeholder.com/80' },
    { id: '4', driver: 'Ana', destination: 'Barra da Tijuca', time: '07:30', date: '2023-11-01', spots: 2, imageUrl: 'https://via.placeholder.com/80' },
  ]);

  const addRide = (ride) => {
    setRides((prevRides) =>
      prevRides.map((r) => r.id === ride.id ? { ...r, spots: r.spots - 1 } : r)
    );
    setAcceptedRides((prevAccepted) => [...prevAccepted, ride]);
  };

  const removeRide = (rideId) => {
    setAcceptedRides((prevAccepted) =>
      prevAccepted.filter((ride) => ride.id !== rideId)
    );
    setRides((prevRides) =>
      prevRides.map((ride) => ride.id === rideId ? { ...ride, spots: ride.spots + 1 } : ride)
    );
  };

  return (
    <RidesContext.Provider value={{ acceptedRides, rides, addRide, removeRide }}>
      {children}
    </RidesContext.Provider>
  );
};
