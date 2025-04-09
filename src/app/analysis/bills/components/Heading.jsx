import Link from "next/link";
import { LuChartPie, LuDownload } from "react-icons/lu";

const Heading = () => {
    return ( 
        <div className="mb-8">
            <div className="breadcrumbs text-sm">
                <ul>
                    <li><a>Analysis</a></li>
                    <li><a>EC.BILLS<b className="text-accent">AI</b></a></li>
                </ul>
            </div>
            <div className="shadow-sm rounded-box bg-base-100 w-full px-6 py-6 flex justify-between">
                <b className="text-2xl text-neutral-800">Bill Management System</b>
                <div className="flex gap-2">
                    <button className="btn"><LuDownload/> Download Bills Data</button>
                    <Link href="/analysis/bills/dashboard" className="btn btn-neutral"><LuChartPie/> View Dashboard</Link>
                </div>
            </div>
        </div>
    );
}
 
export default Heading;