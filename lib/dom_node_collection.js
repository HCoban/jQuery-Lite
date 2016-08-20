class DOMNodeCollection {
  constructor(arr) {
    this.list = arr;
  }

  html(string) {
    if (string || string === "") {
      this.list.forEach ((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.list[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(element) {
    if (element instanceof DOMNodeCollection) {
      this.list.forEach ((el) => {
        element.list.forEach( (outer) => {
          el.innerHTML += outer.outerHTML;
        });
      });
    } else {
      this.list.forEach ((el) => {
        el.innerHTML += element;
      });
    }
  }

  addClass (newClass) {
    this.list.forEach( (el)=> {
      el.classList.add(newClass);
    });
  }

  removeClass (oldClass) {
    this.list.forEach ((el) => {
      el.classList.remove(oldClass);
    });
  }

  attr(key, value) {
    let attrArr = [];
    let flag = false;
    if(value === undefined) {
      this.list.forEach ( (el) => {
        if (el.attributes[key] !== undefined) {
          attrArr.push(el.attributes[key]);
          return el.attributes[key];
        }
      });
      return attrArr[0];
    } else {
      this.list.forEach ( (el) => {
        el.attributes[key] = value;
        attrArr.push(value);
      });
      return this;
    }
  }

  children() {
    let childArr = [];

    this.list.forEach((el) => {
      childArr = childArr.concat(Array.from(el.children));
    });
    return new DOMNodeCollection(childArr);
  }

  parent() {
    let parentArr = [];
    this.list.forEach((el) => {
      parentArr.push(el.parentElement);
    });
    return new DOMNodeCollection(parentArr);
  }

  find (arg) {
    let arr = [];
    this.list.forEach((el) => {
      arr = arr.concat(Array.from(el.querySelectorAll(arg)));
    });

    return new DOMNodeCollection(arr);
  }

  remove () {
    this.list.forEach ((el) => {
      el.remove();
    });
  }

  on (type, listener) {
    this.list.forEach((el) => {
      addEventListener(type, listener);
    });
  }








}

module.exports = DOMNodeCollection;
