'use client';
import useFiltersStore from '@/store/bills/dashboardFiltersStore';

export const KPI_OPTIONS = {
  cost: [
    {
      value: 'dailyIntensity',
      label: 'Daily Electric Cost Intensity',
      subtext: 'Total_Electric_Cost_Daily / Site_Area',
      suffix: 'S/m²',
    },
    {
      value: 'avgDailyCost',
      label: 'Average Daily Electric Cost',
      subtext: 'Total_Electric_Cost_Daily',
      suffix: 'S/day',
    },
    {
      value: 'blendedRate',
      label: 'Blended Rate',
      subtext: 'Total_Electric_Cost_Daily / Energy_Total_Daily',
      suffix: 'S/kWh',
    },
  ],
  energy: [
    {
      value: 'intensity',
      label: 'Energy Use Intensity (EnergyStar)',
      subtext: 'Energy_Total / Site_Area',
      suffix: 'kWh/m²',
    },
    {
      value: 'dailyIntensity',
      label: 'Daily Energy Use Intensity',
      subtext: 'Energy_Total_Daily / Site_Area',
      suffix: 'kWh/m²',
    },
  ],
  demand: [
    {
      value: 'demandUsageRatio',
      label: 'Demand Usage Ratio',
      subtext: 'Demand_Max / Contract_Demand',
      suffix: '%',
    },
  ],
};

const KpiSelector = () => {
  const { selectedDataType, selectedKpi, setSelectedKpi } = useFiltersStore();

  const options = KPI_OPTIONS[selectedDataType] || [];

  return (
    <div className="form-control w-full ml-8">
      <select
        className="select select-bordered"
        value={selectedKpi}
        onChange={(e) => setSelectedKpi(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label} ({option.suffix})
          </option>
        ))}
      </select>
      {/* {options.find((o) => o.value === selectedKpi)?.subtext && (
        <span className="text-xs text-gray-500 mt-1 italic">
          {
            options.find((o) => o.value === selectedKpi)
              ?.subtext
          }
        </span>
      )} */}
    </div>
  );
};

export default KpiSelector;