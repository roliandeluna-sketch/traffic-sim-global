const { chromium, devices } = require('playwright');
const fs = require('fs');

const URL = "https://ysyglobaloffers.netlify.app/";

// ---------------------------------------------------------
// 🌐 PROXY DATABASE (Embedded for ease of use)
// ---------------------------------------------------------
const US_PROXIES = [
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-f0jauf4a-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-75x0xg98-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-i8ocvx2l-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-fmf43glp-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-fl96clbq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-folj0p30-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-8t7g99cc-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-6d4ozm0y-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-2byleuty-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-7j3ufx2a-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-gdlkheys-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-aexwkcty-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-81aw1jas-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-qogtst6h-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-zd4q4rgn-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-lb5iw9vo-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-k0a8t0yz-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-zxoazfwp-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-w87yvk1g-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-nc6vjigy-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-fzzgv991-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-d5dob4zd-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-ble6kjfb-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-58g77iqw-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-5d1urce1-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-1wuuzv3x-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-29pgtmpj-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-4mf38xqx-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-1w065thq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-n10ov6dg-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-mbas5pfd-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-7bu0k8o1-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-fkstjqi3-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-5gpzz1vl-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-pmdbkpri-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-isees3m8-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-qdens738-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-gy6a9wfj-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-u533mk2k-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-fj1sxob5-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-gxggepp2-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-cnikegys-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-ed1z99kw-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-9293ccfo-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-bsvavuwp-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-6kt0pzqy-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-g5afaju3-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-xgbweqym-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-7pefcbq3-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-ym2fbjjv-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-ccios8d6-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-xkdmb2au-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-801romdv-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-exbvme19-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-mco30dg1-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-z5m5sz6c-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-e3s4xy6f-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-nijssi5r-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-9n3sfvqs-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-mzp95m0a-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-yfmzsn4v-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-apqtd7qb-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-74yjs2iz-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-jpedwk4y-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-oz0fsun5-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-pz7mqlzv-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-1wfg0vw1-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-vyinxhyr-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-rw71m6a9-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-akxmod6a-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-9i1ypx3s-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-8zjtwkjr-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-4ena45l5-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-pmn8e76b-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-mr1hci9q-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-wn3gimui-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-srdkxrwx-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-xdplkb87-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-ium1z6v3-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-US-session-qi06o9ja-time-long:50qeiajmpk6c"
];

const CA_PROXIES = [
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-7b169w7c-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-0ndmz27y-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-7jqk2tal-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-x251zpvq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-aofkeksu-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-cdg5dsnd-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-v4u2gl42-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-0srdl7rr-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-tutobhjn-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-ruj7ylrq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-o74hdc3t-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-wrmjqx5s-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-gcif2oo9-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-68227vbv-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-tjqw9hgl-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-7l898jpx-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-0al63afa-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-686woo5d-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-m8urf8rr-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-jupugib2-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-x5hk1dbq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-ry2gn2yz-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-t6i21ve4-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-89ndz539-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-88tjtj7l-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-j3o3uyx8-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-b5tqj7w7-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-v4840789-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-ueau7wov-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-zoxwogbf-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-c9aa123o-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-0ny49k7u-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-yjoq5tyk-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-vxcq5k8d-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-0fgtzrtn-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-iizltql2-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-dfslvjfm-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-ai14aan4-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-7sv8e76p-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-20hfkltw-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-gg65u12w-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-i933t32j-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-si4dpcxc-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-cmpysi5q-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-fm2jwl6h-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-1aysd85x-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-3j15hovr-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-05yf0igi-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-em1053yq-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-CA-session-rf5pbf8r-time-long:50qeiajmpk6c"
];

const MX_PROXIES = [
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-e2yrzmu3-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-41gs1d6h-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-j0n1hs7q-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-nr27v1ga-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-af5pet79-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-1ufvtdv2-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-ofjzpt1b-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-gdiyuqab-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-4pb4il6k-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-39a2prpl-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-5u6vbsr7-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-zuhafzch-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-zt2oa836-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-17f3l0wl-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-tum5866w-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-dr23xyom-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-3iobk1no-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-xdppv3fp-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-l6laggni-time-long:50qeiajmpk6c",
  "geo.vibeproxies.com:8080:260708019xkyz9e-country-MX-session-je9f2tqe-time-long:50qeiajmpk6c"
];

