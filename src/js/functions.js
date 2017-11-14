//---------IMPORT TEMPLATE FILES---------//
function templateImport(selector, div){
  var link = document.querySelector('link.' + selector + '[rel="import"]');
  var template = link.import.querySelector('template');
  var clone = document.importNode(template.content, true);
  document.querySelector('' + div + '').appendChild(clone);
}
