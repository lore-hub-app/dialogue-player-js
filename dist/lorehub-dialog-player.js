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
  "ContetnBlockDTO": () => (/* reexport */ ContetnBlockDTO),
  "Dialog": () => (/* reexport */ Dialog),
  "DialogDTO": () => (/* reexport */ DialogDTO),
  "DialogNode": () => (/* reexport */ DialogNode),
  "DialogNodeDTO": () => (/* reexport */ DialogNodeDTO),
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
   * @param {Array<DialogTextContent> | DialogTextContent} content
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

    if (content.length == null) {
      this.content = [content];
    } else {
      this.content = content;
    }

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
   * @param {string} value
   */
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

;// CONCATENATED MODULE: ./src/convertDataToDialog.js







/**
 * Will convert data from server to a dialog.
 * @param {DialogDTO} dialogDTO
 * @param {Array<DialogNodeDTO>} dialogNodesDTO
 * @param {Array<ContetnBlockDTO>} contentBlocksDTO
 * @returns {Dialog}
 */
function convertDataToDialog(
  dialogDTO,
  dialogNodesDTO,
  contentBlocksDTO
) {
  if (dialogDTO == null || dialogNodesDTO == null || contentBlocksDTO == null) {
    throw new Error(
      `Cannot convert DTOs to a Dialog because 
      dialogDTO: ${dialogDTO} cannot be null OR 
      dialogNodesDTO: ${dialogNodesDTO} cannot be null OR 
      contentBlocksDTO: ${contentBlocksDTO} cannot be null.`
    );
  }

  const nodes = createDialogNodes(dialogNodesDTO, contentBlocksDTO);
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
 * @param {Array<DialogNodeDTO>} dialogNodesDTO
 * @param {Array<ContetnBlockDTO>} contentBlocksDTO
 */
function createDialogNodes(dialogNodesDTO, contentBlocksDTO) {
  let nodes = [];
  for (let i = 0; i < dialogNodesDTO.length; i++) {
    const dto = dialogNodesDTO[i];
    const contentDTOs = contentBlocksDTO
      .filter(c => c.dialogNodeId == dto.id)
      .sort((a, b) => (a.index > b.index ? 1 : -1));
    let contentForNode = [];
    for (let i = 0; i < contentDTOs.length; i++) {
      const contentDTO = contentDTOs[i];
      if (contentDTO.type === "text") {
        const content = new DialogContent(
          contentDTO.id,
          contentDTO.data.text
        );
        contentForNode.push(content);
      } else {
        throw new Error(
          `Cannot convert to DialogContent for type ${contentDTO.type}.`
        );
      }
    }
    nodes.push(new DialogNode(dto.id, contentForNode, null));
  }

  for (let i = 0; i < nodes.length; i++) {
    const dto = dialogNodesDTO[i];
    const node = nodes[i];
    if (dto.nextDialogNodeId) {
      node.nextNode = nodes.find(n => n.id === dto.nextDialogNodeId);
    }
  }
  return nodes;
}

;// CONCATENATED MODULE: ./src/dto/ContetnBlockDTO.js
class ContetnBlockDTO {
  /**
   * @param {String} id
   * @param {String} dialogNodeId
   * @param {String} type
   * @param {Number} index
   * @param {Array<any>} data
   */
  constructor(id, dialogNodeId, type, index, data) {
    this.id = id;
    this.dialogNodeId = dialogNodeId;
    this.type = type;
    this.index = index;
    this.data = data;
  }
}

;// CONCATENATED MODULE: ./src/dto/DialogDTO.js
class DialogDTO {
  /**
   * @param {String} id
   * @param {String} startingNodeId
   */
  constructor(id, startingNodeId) {
    this.id = id;
    this.startingNodeId = startingNodeId;
  }
}

;// CONCATENATED MODULE: ./src/dto/DialogNodeDTO.js
class DialogNodeDTO {
  /**
   * @param {String} id
   * @param {String | null} nextDialogNodeId
   */
  constructor(id, nextDialogNodeId = null) {
    this.id = id;
    this.nextDialogNodeId = nextDialogNodeId;
  }
}

;// CONCATENATED MODULE: ./src/index.js










/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=lorehub-dialog-player.js.map