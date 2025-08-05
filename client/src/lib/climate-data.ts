import { ClimateEvent, ClimateParameters, TimelineScenario } from "@shared/schema";
import industrialRevolutionImg from "@assets/Industrial Revolution_1754244934126.jpg";
import ipccEstablishmentImg from "@assets/Establishment of the IPCC_1754244934126.jpg";
import hurricaneKatrinaImg from "@assets/Hurricane Katrina (2005)_1754244934127.jpg";
import parisAgreementImg from "@assets/ari10-2021-lazaro-the-paris-agreement-five-years-on-img_1754244934126.jpg";
import australianBushfiresImg from "@assets/2019–2020 Australian Bushfires_1754244934127.jpg";
import europeanFloodsImg from "@assets/2021 European Floods_1754244934127.jpg";
import europeanHeatwaveImg from "@assets/2003 European Heatwave_1754244934126.jpg";

export const CLIMATE_EVENTS: ClimateEvent[] = [
  {
    id: "1",
    year: 1850,
    title: "Industrial Revolution",
    description: "From the late 18th to 19th century, the transition to industrial manufacturing, powered by coal and later oil, significantly increased greenhouse gas emissions, marking the onset of human-induced climate change. This period saw atmospheric CO2 rise from ~280 ppm to higher levels, setting the stage for global warming.",
    latitude: 53.4808,
    longitude: -2.2426, // Manchester, UK
    eventType: "historical",
    imageUrl: industrialRevolutionImg,
    createdAt: new Date(),
  },
  {
    id: "2",
    year: 1988,
    title: "Establishment of the IPCC",
    description: "The Intergovernmental Panel on Climate Change (IPCC) was founded by the World Meteorological Organization (WMO) and United Nations Environment Programme (UNEP) to provide scientific assessments on climate change, its impacts, and strategies for mitigation and adaptation. It has since produced six assessment reports, shaping global climate policy.",
    latitude: 46.2044,
    longitude: 6.1432, // Geneva, Switzerland
    eventType: "policy",
    imageUrl: ipccEstablishmentImg,
    createdAt: new Date(),
  },
  {
    id: "3",
    year: 2003,
    title: "2003 European Heatwave",
    description: "Record-breaking heatwave, the hottest in 500 years, caused over 70,000 deaths, particularly in France (14,000+). Studies estimate human-induced climate change doubled the likelihood of such extreme heat, driven by a 1°C global temperature rise.",
    latitude: 48.8566,
    longitude: 2.3522, // Paris, France (center of affected area)
    eventType: "disaster",
    imageUrl: europeanHeatwaveImg,
    createdAt: new Date(),
  },
  {
    id: "4",
    year: 2005,
    title: "Hurricane Katrina",
    description: "Category 3 hurricane killed over 1,800 and caused $125 billion in damage. Warmer sea surface temperatures, linked to climate change, likely intensified the storm's surge and rainfall, exacerbating flooding that devastated New Orleans.",
    latitude: 29.9511,
    longitude: -90.0715, // New Orleans
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg,
    createdAt: new Date(),
  },
  {
    id: "5",
    year: 2015,
    title: "Paris Agreement",
    description: "Adopted by 196 parties at COP21, this legally binding treaty aims to limit global warming to well below 2°C above pre-industrial levels, preferably to 1.5°C, through Nationally Determined Contributions (NDCs). It also emphasizes adaptation and financial support for vulnerable nations.",
    latitude: 48.8566,
    longitude: 2.3522, // Paris, France
    eventType: "policy",
    imageUrl: parisAgreementImg,
    createdAt: new Date(),
  },
  {
    id: "6",
    year: 2020,
    title: "2019–2020 Australian Bushfires",
    description: "Unprecedented fires burned over 18 million hectares, killed 33 people, and destroyed billions of animals. Climate change increased fire weather risk by at least 30%, fueled by record heat and drought conditions across southeastern Australia.",
    latitude: -33.8688,
    longitude: 151.2093, // Sydney, Australia
    eventType: "disaster",
    imageUrl: australianBushfiresImg,
    createdAt: new Date(),
  },
  {
    id: "7",
    year: 2021,
    title: "2021 European Floods",
    description: "Heavy rainfall caused catastrophic flooding, killing over 200 and causing €46 billion in damage. Climate change intensified rainfall by up to 19%, making such events more likely in Western Europe, particularly affecting Germany and Belgium.",
    latitude: 50.7374,
    longitude: 7.0982, // Bonn, Germany
    eventType: "disaster",
    imageUrl: europeanFloodsImg,
    createdAt: new Date(),
  },
  {
    id: "8",
    year: 1992,
    title: "Hurricane Andrew",
    description: "Category 5 hurricane that devastated South Florida and Louisiana, causing $54 billion in damage and 62 deaths. One of the most destructive hurricanes in U.S. history, highlighting increased hurricane intensity linked to warming ocean temperatures.",
    latitude: 25.7617,
    longitude: -80.1918, // Miami, Florida
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using similar hurricane image
    createdAt: new Date(),
  },
  {
    id: "9",
    year: 1998,
    title: "China Floods",
    description: "Devastating floods along the Yangtze River caused $51 billion in damage and killed over 3,600 people. These floods demonstrated the increasing frequency of extreme precipitation events linked to climate change.",
    latitude: 30.5928,
    longitude: 114.3055, // Yangtze River region
    eventType: "disaster",
    imageUrl: europeanFloodsImg, // Using flood image
    createdAt: new Date(),
  },
  {
    id: "10",
    year: 2017,
    title: "Hurricane Harvey",
    description: "Category 4 hurricane caused $141 billion in damage and 89 deaths, primarily from catastrophic flooding in Houston. The storm's slow movement and intense rainfall were linked to changing atmospheric patterns from climate change.",
    latitude: 29.7604,
    longitude: -95.3698, // Houston, Texas
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using hurricane image
    createdAt: new Date(),
  },
  {
    id: "11",
    year: 2017,
    title: "Hurricane Maria",
    description: "Category 5 hurricane devastated Puerto Rico and the Virgin Islands, causing $102 billion in damage and 2,981 deaths. The storm highlighted the vulnerability of island communities to intensifying hurricanes in a warming climate.",
    latitude: 18.2208,
    longitude: -66.5901, // Puerto Rico
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using hurricane image
    createdAt: new Date(),
  },
  {
    id: "12",
    year: 2012,
    title: "Hurricane Sandy",
    description: "Superstorm Sandy caused $80 billion in damage and 159 deaths across the Eastern U.S. The storm's unusual path and intensity were linked to Arctic warming affecting jet stream patterns, demonstrating new climate-driven weather patterns.",
    latitude: 40.7128,
    longitude: -74.0060, // New York City
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using hurricane image
    createdAt: new Date(),
  },
  {
    id: "13",
    year: 2018,
    title: "Western U.S. Wildfires",
    description: "Record-breaking wildfire season caused $26 billion in damage and 106 deaths. Climate change increased fire weather conditions, with hotter temperatures and longer dry seasons creating unprecedented fire risks across California and other western states.",
    latitude: 38.5816,
    longitude: -121.4944, // California
    eventType: "disaster",
    imageUrl: australianBushfiresImg, // Using wildfire image
    createdAt: new Date(),
  },
  {
    id: "14",
    year: 2021,
    title: "Hurricane Ida",
    description: "Category 4 hurricane caused $75 billion in damage and 96 deaths across Louisiana, Mississippi, and the Northeast. The storm's rapid intensification and massive rainfall demonstrated how climate change is creating more powerful hurricanes.",
    latitude: 29.9511,
    longitude: -90.0715, // New Orleans
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using hurricane image
    createdAt: new Date(),
  },
  {
    id: "15",
    year: 1988,
    title: "U.S. Midwest Drought & Heat Wave",
    description: "Severe drought and heat wave across the Midwest and Eastern U.S. caused $48 billion in agricultural losses and 454 deaths. This event demonstrated how climate change intensifies drought conditions and extreme heat.",
    latitude: 41.8781,
    longitude: -87.6298, // Chicago (Midwest center)
    eventType: "disaster",
    imageUrl: europeanHeatwaveImg, // Using heatwave image
    createdAt: new Date(),
  },
  {
    id: "16",
    year: 1993,
    title: "Mississippi River Floods",
    description: "Great Flood of 1993 caused $41 billion in damage and 48 deaths across the Mississippi River basin. The flood highlighted increasing precipitation extremes and flood risks associated with climate change.",
    latitude: 38.6270,
    longitude: -90.1994, // St. Louis, Missouri
    eventType: "disaster",
    imageUrl: europeanFloodsImg, // Using flood image
    createdAt: new Date(),
  },
  {
    id: "17",
    year: 2012,
    title: "U.S. Drought & Heat Wave",
    description: "Widespread drought and heat wave across the Midwest and East caused $37 billion in damage and 123 deaths. The event showed how rising temperatures increase evaporation and drought severity.",
    latitude: 39.0458,
    longitude: -76.6413, // Baltimore (Eastern U.S.)
    eventType: "disaster",
    imageUrl: europeanHeatwaveImg, // Using heatwave image
    createdAt: new Date(),
  },
  {
    id: "18",
    year: 2008,
    title: "Hurricane Ike",
    description: "Category 2 hurricane caused $40 billion in damage and 112 deaths across Texas, Louisiana, and Mississippi. The storm demonstrated how even lower-category hurricanes can cause massive damage due to climate-enhanced storm surge.",
    latitude: 29.4241,
    longitude: -98.4936, // San Antonio, Texas
    eventType: "disaster",
    imageUrl: hurricaneKatrinaImg, // Using hurricane image
    createdAt: new Date(),
  },
  {
    id: "19",
    year: 1896,
    title: "Arrhenius Climate Theory",
    description: "Svante Arrhenius calculates that industrial coal burning will enhance the greenhouse effect, becoming the first scientist to predict human-caused climate change. His calculations showed that doubling CO2 could warm Earth by 5-6°C.",
    latitude: 59.3293,
    longitude: 18.0686, // Stockholm, Sweden
    eventType: "historical",
    imageUrl: industrialRevolutionImg,
    createdAt: new Date(),
  },
  {
    id: "20",
    year: 1958,
    title: "Keeling Curve Begins",
    description: "Charles Keeling starts measuring atmospheric CO2 at Mauna Loa Observatory, creating the famous 'Keeling Curve' that shows steady rise in atmospheric carbon dioxide. This becomes the most important long-term record of climate change.",
    latitude: 19.5362,
    longitude: -155.5763, // Mauna Loa, Hawaii
    eventType: "historical",
    imageUrl: industrialRevolutionImg,
    createdAt: new Date(),
  },
  {
    id: "21",
    year: 1988,
    title: "Hansen's Historic Testimony",
    description: "NASA scientist James Hansen testifies to Congress that global warming is underway, marking the moment climate change entered mainstream political discourse. He stated with 99% confidence that Earth was warming due to human activities.",
    latitude: 38.8951,
    longitude: -77.0364, // Washington, D.C.
    eventType: "policy",
    imageUrl: parisAgreementImg,
    createdAt: new Date(),
  },
  {
    id: "22",
    year: 2013,
    title: "400 ppm CO2 Milestone",
    description: "Atmospheric CO2 concentrations exceed 400 parts per million for the first time in human history, as measured at Mauna Loa Observatory. This milestone represents levels not seen for over 3 million years.",
    latitude: 19.5362,
    longitude: -155.5763, // Mauna Loa, Hawaii
    eventType: "historical",
    imageUrl: industrialRevolutionImg,
    createdAt: new Date(),
  },
];

