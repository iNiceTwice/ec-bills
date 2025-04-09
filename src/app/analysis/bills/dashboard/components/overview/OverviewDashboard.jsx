"use client"

import ElectricDashboard from "./ElectricDashboard";
import DashboardFilters from "../DashboardFilters";
import useDashboardStore from "@/store/bills/dashboardStore";

const OverviewDashboard = () => {

    const { energyType } = useDashboardStore()

    return ( 
        <div>
            <div className="card w-full py-4 px-6 text-slate-700 bg-base-100 rounded-box shadow">
                <div className="card-title text-2xl mb-2">Overview</div>
                <div className="">Explore charts and insights that help you understand and optimize your resource consumption.</div>
            </div>
            <DashboardFilters className="mt-6"/>
            { energyType === "electric" && <ElectricDashboard/>}
            
        </div>
    );
}
 
export default OverviewDashboard;