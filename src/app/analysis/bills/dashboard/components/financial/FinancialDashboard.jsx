import React from "react";
import ReactECharts from "echarts-for-react";
import PredictionChart from "./PredictionChart";
import DashboardFilters from "../DashboardFilters";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import BarChartDashboard from "./BarChartDashboard";

const FinancialDashboard = () => {

  return (
    <div>
        <div className="card w-full py-4 px-6 text-slate-700 bg-base-100 rounded-box shadow">
            <div className="card-title text-2xl mb-2">Financial Insights</div>
            <div className="">Get a clear view of your utility spending with detailed financial insights. Track trends, identify saving opportunities, and make data-driven decisions to optimize your expenses.</div>
        </div>

        <DashboardFilters className="mt-6"/>

        <div className="w-full grid grid-cols-2 mt-16 gap-6">
            <div className="grid grid-cols-2 gap-2">
                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Total budget</div>
                        <div className="stat-value text-slate-800">S/ 5,808,970</div>
                        <progress className="progress progress-neutral w-90" value="80" max="100"></progress>
                        <div className="stat-desc">S/ 4,3567,275 spent (80%)</div>
                    </div>
                </div>

                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Annual comparison - vs 2023</div>
                        <div className="stat-value flex items-center gap-2 text-slate-800"><LuArrowUp className=""/> 0.4%</div>
                        <div className="stat-desc">S/ 18,012 more than the previous year</div>
                    </div>
                </div>
            </div>

            { /*  -----------------------------------  */}
            <div className="grid grid-cols-3 gap-2">
                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Energy Charges</div>
                        <div className="stat-value text-primary">S/ 2,391,084 </div>
                        {/* <div className="stat-desc flex items-center gap-2"> <LuArrowUp className=""/> 89%</div> */}
                    </div>
                </div>

                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Demand Charges</div>
                        <div className="stat-value text-success">S/ 2,058,055 </div>
                        {/* <div className="stat-desc flex items-center gap-2"> <LuArrowUp className=""/> 89%</div> */}
                    </div>
                </div>

                <div className="stats bg-base-100 shadow">
                    <div className="stat">
                        <div className="stat-title">Other Charges</div>
                        <div className="stat-value text-warning">S/ 198,039</div>
                        {/* <div className="stat-desc flex items-center gap-2"> <LuArrowDown className=""/> 89%</div> */}
                    </div>
                </div>
            </div>
        </div> 
        
        <div className="grid grid-cols-2 gap-2 mt-12">
            <div className="h-[30rem] rounded-box shadow bg-base-100 p-4">
                <PredictionChart />
            </div>
            <div className="h-[30rem] rounded-box shadow bg-base-100 p-4 flex">
                <div className="p-4 text-slate-700 flex-col justify-between">
                    <div className="flex flex-col">
                        <strong>S/ 4,647,179.85</strong>
                        <small>Total Electric Cost</small>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col">
                        <strong>S/ 387,264.99</strong>
                        <small>Monthly Electric Cost</small>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col">
                        <strong>S/ 12,908.83</strong>
                        <small>Daily Electric Cost</small>
                    </div>
                    <div className="divider"></div>
                    <div className="flex flex-col">
                        <strong>45%</strong>
                        <small>Coefficient of Variation</small>
                    </div>
                </div>
                <BarChartDashboard/>
            </div>
        </div>

        <div className="w-full h-30 p-4 px-6 rounded-box mt-6 bg-base-100">
            <h3 className="font-bold text-xl text-slate-800">EC.GAIA Insights</h3>
            <div className="p-4 px-6 items-center justify-center w-full">
                    <a href="/PRIMAX Financial Insights.pdf" download className="btn btn-block">View Full Report</a>
            </div>
        </div>
    </div>
  )
}

export default FinancialDashboard