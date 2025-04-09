"use client";

import { useEffect, useMemo, useRef } from "react";
import moment from "moment";
import ReactECharts from "echarts-for-react";
import useDashboardStore from "@/store/bills/dashboardStore";

const CardAnalyticsModal = ({
  isOpen,
  onClose,
  valueKey,
  valueLabel,
  valueUnit,
  dataType,
  selectedYear,
}) => {
  const { sitesData } = useDashboardStore();
  const previousYear = selectedYear - 1;
  const modalRef = useRef(null)

  const monthlyBreakdown = useMemo(() => {
    const selected = Number(selectedYear);
    const previous = selected - 1;
  
    const breakdown = {
      [previous]: Array(12).fill(0),
      [selected]: Array(12).fill(0),
    };
  
    sitesData?.forEach((site) => {
      site.accounts?.forEach((account) => {
        const billing = account.billing || {};
  
        Object.entries(billing).forEach(([yearStr, monthsObj]) => {
          const year = Number(yearStr);
          if (year !== selected && year !== previous) return;
  
          Object.entries(monthsObj).forEach(([monthStr, bill]) => {
            const month = Number(monthStr) - 1;
            if (month < 0 || month > 11) return;
  
            let value = 0;
  
            if (valueKey === "energy") {
              value = bill.energy?.total || 0;
            } else if (valueKey === "penalties") {
              value = bill.cost?.penalties || 0;
            } else if (valueKey === "cost") {
              value = bill.cost?.totalEnergyCost || 0;
            } else if (valueKey === "CO2") {
              value = (bill.energy?.total || 0) * 0.35 / 1000;
            } else {
              value = bill?.[dataType]?.[valueKey] || 0;
            }
  
            breakdown[year][month] += value;
          });
        });
      });
    });
  
    return breakdown;
  }, [sitesData, valueKey, dataType, valueLabel, selectedYear]);
  
  

  const chartOptions = useMemo(() => ({
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const lines = params.map((item) => {
          return `${item.seriesName}: ${Number(item.data).toFixed(2)} ${valueUnit}`;
        });
        return `${params[0].axisValue}<br/>${lines.join("<br/>")}`;
      },
    },
    legend: {
      data: [String(selectedYear), String(previousYear)],
      top: 10,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "8%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: moment.monthsShort(),
    },
    yAxis: {
      type: "value",
      name: valueUnit,
    },
    series: [
      {
        name: String(selectedYear),
        type: "line",
        smooth: true,
        data: monthlyBreakdown[selectedYear],
        lineStyle: { color: "#3b82f6" },
        areaStyle: { color: "#3b82f655" },
      },
      {
        name: String(previousYear),
        type: "line",
        smooth: true,
        data: monthlyBreakdown[previousYear],
        lineStyle: { color: "#94a3b8" },
        areaStyle: { color: "#94a3b844" },
      },
    ],
  }), [monthlyBreakdown, valueUnit, selectedYear]);

  const downloadCSV = (data, valueLabel, valueUnit) => {
    const [prevYear, currYear] = Object.keys(data);
    const headers = ["Month", parseInt(prevYear), parseInt(currYear)];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  
    const rows = months.map((monthName, index) => {
      const prev = data[prevYear][index] || 0;
      const curr = data[currYear][index] || 0;
      return [monthName, prev.toFixed(0), curr.toFixed(0)];
    });
  
    const csvContent =
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `${valueLabel.replaceAll(" ", "_")}_Analytics.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  
  if (!isOpen) return null;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div ref={modalRef} className="modal-box max-w-5xl">
        <h3 className="font-bold text-lg mb-4 text-primary">
          {valueLabel} by month ({valueUnit})
        </h3>
        <ReactECharts option={chartOptions} style={{ height: "400px" }} />
        <div className="modal-action flex justify-between mt-4">
          <button className="btn btn-primary btn-sm" onClick={() => downloadCSV(monthlyBreakdown, valueLabel, valueUnit)}>
            Download CSV
          </button>
          <button onClick={onClose} className="btn  btn-sm">
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default CardAnalyticsModal;
