import { create } from "zustand";

const useDashboardStore = create((set) => ({
    sitesData: [],
    chartsData: [],
    energyType: "electric",

    electricTotals:{
        cost:0,
        energy:0,
        demand:0,
        penalties:0,
    },

    setSitesData: (sitesData) => set({ sitesData }),
    setChartsData: (chartsData) => set({ chartsData }),
    setEnergyType: (energyType) => set({ energyType }),
    setElectricTotals: (electricTotals) => set({ electricTotals }),
}));

export default useDashboardStore;