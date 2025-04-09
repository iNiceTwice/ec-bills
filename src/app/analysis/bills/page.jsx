"use client"

import Heading from "./components/Heading";
import SitesList from "./components/SitesList";
import UploadZone from "./components/UploadZone";


const BillsSection = () => {
    return ( 
        <>
            <Heading/>
            <div className="mt-2 w-full gap-2">
            {/* <!-- name of each tab group should be unique --> */}
                <div className="tabs tabs-box shadow-none bg-base-300">
                    <input type="radio" name="my_tabs_2" className="tab mb-1" defaultChecked aria-label="Upload your bills" />
                    <div className="tab-content">
                        <UploadZone/>
                    </div>

                    <input type="radio" name="my_tabs_2" className="tab mb-1" aria-label="Configure your sites" />
                    <div className="tab-content ">
                        <SitesList/>
                    </div>

                    <input type="radio" name="my_tabs_2" className="tab mb-1" aria-label="Tab 3" />
                    <div className="tab-content ">Tab content 3</div>
                </div>
          
            </div>
        </>
    );
}
 
export default BillsSection;