(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["lorehub-dialog-player"] = factory();
	else
		root["lorehub-dialog-player"] = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Dialog": () => (/* reexport */ Dialog),
  "DialogNode": () => (/* reexport */ DialogNode),
  "DialogTextContent": () => (/* reexport */ DialogContent),
  "convertDataToDialog": () => (/* reexport */ convertDataToDialog)
});

;// CONCATENATED MODULE: ./src/Dialog.js


class Dialog {
  /**
   * @param {String} id
   * @param {DialogNode} startNode
   */
  constructor(id, startNode) {
    if (id == null || startNode == null) {
      throw new Error("Cannot create Dialog because id or/and startNode is null.");
    }

    this.id = id;
    this.startNode = startNode;
    this._currnetNode = startNode;

    startNode.subscribe(this);
  }

  /**
   * @returns {DialogNode}
   */
  get currentNode() {
    return this._currnetNode;
  }

  /**
   * @returns {boolean}
   */
  get finished() {
    if (this._currnetNode.nextNode == null) return true;
    return false;
  }

  /**
   * @param {DialogNode} nextNode
   */
  onNext(nextNode) {
    this._currnetNode.unsubscribe(this);
    nextNode.subscribe(this);
    this._currnetNode = nextNode;
  }
}

;// CONCATENATED MODULE: ./src/DialogNode.js

class DialogNode {
  /**
   * @param {String} id
   * @param {DialogTextContent | DialogTextContent} content
   * @param {DialogNode|null} nextNode
   */
  constructor(id, content, nextNode = null) {
    if (id == null || content == null) {
      throw new Error(
        `Cannot create DialogNode because id: ${id} or content: ${content} is null.`
      );
    }
    this.id = id;
    this.nextNode = nextNode;
    this.content = content;

    this.subscribers = [];
  }

  /**
   * @throws error when next node is null.
   */
  goNext() {
    if (this.nextNode == null) {
      throw new Error("NextNode is null, so I cannot go to next one.");
    }

    this.subscribers.forEach(observer => {
      observer.onNext(this.nextNode);
    });
  }

  subscribe(subscriber) {
    if (subscriber.onNext == null) {
      throw new Error(
        "You cannot subscribe because 'onNext' function is not defined."
      );
    }
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    const toRemoveIndex = this.subscribers.findIndex(e => e === subscriber);
    if (toRemoveIndex > -1) {
      this.subscribers.splice(toRemoveIndex, 1);
    }
  }
}

;// CONCATENATED MODULE: ./src/DialogTextContent.js
class DialogContent {
  /**
   * @param {string} id
   * @param {string} text
   */
  constructor(id, text) {
    this.id = id;
    this.text = text;
  }
}

;// CONCATENATED MODULE: ./src/DialogReferenceContent.js
class ContentDataReference {
    /**
    * @param {string} id
    * @param {string | null} text
    * @param {string | null} documentId
    */
    constructor(id, text, documentId, documentName) {
        this.id = id;
        this._text = text;
        this.documentId = documentId;
        this.documentName = documentName
    }

    /**
     * Will use document name if text is null.
     */
    get text() {
        return this._text == null ? this.documentName : this._text;
    }

}

;// CONCATENATED MODULE: ./src/convertDataToDialog.js









/**
 * Will convert data from server to a dialog.
 * @param {DialogDTO} dialogDTO
 * @param {Array<DialogNodeDTO>} dialogNodeDTOs
 * @param {Array<ContentBlockDTO>} contentBlockDTOs
 * @param {Array<DocumentDTO>} documentDTOs
 * @returns {Dialog}
 */
function convertDataToDialog(
  dialogDTO,
  dialogNodeDTOs,
  contentBlockDTOs,
  documentDTOs
) {
  if (dialogDTO == null ||
    dialogNodeDTOs == null ||
    contentBlockDTOs == null ||
    documentDTOs == null) {
    throw new Error(
      `Cannot convert DTOs to a Dialog because 
      dialogDTO: ${dialogDTO} cannot be null OR 
      dialogNodeDTOs: ${dialogNodeDTOs} cannot be null OR 
      contentBlockDTOs: ${contentBlockDTOs} cannot be null OR
      documentDTOs: ${documentDTOs} cannot be null.`
    );
  }

  const nodes = createDialogNodes(dialogNodeDTOs, contentBlockDTOs, documentDTOs);
  const startingNode = nodes.find(n => n.id === dialogDTO.startingNodeId);

  if (startingNode == null) {
    throw new Error(
      `Cannot find starting node with id ${dialogDTO.startingNodeId}.`
    );
  }
  const dialog = new Dialog(dialogDTO.id, startingNode);
  return dialog;
}

/**
 * @param {Array<DialogNodeDTO>} dialogNodeDTOs
 * @param {Array<ContentBlockDTO>} contentBlockDTOs
 * @param {Array<DocumentDTO>} documentDTOs
 */
function createDialogNodes(dialogNodeDTOs, contentBlockDTOs, documentDTOs) {
  let nodes = [];
  for (let i = 0; i < dialogNodeDTOs.length; i++) {
    const dto = dialogNodeDTOs[i];
    const contentDTOs = contentBlockDTOs
      .filter(c => c.dialogNodeId == dto.id)
      .sort((a, b) => (a.index > b.index ? 1 : -1));
    let contentForNode = [];
    for (let z = 0; z < contentDTOs.length; z++) {
      const contentDTO = contentDTOs[z];
      if (contentDTO.type === "text") {
        const content = new DialogContent(
          contentDTO.id,
          contentDTO.data.text
        );
        contentForNode.push(content);
      }
      else if (contentDTO.type === 'reference') {
        const neededDoc = documentDTOs.find(d => d.id === contentDTO.data.documentId);
        if (neededDoc == null) throw new Error(`To create a node for a reference type I need document. I cannot find a document with id ${contentDTO.data.documentId}`);
        const content = new ContentDataReference(
          contentDTO.id,
          contentDTO.data.text,
          contentDTO.data.documentId,
          neededDoc.name
        )
        contentForNode.push(content);
      }
      else {
        throw new Error(
          `Cannot convert to DialogContent for type ${contentDTO.type}.`
        );
      }
    }
    nodes.push(new DialogNode(dto.id, contentForNode, null));
  }

  for (let i = 0; i < nodes.length; i++) {
    const dto = dialogNodeDTOs[i];
    const node = nodes[i];
    if (dto.nextDialogNodeId) {
      node.nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
    }
  }
  return nodes;
}

;// CONCATENATED MODULE: ./src/index.js







/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=lorehub-dialog-player.js.map