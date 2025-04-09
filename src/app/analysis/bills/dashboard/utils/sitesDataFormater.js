import sitesData from "./sitesData";
import moment from "moment";

const formatSitesData = () => {
    let formattedData = [];

    sitesData.sitesFacturas.forEach((site) => {
        let siteData = {
            siteID: site.id,
            siteName: site.Site_Name,
            siteArea: site.Site_Area,
            siteHvacUnits: site.Site_HVAC_Units || 0,
            siteWalkInRUnits: site.Site_Walk_In_Refrigeration_Units || 0,
            siteReachInRUnits: site.Site_Reach_In_Refrigeration_Units || 0,
            siteFormat: site.Site_Format,
            siteCategory: site.Site_Category || null,
            siteSubcategory: site.Site_Subcategory || null,
            longitude: site.Site_Longitude,
            latitude: site.Site_Latitude,
            accounts: [],
            bills: []
        };

        site.facturasNroCliente.forEach(account => {
            let accountData = {
                accountNumber: account.numeroCliente,
                billing: {}
            };

            account.facturaDatos.forEach((bill) => {
                let billDate = moment(bill.Date_Final);
                let year = billDate.year();
                let month = billDate.month() + 1;

                siteData.bills.push(bill);
                let monthData = {
                    cost: {
                        subtotal: bill.Subtotal_Electric_Cost || 0,
                        totalEnergyCost: bill.Energy_Cost_Total || 0,
                        penalties: bill.Total_Penalties || 0,
                        pastDue: bill.Past_Due || 0,
                        daily: bill.Total_Electric_Cost_Daily || 0,
                        totalDemandCost: bill.Demand_Cost_Total || 0,
                    },
                    energy: {
                        total: bill.Energy_Total || 0,
                        daily: parseFloat(bill.Energy_Total_Daily) || 0,
                    },
                    demand: {
                        max: bill.Demand_Max || 0,
                        contracted: parseFloat(bill.Demand_Contract) || 0,
                    },
                    tariff: bill.Tariff,
                    utility: bill.Utility,
                    billingPeriod: bill.Billing_Period,
                    sales: bill.Total_Sales || 0,
                };

                accountData.billing[year] = accountData.billing[year] || {
                    contractedDemand: monthData.demand.contracted
                };
                
                accountData.billing[year][month] = monthData;
                accountData.billing[year].contractedDemand = Math.max(
                    accountData.billing[year].contractedDemand,
                    monthData.demand.contracted
                );
            });
            
            siteData.accounts.push(accountData);
        });

        formattedData.push(siteData);
    });
    
    return formattedData;
};


export default formatSitesData