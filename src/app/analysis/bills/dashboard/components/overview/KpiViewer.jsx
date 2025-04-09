'use client';
import useFiltersStore from '@/store/bills/dashboardFiltersStore';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { KPI_OPTIONS } from './KpiSelector';
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useState } from "react";
import KpiAnalyticsModal from "./modals/KpiAnalyticsModal";
import baselines from '../../utils/baselinesData';
import BenchmarkBadge from './BenchmarkBadge';

const getMonthAbbreviation = (monthNumber) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  return months[monthNumber - 1] || '';
};

const getMedian = (values) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
};

const getRelativeWidth = (value, max) => `${(value / max) * 100}%`;

const KpiCharts = ({ chartsData }) => {
  const { selectedKpi, selectedDataType } = useFiltersStore();
  const [selectedSite, setSelectedSite] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const kpiMeta = KPI_OPTIONS[selectedDataType]?.find(k => k.value === selectedKpi);
  const kpiSuffix = kpiMeta?.suffix || '';

  const openModal = (site) => {
    setSelectedSite(site)
    setIsModalOpen(true)
  }
  
  const groupedByFormat = chartsData.reduce((acc, site) => {
    const format = site.siteFormat || 'Unknown';
    if (!acc[format]) acc[format] = [];
    acc[format].push(site);
    return acc;
  }, {});

  return (
    <div className="w-full mt-0 space-y-4">
      {Object.entries(groupedByFormat).map(([format, sites], index) => {
        const sortedSites = [...sites].sort(
          (a, b) =>
            (b.kpi?.[selectedDataType]?.[selectedKpi] || 0) -
            (a.kpi?.[selectedDataType]?.[selectedKpi] || 0)
        );

        const isFirst = index === 0;
        const kpiValues = sortedSites.map(site => site.kpi?.[selectedDataType]?.[selectedKpi] || 0);
        const maxValue = Math.max(...kpiValues);
        const minValue = Math.min(...kpiValues);
        const medianValue = getMedian(kpiValues);
        const maxSite = sortedSites.find(site => (site.kpi?.[selectedDataType]?.[selectedKpi] || 0) === maxValue);
        const minSite = sortedSites.find(site => (site.kpi?.[selectedDataType]?.[selectedKpi] || 0) === minValue);

        return (
          <div key={format} className="collapse collapse-arrow bg-base-100">
            <input type="checkbox" defaultChecked={isFirst}/>
            <div className="collapse-title text-md font-semibold">{format}</div>
            <div className="collapse-content">
              <div className="flex justify-between text-sm text-slate-600 px-2 mx-10 py-1 mb-6 border-b border-slate-600/20">
                <div className="tooltip tooltip-top z-50" data-tip={`Highest value site: ${maxSite?.siteName || 'N/A'}`}>
                  <span className="cursor-pointer"><strong>Max:</strong> {maxValue.toFixed(2)} {kpiSuffix}</span>
                </div>
                <div className="tooltip tooltip-top z-50" data-tip="Median calculated from all KPI values in this group">
                  <span className="cursor-pointer"><strong>Median:</strong> {medianValue.toFixed(2)} {kpiSuffix}</span>
                </div>

                <div className="tooltip tooltip-top z-50" data-tip={`Lowest value site: ${minSite?.siteName || 'N/A'}`}>
                  <span className="cursor-pointer"><strong>Min:</strong> {minValue.toFixed(2)} {kpiSuffix}</span>
                </div>
              </div>
              <div className="space-y-4">
                {sortedSites.map((site) => {
                  const kpiValue = site.kpi?.[selectedDataType]?.[selectedKpi] || 0;
                  const tooltipId = `kpi-tooltip-${site.siteID}`;
                  const hasMissing = Object.keys(site.missingBillsByMonth || {}).length > 0;
                  console.log("saddadas",selectedKpi)
                  return (
                    <div
                      key={site.siteID}
                      className="flex flex-col gap-1 px-2 py-3 bg-white rounded hover:bg-base-100 transition duration-150 cursor-pointer relative"
                    >
                      {/* primera fila: site name + warning + categorias */}
                      <div className="flex justify-between items-start text-sm font-medium text-slate-800">
                        <div className="flex items-center gap-2">
                          {hasMissing && <FaTriangleExclamation data-tooltip-id={tooltipId} className="text-warning" />}
                          {site.siteName}
                        </div>
                        <div className="text-right text-xs text-slate-700 ">
                          <div>{site.siteCategory}</div>
                          <div className="opacity-70">{site.siteSubcategory}</div>
                        </div>
                      </div>

                      {/* barra progreso */}
                      <div className="w-full h-3 bg-gray-200 rounded overflow-hidden mt-1">
                        <div
                          className="h-full bg-primary"
                          style={{ width: getRelativeWidth(kpiValue, maxValue) }}
                        ></div>
                      </div>

                      {/* ultima fila: kpi + badge + stats */}
                      <div className="flex justify-between text-slate-600 mt-1">
                        <div className='flex gap-4'>
                           <strong>{kpiValue.toFixed(2)} {kpiSuffix}</strong>
                           {selectedKpi === "intensity" && selectedDataType === "energy" && (
                              <BenchmarkBadge
                                site={site}
                                kpiKey="EUI"
                                value={kpiValue}
                                baselines={baselines}
                              />
                            )}
                        </div>
                        <button
                          onClick={() => openModal(site)}
                          className="text-sm link text-blue-500 underline"
                        >
                          Statistics
                        </button>
                      </div>

                      {/* tooltip */}
                      {hasMissing && (
                        <Tooltip
                          id={tooltipId}
                          place="left"
                          effect="solid"
                          className="!max-w-sm !p-3 !text-sm !rounded-lg z-50 !shadow-lg !bg-base-200"
                        >
                          <div className="flex flex-col gap-1 text-slate-700">
                            <strong className="mb-1 block">Missing Bills:</strong>
                            <ul className="list-disc list-inside">
                              {Object.entries(site.missingBillsByMonth).map(([account, months]) => (
                                <li key={account}>
                                  <span className="font-medium">{account}:</span>{' '}
                                  {months.map(getMonthAbbreviation).join(', ')}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
      <KpiAnalyticsModal
        site={selectedSite}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default KpiCharts;
