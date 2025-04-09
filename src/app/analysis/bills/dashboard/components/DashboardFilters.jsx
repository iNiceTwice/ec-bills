"use client"

import { useEffect } from 'react';
import useFiltersStore from '@/store/bills/dashboardFiltersStore';
import useDashboardStore from '@/store/bills/dashboardStore';
import filterAndCalculateSitesData from '../utils/filteringData';

const DashboardFilters = ({ className }) => {
    const {
        selectedDataType,
        selectedYear,
        selectedFormat,
        selectedSites,
        selectedMonths,
        setDataType,
        setYear,
        setFormat,
        setSites,
        setMonths
    } = useFiltersStore();

    const { sitesData, setChartsData } = useDashboardStore();
    
    const availableSites = sitesData?.map(site => ({
        id: site.siteID,
        name: site.siteName,
    }));
    
    const availableFormats = Array.from(
        new Set(sitesData?.map(site => site.siteFormat || ''))
    );

    useEffect(() => {
        if (sitesData.length === 0 || !selectedYear) return;
        console.log(selectedYear)
        const charts = filterAndCalculateSitesData(sitesData, {
            selectedYear,
            selectedFormat,
            selectedSites,
            selectedMonths,
        });

        setChartsData(charts);
    }, [sitesData, selectedYear, selectedFormat, selectedSites, selectedMonths, setChartsData]);

    return ( 
        <div className={`${className} grid grid-cols-4 gap-4`}>
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Filter by Data type</legend>
                <select value={selectedDataType} onChange={(e) => setDataType(e.target.value)} className="select cursor-pointer w-full">
                    <option value="cost">Cost</option>
                    <option value="energy">Energy</option>
                    <option value="demand" disabled>Demand</option>
                </select>
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Filter by Period</legend>
                <div className="grid grid-cols-6 gap-2">
                    <select disabled value={selectedMonths} onChange={(e) => setMonths(e.target.value)} className="select cursor-pointer col-span-4">
                    <option value="all">All year</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select>
                    <select value={selectedYear} onChange={(e) => setYear(e.target.value)} className="select cursor-pointer col-span-2">
                        <option key="2025" value="2025">2025</option>
                        <option key="2024" value="2024">2024</option>
                        <option key="2023" value="2023">2023</option>
                        <option key="2022" value="2022">2022</option>
                        <option key="2021" value="2021">2021</option>
                    </select>
                </div>
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Filter by Sites</legend>
                <select value={selectedSites} onChange={(e) => setSites(e.target.value)} className="select cursor-pointer w-full">
                    <option value="all">All Sites</option>
                    {availableSites.map(site => (
                        <option key={site.id} value={site.id}>{site.name}</option>
                    ))}
                </select>
            </fieldset>
            
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-slate-700">Filter by Format</legend>
                <select value={selectedFormat} onChange={(e) => setFormat(e.target.value)} className="select cursor-pointer w-full">
                    <option value="all">All Formats</option>
                    {availableFormats.map(format => (
                        <option key={format} value={format}>{format}</option>
                    ))}
                </select>
            </fieldset>
        </div>
    );
}
 
export default DashboardFilters;