// Configuration options
const init_phones = ["Harman 2018 Target"],                      // Optional. Which graphs to display on initial load. Note: Share URLs will override this set
DIR = "Data/",                                // Directory where graph files are stored
data_format = "REW",                   // Accepts "AudioTools," "REW," or "other"
default_channels = ["L","R"],                 // Which channels to display. Avoid javascript errors if loading just one channel per phone
default_normalization = "Hz",                 // Sets default graph normalization mode. Accepts "dB" or "Hz"
default_norm_db = 60,                         // Sets default dB normalization point
default_norm_hz = 750,                       // Sets default Hz normalization point
max_channel_imbalance = 5,                    // ???
alt_layout = true,                           // Toggle between classic and alt layouts
share_url = true,                             // If true, enables shareable URLs
watermark_text = "Kuulokenurkka.com",                 // Optional. Watermark appears behind graphs
watermark_image_url = "Logo_musta_transparent_2.png",   // Optional. If image file is in same directory as config, can be just the filename
page_title = "Taajuusvasteiden vertailutyökalu";                     // Optional. Appended to the page title if share URLs are enabled

// Specify which targets to display
const targets = [
  //{ type:"Neutral"   , files:["Diffuse Field", "Free Field", "Harman In-Room", "In-Ear Fidelity"] },
  //{ type:"Preference", files:["Antdroid","Harman 2013","Harman 2018", "Optimum Hifi","Sonarworks"] }
  { type:"", files:["Harman 2018","Harman 2018 neutraalilla bassontoistolla"]}
];



// Functions to support config options set above; probably don't need to change these

// Set up the watermark, based on config options above
function watermark(svg) {
  let wm = svg.append("g")
  .attr("transform", "translate("+(pad.l+W/2)+","+(pad.t+H/2-20)+")")
  .attr("opacity",0.4);

  if ( watermark_image_url ) {
    wm.append("image")
    .attrs({x:-372, y:83, width:100, height:100,  "xlink:href":watermark_image_url});
  }

  if ( watermark_text ) {
    wm.append("text")
    .attrs({x:260, y:170, "font-size":17, "font-family":"berlin sans fb", "text-anchor":"middle", "class":"graph-name"})
    .text(watermark_text);
  }
}



// Set up tsvParse (?) with default values for AudioTools and REW measurements
function initTsvParse() {
  if ( data_format.toLowerCase() === "audiotools" ) {
    var dataStart = 3,
    dataEnd = 482;
  } else if ( data_format.toLowerCase() === "rew" ) {
    var dataStart = 1,
    dataEnd = 20000;
  } else {
    // If exporting data from something other than AudioTools or REW, edit these vals to indicate on which lines of your text files the measurements data begins and ends
    var dataStart = 2,
    dataEnd = 482;
  }

  tsvParse = fr => d3.tsvParseRows(fr).slice(dataStart,dataEnd)
  .map(r=>r.map(d=>+d));
}
initTsvParse();



// Apply stylesheet based layout options above
function setLayout() {
  function applyStylesheet(styleSheet) {
    var docHead = document.querySelector("head"),
    linkTag = document.createElement("link");

    linkTag.setAttribute("rel", "stylesheet");
    linkTag.setAttribute("type", "text/css");

    linkTag.setAttribute("href", styleSheet);
    docHead.append(linkTag);
  }

  if ( !alt_layout ) {
    applyStylesheet("style.css");
  } else {
    applyStylesheet("style-alt.css");
    applyStylesheet("style-alt-theme.css");
  }
}
setLayout();
