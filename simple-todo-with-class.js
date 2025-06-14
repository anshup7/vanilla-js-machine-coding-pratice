import "./styles.css";

// Write your JavaScript here.

class Node {
  constructor(id, domRef, node = null) {
    this.id = id;
    this.document = domRef;
    this.node = node;
    this.listeners = new Map();
    this.parent = null;
  }

  createNode(tag) {
    this.node = this.document.createElement(tag);
    this.node.setAttribute("id", this.id);
    return this;
  }

  addText(text) {
    this.node.textContent = text;
    return this;
  }

  addHtml(content) {
    if (content.includes("script") || content.includes("SCRIPT")) {
      throw new TypeError("Invalid Usage for HTML Insertion - Dangerous");
    }

    this.node.innerHTML = content;
  }

  attachToParent(parent) {
    this.parent = parent;
    parent.appendChild(this.node);
    return this;
  }

  addListener(listener, eventName, shouldAttachGlobally = false) {
    if (this.listeners.has(eventName)) {
      const localListeners = this.listeners.get(eventName);
      localListeners.push({
        func: listener,
        instantiated: false,
        isGlobal: shouldAttachGlobally,
      });
      this.listeners.set(eventName, localListeners);
    } else {
      this.listeners.set(eventName, [
        {
          func: listener,
          instantiated: false,
          isGlobal: shouldAttachGlobally,
        },
      ]);
    }
    return this;
  }

  initializeListeners() {
    const allEvents = Array.from(this.listeners.keys());
    for (let event of allEvents) {
      const localListeners = this.listeners.get(event);
      localListeners.forEach(({ func, instantiated, isGlobal }) => {
        if (!instantiated) {
          if (isGlobal) {
            this.document.addEventListener(event, func);
            instantiated = true;
          } else {
            this.node.addEventListener(event, func);
          }
        }
      });

      this.listeners.set(event, localListeners);
    }

    return this;
  }

  removeListener(eventName) {
    const localListeners = this.listeners.get(eventName);
    localListeners.forEach(({ func, instantiated, isGlobal }) => {
      if (isGlobal) {
        this.document.removeEventListener(eventName, func);
        instantiated = false;
      } else {
        this.node.removeEventListener(eventName, func);
        instantiated = false;
      }
    });
    return this;
  }

  removeAllListeners() {
    const events = Array.from(this.listeners.keys());
    for (let event of events) {
      const localListeners = this.listeners.get(event);
      localListeners.forEach(({ func, instantiated, isGlobal }) => {
        if (!instantiated) {
          if (isGlobal) {
            this.document.removeEventListener(event, func);
            instantiated = true;
          } else {
            this.node.removeEventListener(event, func);
          }
        }
      });
    }
    return this;
  }
}

// const testNode = new Node("firstHeading", document);

// testNode
//   .createNode("h1")
//   .addText("text")
//   .attachToParent(document.getElementById("parent"))
//   .addListener((e) => console.log(e.target.textContent), "click")
//   .initializeListeners()
//   .removeAllListeners();

const inputAreaNode = new Node(
  "inputArea",
  document,
  document.getElementById("inputArea"),
);

const inputSubmitNode = new Node(
  "inputSubmit",
  document,
  document.getElementById("inputSubmit"),
);

const listContainerNode = new Node(
  "listContainer",
  document,
  document.getElementById("listContainer"),
);

function getIdGenerator() {
  let counter = 0;
  return function generate() {
    counter++;
    return counter;
  };
}

const getId = getIdGenerator();
const liNodesAdded = new Map();

function handleDeleteLiNode(e) {
  console.log(e.currentTarget, e.currentTarget.id);
  const liNode = liNodesAdded.get(e.currentTarget.id);
  liNode.removeAllListeners();
  liNode.parent.removeChild(liNode.node);
}

function inputSubmitListener(e) {
  const textAdded = inputAreaNode.node.value;
  const nodeId = `liNode-${getId()}`;
  const liNode = new Node(nodeId, document)
    .createNode("li")
    .addText(textAdded)
    .attachToParent(listContainerNode.node)
    .addListener(handleDeleteLiNode, "click")
    .initializeListeners();
  new Node(`${nodeId}__delete-button`, document) // I do not need to track as li is getting tracked
    .createNode("button")
    .addText("Delete")
    .attachToParent(liNode.node);
  liNodesAdded.set(liNode.id, liNode);
}

inputSubmitNode.addListener(inputSubmitListener, "click").initializeListeners();
