"use client";

import useDashboardStore from "@/store/bills/dashboardStore";
import OverviewDashboard from "./components/overview/OverviewDashboard";
import sitesDataFormater from "./utils/sitesDataFormater";
import { useEffect } from "react";
import FinancialDashboard from "./components/financial/FinancialDashboard";


const Dashboard = () => {
    const { setSitesData } = useDashboardStore()

    useEffect(() => {
        const sitesData = sitesDataFormater();
        setSitesData(sitesData);
    }, []);

    return ( 
        <div className="tabs tabs-box justify-center bg-base-300 shadow-none tabs-lg">
            <input type="radio" name="my_tabs_6" className="tab font-semibold text-slate-700" aria-label="Overview" defaultChecked/>
            <div className="tab-content bg-base-300 border-base-300 p-6">
                <OverviewDashboard/>
            </div>
        
            <input type="radio" name="my_tabs_6" className="tab font-semibold text-slate-700" aria-label="Financial Insights"  />
            <div className="tab-content bg-base-300 border-base-300 p-6">
                <FinancialDashboard/>
            </div>
        
            <input type="radio" name="my_tabs_6" className="tab font-semibold text-slate-700" aria-label="Energy Savings" />
            <div className="tab-content bg-base-300 border-base-300 p-6"></div>
        </div>
    );
}
 
export default Dashboard;