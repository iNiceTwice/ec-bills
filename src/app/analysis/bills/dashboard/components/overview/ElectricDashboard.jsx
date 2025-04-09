"use client"

import { LuChevronRight, LuOctagonAlert, LuCircleUser, LuBuilding, LuLeaf } from "react-icons/lu";
import { BsFillLightningChargeFill } from "react-icons/bs";
import useDashboardStore from "@/store/bills/dashboardStore";
import useFiltersStore from "@/store/bills/dashboardFiltersStore";
import SitesCharts from "./SiteCharts";
import KpiSelector from "./KpiSelector";
import KPIViewer from "./KpiViewer";
import CardAnalyticsModal from "./modals/CardAnalyticsModal"
import { useState } from "react";

const CO2 = 0.35

const ElectricDashboard = () => {

    const { chartsData, sitesData } = useDashboardStore();
    const { selectedDataType, selectedYear } = useFiltersStore()
    console.log("sitesDATA", sitesData)
    return ( 
        <div className="w-full grid grid-cols-12 mt-16 gap-6">
            <LeftSide chartsData={chartsData} selectedYear={selectedYear} dataType={selectedDataType}/>
            <RightSide chartsData={chartsData} dataType={selectedDataType} />
        </div> 
    );
}

const LeftSide = ({ chartsData, dataType, selectedYear }) => {

    const [modalInfo, setModalInfo] = useState(null);

    const openCardModal = (key, label, unit, dataType) => {
        setModalInfo({
          key,
          label,
          unit,
          dataType,
        });
      };
      
      const closeCardModal = () => {
        setModalInfo(null);
      };
    console.log(chartsData)

    let totals = {
        cost:{
            subtotal:0,
            totalEnergyCost:0,
            totalDemandCost:0,
            penalties: 0,
            others:0,
        },
        energy:{
            value:0,
        },
        demand:{
            value:0,
        },
        accounts: 0,
        sites: chartsData.length
    }
    
    chartsData?.forEach(site => {
        totals = {
            cost:{
                subtotal: totals.cost.subtotal + site.totals.cost.subtotal,
                totalEnergyCost: totals.cost.totalEnergyCost + site.totals.cost.totalEnergyCost,
                totalDemandCost: totals.cost.totalDemandCost + site.totals.totalDemandCost,
                penalties:  totals.cost.penalties + site.totals.cost.penalties,
                others: totals.cost.others + site.totals.cost.others,
            },
            energy:{
                value: totals.energy.value + site.totals.energy.value,
            },
            demand:{
                value: totals.demand.value + site.totals.demand.value,
            },               
            accounts: totals.accounts + site.totals.accounts,
            sites: totals.sites
        }
    })

    return (
        <div className="col-span-6">
            <h2 className="text-primary font-normal text-lg w-full">You have <strong> spent </strong> in the following manner:</h2>
            <div className="divider mt-1 w-3/4"></div>
            <div className="grid grid-cols-2 gap-6">

                {/* CARDS */}
                {
                    dataType === "cost" && 
                    <>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-figure text-neutral text-4xl">
                                    <BsFillLightningChargeFill/>
                                </div>
                                <div className="stat-title font-semibold">Total Energy cost</div>
                                <div className="stat-value text-neutral">PEN S/{ (totals.cost.subtotal).toFixed(0) }</div>
                                <a
                                    className="text-primary link flex items-center gap-1"
                                    onClick={() => openCardModal("cost", "Total Energy Cost", "PEN S/", "cost")}
                                    >
                                    Statistics <LuChevronRight/>
                                </a>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-figure text-error text-4xl">
                                    <LuOctagonAlert/>
                                </div>
                                <div className="stat-title font-semibold">Penalties detected</div>
                                <div className="stat-value text-error">PEN S/{ (totals.cost.penalties).toFixed(0) }</div>
                                <a
                                    className="text-primary link flex items-center gap-1"
                                    onClick={() => openCardModal("penalties", "Penalties Detected", "PEN S/", "cost")}
                                    >
                                    Statistics <LuChevronRight/>
                                </a>
                            </div>
                        </div>
                    </>
                }
                {
                    dataType === "energy" && 
                    <>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-figure text-neutral text-4xl">
                                    <BsFillLightningChargeFill/>
                                </div>
                                <div className="stat-title font-semibold">Total Energy cost</div>
                                <div className="stat-value text-neutral">{ (totals.energy.value).toFixed(0) } kWh</div>
                                <a
                                    className="text-primary link flex items-center gap-1"
                                    onClick={() => openCardModal("energy", "Total Energy Consumption", "kWh", "energy")}
                                    >
                                    Statistics <LuChevronRight/>
                                </a>
                            </div>
                        </div>
                        <div className="stats shadow bg-base-100">
                            <div className="stat">
                                <div className="stat-figure text-success text-4xl">
                                    <LuLeaf/>
                                </div>
                                <div className="stat-title font-semibold">You have emitted CO₂</div>
                                <div className="stat-value text-success">{ ((totals.energy.value * CO2) / 1000).toFixed(0) } tonCO₂</div>
                                <a
                                    className="text-primary link flex items-center gap-1"
                                    onClick={() => openCardModal("CO2", "CO₂ Emissions", "tonCO₂", "energy")}
                                    >
                                    Statistics <LuChevronRight/>
                                </a>
                            </div>
                        </div>
                    </>
                }
            </div>

            {/* SITES COUNTERS */}

            <div className="rounded-box justify-around flex bg-base-100 shadow p-4 mt-6 text-xl text-slate-700">
                <div className="flex gap-2 items-center w-full justify-center">
                    <LuCircleUser className="text-primary"/>
                    <h2 className="font-semibold">{ totals.accounts } Accounts</h2>
                </div>
                <div className="divider divider-horizontal"></div>
                <div className="flex gap-2 items-center w-full justify-center">
                    <LuBuilding className="text-success"/>
                    <h2 className="font-semibold">{totals.sites} Sites</h2>
                </div>
            </div>

            {/* SITES CHARTS */}
            
            <div className="rounded-box bg-base-100 overflow-hidden shadow mt-6 grid grid-cols-12 w-full">
                <div className="col-span-5 bg-base-200"></div>
                <div className="col-span-7 h-[40rem] overflow-auto">
                    <SitesCharts chartsData={chartsData} dataType={dataType} />
                </div>
            </div>
            {modalInfo && (
                <CardAnalyticsModal
                    isOpen={!!modalInfo}
                    onClose={closeCardModal}
                    valueKey={modalInfo.key}
                    valueLabel={modalInfo.label}
                    valueUnit={modalInfo.unit}
                    dataType={modalInfo.dataType}
                    selectedYear={selectedYear}
                />
            )}
        </div>
    )
}

const RightSide = ({ chartsData, dataType }) => {
    return (
        <div className="col-span-6">
            <div className="grid grid-cols-2">
                <div className="">
                    <h2 className="text-primary font-normal text-lg w-full"><strong> Streamline </strong> your bills with these KPIs:</h2>
                    <div className="divider mt-1 w-full"></div>
                </div>
                <div className="">
                    <KpiSelector />
                </div>
            </div>
            <KPIViewer chartsData={chartsData}/>
        </div>
    )
}
 
export default ElectricDashboard;