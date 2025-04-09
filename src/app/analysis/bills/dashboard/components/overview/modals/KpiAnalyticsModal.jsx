// components/KpiAnalyticsModal.jsx
'use client'

import { useEffect, useState, useRef } from 'react'
import ReactECharts from 'echarts-for-react'
import useFiltersStore from '@/store/bills/dashboardFiltersStore';
import { KPI_OPTIONS } from '../KpiSelector';

const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const KpiAnalyticsModal = ({ site, isOpen, onClose }) => {
  const { selectedKpi, selectedDataType, selectedYear } = useFiltersStore()
  const [chartData, setChartData] = useState([])
  const modalRef = useRef(null)

  const kpiMeta = KPI_OPTIONS[selectedDataType]?.find(opt => opt.value === selectedKpi)

  // Cerrar al hacer click afuera
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

  useEffect(() => {
    if (!site || !selectedKpi || !selectedDataType || !selectedYear) return

    const kpiHistory = site.kpiHistory?.[selectedYear]
    const prevYearHistory = site.kpiHistory?.[selectedYear - 1]

    if (kpiHistory) {
      const months = Array.from({ length: 12 }, (_, i) => i + 1)
      const data = months.map((month) => {
        const current = kpiHistory?.[month]?.[selectedDataType]?.[selectedKpi]
        const previous = prevYearHistory?.[month]?.[selectedDataType]?.[selectedKpi]
        return {
          month,
          current,
          previous,
        }
      })
      setChartData(data)
    }
  }, [site, selectedKpi, selectedDataType, selectedYear])

  const getChartOptions = () => {
    return {
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          return params
            .map((item) => {
              return `${item.seriesName}: <strong>${item.data?.toFixed(2) ?? ''} ${kpiMeta?.suffix || ''}</strong>`
            })
            .join('<br/>')
        },
      },
      legend: {
        data: [selectedYear.toString(), (selectedYear - 1).toString()],
      },
      xAxis: {
        type: 'category',
        data: monthsShort,
      },
      yAxis: {
        type: 'value',
        name: kpiMeta?.suffix || '',
      },
      series: [
        {
          name: selectedYear.toString(),
          type: 'line',
          smooth: true,
          data: chartData.map((d) => d.current ?? null),
        },
        {
          name: (selectedYear - 1).toString(),
          type: 'line',
          smooth: true,
          lineStyle: {
            type: 'dashed',
          },
          data: chartData.map((d) => d.previous ?? null),
        },
      ],
    }
  }

  // Descargar CSV
  const handleDownloadCSV = () => {

    let csv = `Month,${selectedYear - 1},${selectedYear}\n`

    chartData.forEach((row) => {
      const monthName = monthsShort[row.month - 1] // row.month es 1-based
      const previous = row.previous ?? ''
      const current = row.current ?? ''
      csv += `${monthName},${previous},${current}\n`
    })
  
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `${site.siteName}_${selectedKpi}_KPI_Comparison.csv`)
    link.click()
  }

  return (
    <dialog id="kpi_analytics_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div ref={modalRef} className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-xl mb-2">
          {kpiMeta?.label || selectedKpi} ({selectedYear})
        </h3>
        <p className="text-sm text-gray-500 mb-1">
          Site: <strong>{site.siteName}</strong> — Format: {site.siteFormat}
        </p>

        {kpiMeta?.subtext && (
          <p className="text-sm text-gray-500 mb-4 italic">
            Formula: <code>{kpiMeta.subtext}</code>
          </p>
        )}

        <ReactECharts option={getChartOptions()} style={{ height: 400 }} />

        <div className="modal-action justify-between">
          <button className="btn btn-primary btn-sm" onClick={handleDownloadCSV}>
            Download CSV
          </button>
          <button className="btn btn-sm" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  )
}

export default KpiAnalyticsModal
