import{H as o}from"./index.ChnVkEBd.js";const i=o.flatMap(e=>e.plugin&&e.plugin.route!=="installer"?[{id:e.id,label:e.label,kind:e.plugin.route,...e.plugin.note?{note:e.plugin.note}:{}}]:[]),t={id:"agent",label:"Another agent",kind:"prompt"},a=e=>i.find(n=>n.id===e)??(e===t.id?t:void 0);function l(e){return[`Add a custom MCP server called blume at ${e.endpoint}`,e.conversation?`It needs these two headers on every request:
Authorization: Bearer ${e.token}
X-Blume-Conversation: ${e.conversation}`:`It needs this header on every request: Authorization: Bearer ${e.token}`,"Keep the key in the header, never in the URL. After adding it, call blume_context to check that it works."].join(`
`)}export{t as O,i as P,l as c,a as p};
