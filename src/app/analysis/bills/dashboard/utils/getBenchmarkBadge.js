
const getBenchmarkBadge = (site, kpiKey, value, baselines) => {
  
  const selectedBaseline = baselines.find(
    (item) =>
      item.Site_Category === site.siteCategory &&
      item.Site_Subcategory === site.siteSubcategory
  );
  const selectedBaselineValue = selectedBaseline?.Site_Baselines?.[kpiKey];
  
  if (!selectedBaselineValue) return null;
  const benchmark = 1 - (value / selectedBaselineValue);
  
  let category = "", badgeColor = "";

  if (benchmark <= -0.30) {
    category = "Terrible"; badgeColor = "badge-error text-white"
  } else if (benchmark > -0.30 && benchmark < -0.10) {
      category = "Bad"; badgeColor = "badge-warning text-white"
  } else if (benchmark >= -0.10 && benchmark <= 0.10) {
      category = "Average"; badgeColor = "badge-secondary text-white"
  } else if (benchmark > 0.10 && benchmark < 0.30) {
      category = "Good"; badgeColor = "badge-success text-white"
  } else if (benchmark >= 0.30) {
      category = "Excellent"; badgeColor = "badge-primary text-white"
  }

  const tooltipContent = `
    <div class='text-left'>
      <div class='font-semibold p-3 rounded bg-base-300 mb-1'>Energy Use Intensity (Energy Star)</div>
      <p>This rating compares the site's energy efficiency to similar sites.</p>
      <p><strong>${site.siteName}:</strong> ${value.toFixed(2)} kWh/m²</p>
      <p><strong>Median ${selectedBaseline.Site_Subcategory}:</strong> ${selectedBaselineValue} kWh/m²</p>
      <div class="flex gap-2"><strong>Rating:</strong> <div class="badge badge-sm ${badgeColor}">${benchmark.toFixed(2)}</div></div>
      <small>A higher rating means better performance.</small>
    </div>
  `;

  return {
    category,
    badgeColor,
    tooltipContent,
  };
}

export default getBenchmarkBadge