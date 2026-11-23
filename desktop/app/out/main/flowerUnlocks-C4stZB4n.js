"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7bde4d85-5915-54c6-b6e5-2e96b3f306e3")}catch(e){}}();

const FLOWER_IDS = [
  "bluebell",
  "forgetmenot",
  "tulip",
  "sunflower",
  "lantana",
  "daylily"
];
const DEFAULT_FLOWER = "bluebell";
const FLOWER_SETTING_KEY = "theme.flower";
const SHARE_PROMOTION_EXPERIMENT_FLAG = "referral-share-prompt-placement";
const SHARE_PROMOTION_VARIANTS = ["control", "persistent_header", "page_footer"];
new Set(SHARE_PROMOTION_VARIANTS);
const FLOWER_ID_SET = new Set(FLOWER_IDS);
function isFlowerId(value) {
  return value != null && FLOWER_ID_SET.has(value);
}
exports.DEFAULT_FLOWER = DEFAULT_FLOWER;
exports.FLOWER_IDS = FLOWER_IDS;
exports.FLOWER_SETTING_KEY = FLOWER_SETTING_KEY;
exports.SHARE_PROMOTION_EXPERIMENT_FLAG = SHARE_PROMOTION_EXPERIMENT_FLAG;
exports.SHARE_PROMOTION_VARIANTS = SHARE_PROMOTION_VARIANTS;
exports.isFlowerId = isFlowerId;
//# sourceMappingURL=flowerUnlocks-C4stZB4n.js.map

//# debugId=7bde4d85-5915-54c6-b6e5-2e96b3f306e3
