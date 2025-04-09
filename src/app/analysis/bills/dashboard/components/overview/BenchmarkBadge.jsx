import getBenchmarkBadge from "../../utils/getBenchmarkBadge"
import { Tooltip } from "react-tooltip";
import { LuInfo } from "react-icons/lu";
import 'react-tooltip/dist/react-tooltip.css';

const BenchmarkBadge = ({ site, kpiKey, value, baselines }) => {
  const benchmark = getBenchmarkBadge(site, kpiKey, value, baselines);

  if (!benchmark) return null;
  console.log(benchmark)
  const tooltipId = `${site.siteID}`;
  const badgeClassName = `badge cursor-pointer ${benchmark.badgeColor}`
  return (
    <>
      <div
        data-tooltip-id={tooltipId}
        data-tooltip-html={benchmark.tooltipContent}
        className={badgeClassName}
      >
        {benchmark.category} <LuInfo className="text-white"/>
      </div>
      <Tooltip 
        id={tooltipId} 
        place="top" 
        effect="solid"
        className="!max-w-sm !p-3 !text-sm !rounded-lg z-50 !ml-4 !shadow-lg !bg-base-200 !text-slate-700" />
    </>
  );
}

export default BenchmarkBadge