const DOMNodeCollection = require('./dom_node_collection.js');

window.$l = function(arg) {

  if ( arg instanceof HTMLElement) {
    return new DOMNodeCollection([arg]);
  } else if (arg instanceof Function) {
    document.addEventListener('DOMContentLoaded', arg);
  } else {
    let list = document.querySelectorAll(arg);
    return new DOMNodeCollection(Array.from(list));
  }
};

window.$l.extend = function(object, ...objects) {
  objects.forEach( (el) => {
    Object.keys(el).forEach ((key) => {
      object[key] = el[key];
    });
  });
};

window.$l.ajax = function(object) {
  let url = object["url"];
  let data = object["data"];
  let dataType = object["datatype"];
  let type = object["type"];
  let success = object["success"];
  let failure = object["failure"];

  const xhr = new XMLHttpRequest();

  xhr.open(type, url);
  xhr.responseType = dataType;
  xhr.send(data);

  if (xhr.status = 200) {
    success();
  } else {
    failure();
  }
}
