"use client"

import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { LuChevronRight } from "react-icons/lu";

const data = [
  {
    name: "Jan-24",
    energyCharges: 110927.13,
    demandCharges: 75945.01,
    otherCharges: 20586.01,
  },
  {
    name: "Feb-24",
    energyCharges: 286789.33,
    demandCharges: 228094.33,
    otherCharges: 32944.56,
  },
  {
    name: "Mar-24",
    energyCharges: 288420.76,
    demandCharges: 237034.54,
    otherCharges: 28866.88,
  },
  {
    name: "Apr-24",
    energyCharges: 230583.01,
    demandCharges: 187550.25,
    otherCharges: 10643.99,
  },
  {
    name: "May-24",
    energyCharges: 225806.89,
    demandCharges: 217458.29,
    otherCharges: 8278.62,
  },
  {
    name: "Jun-24",
    energyCharges: 253897.00,
    demandCharges: 225639.71,
    otherCharges: 26323.92,
  },
  {
    name: "Jul-24",
    energyCharges: 220416.32,
    demandCharges: 188889.17,
    otherCharges: 11185.21,
  },
  {
    name: "Aug-24",
    energyCharges: 255348.02,
    demandCharges: 221921.79,
    otherCharges: 23335.01,
  },
  {
    name: "Sep-24",
    energyCharges: 214955.00,
    demandCharges: 206844.12,
    otherCharges: 9995.13,
  },
  {
    name: "Oct-24",
    energyCharges: 148080.78,
    demandCharges: 133540.57,
    otherCharges: 12793.66,
  },
  {
    name: "Nov-24",
    energyCharges: 81206.56,
    demandCharges: 60237.01,
    otherCharges: 15592.18,
  },
  {
    name: "Dec-24",
    energyCharges: 222734.89,
    demandCharges: 208441.25,
    otherCharges: 10287.96,
  }
]

const BarChartDashboard = () => {

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">

      <div className="h-[400px] w-full">
        <ResponsiveContainer>
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" hide />
              <YAxis yAxisId="right" orientation="right" domain={[0, 2500]} ticks={[0, 500, 1000, 1500, 2000, 2500]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="right" dataKey="energyCharges" name="Energy charges" stackId="a" fill="#3B82F6" />
              <Bar yAxisId="right" dataKey="demandCharges" name="Demand charges" stackId="a" fill="#4ADE80" />
              <Bar yAxisId="right" dataKey="otherCharges" name="Other charges" stackId="a" fill="#FB923C" />
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartDashboard