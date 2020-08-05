// safe code
// ; complete useful
(function (global) {
  // "new" an object
  var MiDom = function (node, create) {
    return new MiDom.init(node, create);
  };

  //-----------------------------------------------------//
  // hidden within the scope of the IIFE and never directly accessible
  // var supportedlangs = ["en", "es"]

  //-----------------------------------------------------//
  // prototype holds methods (to save memory space)

  MiDom.prototype = {
    //-----------------------------------------------------//
    createE: function (element = "div", create = true) {
      // console.log(element.includes("."));
      try {
        if ((!element.includes(".") && !element.includes("#")) || create)
          return (this.node = document.querySelector(element));
        else return document.createElement(element);
      } catch (error) {
        this.error("createE", element);
      }
    },

    queryS: (element = "div") => {
      try {
        return document.querySelector(element);
      } catch (error) {
        this.error("createE", element);
      }
    },
    queryChild: (element = "div") => {
      try {
        return this.node.querySelector(element);
      } catch (error) {
        this.error("createE", element);
      }
    },

    //-----------------------------------------------------//
    appendC: function (where = "body") {
      try {
        if (typeof where === "object")
          where.node
            ? where.node.appendChild(this.node)
            : where.appendChild(this.node);
        else this.queryS(where).appendChild(this.node);
        return this;
      } catch (error) {
        this.error("appendC", where);
      }
    },

    innerH: function (text = "") {
      try {
        if (this.node.value === undefined) this.node.innerHTML = text;
        // input, textarea, option
        else this.node.value = text;
        return this;
      } catch (error) {
        this.error("appendC", text);
      }
    },

    addE: function (func, event = "click", scope = true) {
      this.node.addEventListener(event, func, scope);
      return this;
    },

    //-----------------------------------------------------//

    styleT: function (styles) {
      this.node.style.cssText = styles;
      return this;
    },

    addId: function (id) {
      this.node.id = id;
      return this;
    },

    // sobre escribe
    classL: function (clase) {
      this.node.classList = clase;
      return this;
    },

    // agrega
    addC: function () {
      for (var i = 0; i < arguments.length; i++) {
        this.node.classList.add(arguments[i]);
      }
      return this;
    },
    removeC: function (clase) {
      this.node.classList.remove(clase);
      return this;
    },
    classTg: function (clase) {
      this.node.classList.toggle(clase);
      return this;
    },
    replace: function (clase, whit) {
      this.node.classList.replace(clase, whit);
      return this;
    },

    setSty: function (property, value) {
      this.node.style[property] = value;
      return this;
    },
    setAtt: function (att, value) {
      this.node.setAttribute(att, value);
      return this;
    },
    removeA: function (att) {
      this.node.removeAttribute(att);
      return this;
    },

    value: function () {
      return this.node.value;
    },
    content: function () {
      return this.node.textContent;
    },

    error: function (message, item) {
      console.error(message);
      if (item) console.log(item);
      return this;
    },

    insertFn: function (fn) {
      fn(this);
      return this;
    },

    destroy: function () {
      delete this.node;
    },

    removeChild: function (child) {
      this.node.removeChild(child);
      return this;
    },
    removeChild: function (nuevo, old) {
      this.node.replaceChild(nuevo, old);
      return this;
    },

    repeat: function (self) {
      for (let i = 1; i <= num; i++) {
        log(i);
        this.createE(self[0]);
        this.innerH(self[1]);
        this.appendC();
      }
    },

    pre: function (text, where = "body") {
      let pre = this.createE("pre");
      pre.innerHTML = JSON.stringify(text);
      this.queryS(where).appendChild(pre);
      return this;
    },
  };

  //-----------------------------------------------------//
  // the actual object is created here, allowing us to 'new' an object without calling 'new'
  MiDom.init = function (node, create = true) {
    var self = this;
    self.node = node ? this.createE(node) : "";
  };

  // trick borrowed from jQuery so we don't have to use the 'new' keyword
  MiDom.init.prototype = MiDom.prototype;

  // attach our MiDom to the global object, and provide a shorthand '$G' for ease our poor fingers
  global.$ = global.MiDom = MiDom;
})(window);

/*--------------------------------------------------------------------------/
 code 
/--------------------------------------------------------------------------*/
$("#toggle").addE(function () {
  this.parentNode.querySelector("div").classList.toggle("hide");
});
$("#toggle2").addE(function () {
  this.parentNode.querySelector("div").classList.toggle("hide");
});
$("#toggle3").addE(function () {
  this.parentNode.querySelector("div").classList.toggle("hide");
});
$("#toggle4").addE(function () {
  console.log(123);  
  this.parentNode.querySelector("div").classList.toggle("hide");
});
$("#toggle5").addE(function () {
  console.log(123);  
  this.parentNode.querySelector("ul").classList.toggle("hide");
});
$("#toggle6").addE(function () {
  console.log(123);  
  this.parentNode.parentNode.querySelector("ul").classList.toggle("hide");
});
