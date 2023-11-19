import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const EventContext = createContext();
const EventUpdateContext = createContext();

export const useEvent = () => {
  return useContext(EventContext);
};

export const useEventUpdate = () => {
  return useContext(EventUpdateContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useLocalStorage("events", {});

  return (
    <EventContext.Provider value={events}>
      <EventUpdateContext.Provider value={setEvents}>
        {children}
      </EventUpdateContext.Provider>
    </EventContext.Provider>
  );
};
