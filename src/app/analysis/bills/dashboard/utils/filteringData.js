const filterAndCalculateSitesData = (formattedData, filters) => {
    const {
        selectedYear,
        selectedFormat,
        selectedSites,
        selectedMonths,
    } = filters;

    const previousYear = (parseInt(selectedYear) - 1).toString();

    let filteredSites = formattedData.filter(site =>
        (selectedSites === "all" || selectedSites.includes(site.siteID)) &&
        (selectedFormat === "all" || site.siteFormat === selectedFormat)
    );

    return filteredSites.map(site => {

        let siteTotals = {
            siteID: site.siteID,
            siteName: site.siteName,
            siteArea: site.siteArea,
            siteFormat: site.siteFormat,
            siteCategory: site.siteCategory,
            siteSubcategory: site.siteSubcategory,
            totals: {
                cost: {
                    subtotal: 0,
                    totalDemandCost: 0,
                    penalties: 0,
                    others: 0,
                    daily: 0,
                },
                energy: {
                    value: 0,
                },
                demand: {
                    value: 0,
                },
                accounts: site.accounts.length,
            },
            contractedDemand: 0,
            kpi: {
                cost: {
                    avgDailyCost: 0,
                    dailyIntensity: 0,
                    blendedRate: 0,
                },
                energy: {
                    intensity: 0,
                    dailyIntensity: 0,
                    dailyArea: 0,
                    dailySales: 0,
                },
                demand: {
                    usageRatio: 0,
                },
            },
            missingBillsByMonth: {},
            kpiHistory: {
                [selectedYear]: {},
                [previousYear]: {},
            },
        };

        site.accounts.forEach(account => {
            
            const yearData = account.billing[selectedYear];
            const prevYearData = account.billing[previousYear];

            let monthCounter = 0;
            let monthsToFilter = selectedMonths === "all" ? [...Array(12).keys()].map(m => m + 1) : selectedMonths;

            console.log(yearData)
            monthsToFilter.forEach(month => {
                // --- Año actual ---
                const monthData = yearData?.[month];
                //console.log(monthData)
                if (monthData) {
                    monthCounter++;

                    siteTotals.totals.cost.subtotal += monthData.cost?.subtotal || 0;
                    siteTotals.totals.cost.totalEnergyCost += monthData?.cost.totalEnergyCost || 0;
                    siteTotals.totals.cost.totalDemandCost += monthData?.cost.totalDemandCost || 0;
                    siteTotals.totals.cost.penalties += monthData.cost?.penalties || 0;
                    siteTotals.totals.cost.others += (monthData.cost?.subtotal - (monthData.cost?.totalEnergyCost + monthData.cost.totalDemandCost)) || 0;

                    siteTotals.totals.energy.value += monthData.energy?.total || 0;
                    siteTotals.totals.demand.value += monthData.demand?.max || 0;

                    siteTotals.kpi.cost.avgDailyCost += monthData.cost?.daily || 0;
                    siteTotals.kpi.cost.dailyIntensity += monthData.cost?.daily || 0;

                    siteTotals.kpi.energy.intensity += monthData.energy?.total / monthData.billingPeriod || 0;
                    siteTotals.kpi.energy.dailyIntensity += monthData.energy?.daily || 0;
                    siteTotals.kpi.energy.dailyArea += monthData.cost?.daily || 0;

                    siteTotals.kpi.demand.usageRatio += (monthData.demand?.max / (yearData.contractedDemand || 1)) * 100 || 0;

                    siteTotals.kpiHistory[selectedYear][month] = {
                        cost: {
                            avgDailyCost: monthData.cost?.daily || 0,
                            dailyIntensity: monthData.cost?.daily || 0,
                            blendedRate: monthData.energy?.daily
                                ? (monthData.cost?.daily || 0) / monthData.energy.daily
                                : 0,
                        },
                        energy: {
                            intensity: monthData.energy?.total / monthData.billingPeriod || 0,
                            dailyIntensity: monthData.energy?.daily || 0,
                            dailyArea: monthData.cost?.daily || 0,
                        },
                        demand: {
                            usageRatio: (monthData.demand?.max / (yearData.contractedDemand || 1)) * 100 || 0,
                        },
                    };
                } else {
                    if (!siteTotals.missingBillsByMonth[account.accountNumber]) {
                        siteTotals.missingBillsByMonth[account.accountNumber] = [month];
                    } else {
                        siteTotals.missingBillsByMonth[account.accountNumber].push(month);
                    }
                }

                // --- Año anterior ---
                const prevMonthData = prevYearData?.[month];
                if (prevMonthData) {
                    siteTotals.kpiHistory[previousYear][month] = {
                        cost: {
                            avgDailyCost: prevMonthData.cost?.daily || 0,
                            dailyIntensity: prevMonthData.cost?.daily || 0,
                            blendedRate: prevMonthData.energy?.daily
                                ? (prevMonthData.cost?.daily || 0) / prevMonthData.energy.daily
                                : 0,
                        },
                        energy: {
                            intensity: prevMonthData.energy?.total / prevMonthData.billingPeriod || 0,
                            dailyIntensity: prevMonthData.energy?.daily || 0,
                            dailyArea: prevMonthData.cost?.daily || 0,
                        },
                        demand: {
                            usageRatio: (prevMonthData.demand?.max / (prevYearData.contractedDemand || 1)) * 100 || 0,
                        },
                    };
                }
            });

            siteTotals.contractedDemand += (yearData?.contractedDemand || 0) * monthCounter;

            // Ajustes finales KPIs
            siteTotals.kpi.energy.intensity = (siteTotals.kpi.energy.intensity * 365) / site.siteArea;
            siteTotals.kpi.energy.dailyIntensity /= site.siteArea;
            siteTotals.kpi.energy.dailyArea /= site.siteArea;

            siteTotals.kpi.cost.dailyIntensity /= site.siteArea;
            siteTotals.kpi.cost.electricDailyArea = siteTotals.kpi.energy.dailyArea; // si necesitás esta propiedad
            siteTotals.kpi.cost.blendedRate =
                siteTotals.kpi.energy.dailyIntensity < 1
                    ? 0
                    : siteTotals.kpi.energy.dailyArea / siteTotals.kpi.energy.dailyIntensity;
        });

        return siteTotals;
    });
};

export default filterAndCalculateSitesData;
