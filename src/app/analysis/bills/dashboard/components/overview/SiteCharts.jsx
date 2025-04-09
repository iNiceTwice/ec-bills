'use client';
import { FaTriangleExclamation } from "react-icons/fa6";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const getRelativeWidth = (value, max) => `${(value / max) * 100}%`;
const getPartPercentage = (value, total) =>
  `${((value / total) * 100).toFixed(2)}%`;

const getMonthAbbreviation = (monthNumber) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months[monthNumber - 1] || '';
};

const SiteItem = ({ site, maxValue, dataType }) => {
    const { siteID, siteName, totals, missingBillsByMonth } = site;
    const { subtotal, totalDemandCost, others } = totals.cost;
    const energy = subtotal - totalDemandCost - others;
    const tooltipId = `tooltip-${siteID}`;
    const hasMissing = Object.keys(missingBillsByMonth).length > 0;
  
    const energyValue = totals.energy?.value ?? 0;
  
    return (
      <div
        className="flex flex-col gap-1 py-2 cursor-pointer"
        data-tooltip-id={tooltipId}
      >
        <div className="flex justify-between text-sm font-semibold text-slate-800">
          <span className="flex items-center gap-1">
            {hasMissing && <FaTriangleExclamation className="text-warning" />}
            {siteName}
          </span>
          <span>
            S/
            {dataType === "energy"
              ? energyValue.toLocaleString()
              : subtotal.toLocaleString()}
          </span>
        </div>
  
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden relative">
          <div
            className="absolute h-full rounded bg-gray-300"
            style={{
              width: getRelativeWidth(
                dataType === "energy" ? energyValue : subtotal,
                maxValue
              ),
            }}
          >
            {dataType === "cost" ? (
              <>
                <div
                  className="h-full float-left bg-[#715AFF]"
                  style={{ width: getPartPercentage(energy, subtotal) }}
                />
                <div
                  className="h-full float-left bg-neutral"
                  style={{
                    width: getPartPercentage(totalDemandCost, subtotal),
                  }}
                />
                <div
                  className="h-full float-left bg-accent"
                  style={{ width: getPartPercentage(others, subtotal) }}
                />
              </>
            ) : (
              <div
                className="h-full bg-[#715AFF]"
                style={{ width: "100%" }}
              />
            )}
          </div>
        </div>
  
        <Tooltip
          id={tooltipId}
          place="right"
          effect="solid"
          className="!max-w-sm !p-3 !text-sm !rounded-lg z-50 !ml-4 !shadow-lg !bg-base-200"
        >
          <div className="flex flex-col gap-2 text-slate-700">
            <div className="font-semibold w-full text-center mb-2 bg-base-300 text-slate-700">
              {siteName}
            </div>
  
            {dataType === "cost" ? (
              <>
                <div className="flex gap-2 items-center">
                  <span className="status bg-[#715AFF]"></span>
                  <strong className="font-semibold">Electric Energy:</strong> S/
                  {energy.toFixed(2)}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="status status-neutral"></span>
                  <strong className="font-semibold">Demand:</strong> S/
                  {totalDemandCost.toFixed(2)}
                </div>
                <div className="flex gap-2 items-center">
                  <span className="status status-accent"></span>
                  <strong className="font-semibold">Others:</strong> S/
                  {others.toFixed(2)}
                </div>
              </>
            ) : (
              <div className="flex gap-2 items-center">
                <span className="status bg-[#715AFF]"></span>
                <strong className="font-semibold">Energy:</strong> S/
                {energyValue.toFixed(2)}
              </div>
            )}
  
            {hasMissing && (
              <div className="pt-2 border-t-2 border-t-slate-600/20">
                <strong className="flex items-center gap-2"><FaTriangleExclamation className="text-warning" /> Missing Bills ({Object.entries(missingBillsByMonth).length}):</strong>
                <ul className="list-disc list-inside mt-1">
                  {Object.entries(missingBillsByMonth).map(
                    ([account, months]) => (
                      <li key={account}>
                        <span className="font-medium">{account}:</span>{" "}
                        {months.map(getMonthAbbreviation).join(", ")}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </Tooltip>
      </div>
    );
  };
  
  const SiteCharts = ({ chartsData, dataType }) => {
    const sortedData = [...chartsData].sort((a, b) => {
      const aVal =
        dataType === "energy"
          ? a.totals.energy?.value ?? 0
          : a.totals.cost.subtotal;
      const bVal =
        dataType === "energy"
          ? b.totals.energy?.value ?? 0
          : b.totals.cost.subtotal;
      return bVal - aVal;
    });
  
    const maxValue =
      dataType === "energy"
        ? sortedData[0]?.totals.energy?.value ?? 1
        : sortedData[0]?.totals.cost.subtotal ?? 1;
  
    return (
      <div className="px-6 mt-8 w-full bg-white rounded-lg">
        <div className="text-xs font-semibold flex gap-4 text-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="status bg-[#715AFF]"></span>
            <span className="">
              {dataType === "energy" ? "Electric Energy" : "Electric Energy"}
            </span>
          </div>
          {dataType === "cost" && (
            <>
              <div className="flex items-center gap-2">
                <span className="status status-neutral"></span>
                <span className="">Demand</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="status status-accent"></span>
                <span className="">Others</span>
              </div>
            </>
          )}
        </div>
        {sortedData.map((site) => (
          <SiteItem
            key={site.siteID}
            site={site}
            maxValue={maxValue}
            dataType={dataType}
          />
        ))}
      </div>
    );
  };

export default SiteCharts;