// ---------------------------------------------------------
// 📱 DEVICE POOL
// ---------------------------------------------------------
const DESKTOP_POOL = [
  { name: "Windows Chrome 1920x1080", viewport: { width: 1920, height: 1080 } },
  { name: "Windows Edge 1366x768", viewport: { width: 1366, height: 768 } },
  { name: "MacBook Pro 16", viewport: { width: 1728, height: 1117 } }
];

const MOBILE_POOL = [
  devices["iPhone 14"],
  devices["iPhone 15"],
  devices["Pixel 7"],
  devices["Galaxy S23"]
];

// ---------------------------------------------------------
// ⏱️ UTILS
// ---------------------------------------------------------
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ---------------------------------------------------------
// 👤 SESSION ENGINE
// ---------------------------------------------------------
async function runSession() {
  // 1. Pick Country (Prioritize US)
  const rCountry = Math.random();
  let country, proxyList, locale, timezone;
  
  if (rCountry < 0.60) {
    country = "US"; proxyList = US_PROXIES; locale = "en-US"; timezone = "America/New_York";
  } else if (rCountry < 0.90) {
    country = "CA"; proxyList = CA_PROXIES; locale = "en-CA"; timezone = "America/Toronto";
  } else {
    country = "MX"; proxyList = MX_PROXIES; locale = "es-MX"; timezone = "America/Mexico_City";
  }

  // 2. Pick Random Proxy for this instance
  const proxyString = proxyList[rand(0, proxyList.length - 1)];
  const [pHost, pPort, pUser, pPass] = proxyString.split(':');

  // 3. Pick Random Device
  const isMobile = Math.random() < 0.4;
  const deviceConfig = isMobile ? MOBILE_POOL[rand(0, MOBILE_POOL.length - 1)] : DESKTOP_POOL[rand(0, DESKTOP_POOL.length - 1)];

  let browser;
  try {
    console.log(`🚀 Launching [${country}] using ${deviceConfig.name || "Mobile"} via Proxy...`);
    
    browser = await chromium.launch({
      headless: true,
      proxy: { server: `http://${pHost}:${pPort}`, username: pUser, password: pPass }
    });

    const context = await browser.newContext({
      ...deviceConfig,
      locale: locale,
      timezoneId: timezone
    });

    const page = await context.newPage();
    
    // NAVIGATION
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 60000 });

    // HUMAN BEHAVIOR (20-50 seconds)
    const moveTime = rand(20, 50) * 1000;
    const endMove = Date.now() + moveTime;
    while (Date.now() < endMove) {
      await page.mouse.wheel(0, rand(100, 800));
      await sleep(rand(1000, 3000));
    }

    // RANDOM CLICKS (70% probability, 3-5 clicks)
    if (Math.random() < 0.70) {
      const clicks = rand(3, 5);
      for (let i = 0; i < clicks; i++) {
        const links = await page.$$('a, button');
        if (links.length > 0) {
          await links[rand(0, links.length - 1)].click().catch(() => {});
          await sleep(rand(2000, 5000));
        }
      }
    }

    // TOTAL SESSION DURATION (30s to 1.5m)
    const totalDuration = rand(30, 90) * 1000;
    const elapsed = Date.now() - endMove + moveTime;
    if (totalDuration > elapsed) await sleep(totalDuration - elapsed);

    console.log(`✅ Session finished [${country}]`);
  } catch (e) {
    console.error(`❌ Error: ${e.message}`);
  } finally {
    if (browser) await browser.close();
  }
}

// ---------------------------------------------------------
// 🚀 MAIN CONTROLLER (2-3 Hours)
// ---------------------------------------------------------
async function main() {
  const endTime = Date.now() + rand(2, 3) * 60 * 60 * 1000;
  console.log("🔥 Starting Traffic Simulation (Duration: 2-3 hours)...");

  while (Date.now() < endTime) {
    const concurrent = rand(1, 3);
    const sessions = [];
    
    for (let i = 0; i < concurrent; i++) {
      sessions.push(runSession());
    }

    await Promise.all(sessions);
    
    // Wait 1-2 minutes before next wave
    const waitTime = rand(1, 2) * 60 * 1000;
    console.log(`💤 Waiting ${waitTime/1000}s before next batch...`);
    await sleep(waitTime);
  }
  console.log("🏁 Simulation Complete.");
}

main();