export function calculateClimateParameters(year: number, scenario: TimelineScenario): ClimateParameters {
  let seaLevel = 0;
  let temperature = 0;
  let wildfires = 0;
  let pollution = 0;
  let iceLoss = 0;
  let drought = 0;

  if (year <= 2024) {
    // Historical data based on actual climate records
    const progress = Math.max(0, (year - 1850) / (2024 - 1850));
    seaLevel = progress * 23; // ~23cm rise by 2024
    temperature = progress * 1.2; // ~1.2°C rise by 2024
    wildfires = progress * 30;
    pollution = Math.max(0, progress * 40 - 0.2 * (year - 2000)); // Peak around 2000, slight decline
    iceLoss = progress * 70;
    drought = progress * 40;
  } else {
    // Future projections based on scenario
    const futureProgress = (year - 2024) / (2100 - 2024);
    const baseSeaLevel = 23;
    const baseTemperature = 1.2;
    
    switch (scenario) {
      case 'optimistic':
        seaLevel = baseSeaLevel + futureProgress * 20; // Up to 43cm total
        temperature = baseTemperature + futureProgress * 0.3; // Up to 1.5°C
        wildfires = 30 + futureProgress * 10;
        pollution = Math.max(0, 20 - futureProgress * 15);
        iceLoss = 70 + futureProgress * 15;
        drought = 40 + futureProgress * 20;
        break;
      case 'realistic':
        seaLevel = baseSeaLevel + futureProgress * 50; // Up to 73cm total
        temperature = baseTemperature + futureProgress * 1.3; // Up to 2.5°C
        wildfires = 30 + futureProgress * 40;
        pollution = Math.max(0, 20 - futureProgress * 10);
        iceLoss = 70 + futureProgress * 25;
        drought = 40 + futureProgress * 35;
        break;
      case 'pessimistic':
        seaLevel = baseSeaLevel + futureProgress * 100; // Up to 123cm total
        temperature = baseTemperature + futureProgress * 2.3; // Up to 3.5°C
        wildfires = 30 + futureProgress * 60;
        pollution = Math.max(0, 20 - futureProgress * 5);
        iceLoss = 70 + futureProgress * 30;
        drought = 40 + futureProgress * 50;
        break;
    }
  }

  return {
    id: `${year}-${scenario}`,
    year,
    scenario,
    seaLevel: Math.round(seaLevel * 10) / 10,
    temperature: Math.round(temperature * 10) / 10,
    wildfires: Math.round(wildfires),
    pollution: Math.round(pollution),
    iceLoss: Math.round(iceLoss),
    drought: Math.round(drought),
  };
}

export const TIMELINE_MILESTONES = [
  { year: 1880, label: "Temperature Records Begin" },
  { year: 1896, label: "Arrhenius Theory" },
  { year: 1958, label: "Keeling Curve" },
  { year: 1988, label: "IPCC Founded" },
  { year: 2005, label: "Hurricane Katrina" },
  { year: 2015, label: "Paris Agreement" },
  { year: 2024, label: "Present Day" },
  { year: 2100, label: "Future Projections" },
];
