import { create } from "zustand";

const useFiltersStore = create((set) => ({
    selectedDataType: "cost",
    selectedYear: "2024",
    selectedFormat: "all",
    selectedSites: "all",
    selectedMonths: "all",
    selectedKpi: "dailyIntensity",

    setDataType: (type) =>
      set((state) => ({
        selectedDataType: type,
        selectedKpi: type === "cost" ? "dailyIntensity" :
                     type === "energy" ? "intensity" :
                     "demandUsageRatio"
      })),
  
    setSelectedKpi: (kpi) => set({ selectedKpi: kpi }),
    setMonths: (energyType) => set({ selectedMonths: energyType }),
    setDataType: (dataType) => set({ selectedDataType: dataType }),
    setYear: (year) => set({ selectedYear: year }),
    setFormat: (format) => set({ selectedFormat: format }),
    setSites: (sites) => set({ selectedSites: sites }),
    setMonths: (months) => set({ selectedMonths: months }),

    resetFilters: () =>
        set({
          selectedDataType: "cost",
          selectedYear: "2023",
          selectedFormat: "all",
          selectedSites: "all",
          selectedMonths: "all",
        }),
}));

export default useFiltersStore;