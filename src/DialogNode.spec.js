import Dialog from "./Dialog";
import DialogNode from "./DialogNode";
import DialogTextContent from "./DialogTextContent";

const testContent = new DialogTextContent(
  "9BEB03C5-867C-4355-AEBD-D3A64C82FFAA",
  "test content"
);

describe("DialogNode.ctor", () => {
  it("correct data and next node is null, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = null;

    // act
    const node = new DialogNode(id, [testContent], nextNode);

    // assert
    expect(node.id).toBe(id);
    expect(node.nextNode).toBe(nextNode);
    expect(node.content[0]).toBe(testContent);
  });

  it("correct data and next node is not null, should create", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    // act
    const node = new DialogNode(id, testContent, nextNode);

    // assert
    expect(node.id).toBe(id);
    expect(node.nextNode).toBe(nextNode);
  });

  it("correct data and content is not array, should add as array", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    // act
    const node = new DialogNode(id, testContent, nextNode);

    // assert
    expect(node.content[0]).toBe(testContent);
  });
});

describe("DialogNode.subscribe", () => {
  it("subscriber, should add to subscribers", () => {
    // arrange
    const observer = {
      isEventFired: false,
      onNext(e) {
        this.isEventFired = true;
      },
    };

    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    const node = new DialogNode(id, testContent, nextNode);

    // act
    node.subscribe(observer);

    // assert
    expect(node.subscribers[0]).toBe(observer);
  });

  it("subscriber doenst have onNext function, should throw", () => {
    // arrange
    const observer = {};

    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    const node = new DialogNode(id, testContent, nextNode);

    // act
    const action = () => node.subscribe(observer);

    // assert
    expect(action).toThrow();
  });
});

describe("DialogNode.unsubscribe", () => {
  it("unsubscribe, should remove from subscribers", () => {
    // arrange
    const observer = {
      isEventFired: false,
      onNext(e) {
        this.isEventFired = true;
      },
    };

    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    const node = new DialogNode(id, testContent, nextNode);
    node.subscribe(observer);

    // act
    node.unsubscribe(observer);

    // assert
    expect(node.subscribers.length).toBe(0);
  });
});

describe("DialogNode.goNext", () => {
  it("next node is null, should throw", () => {
    // arrange
    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = null;
    const node = new DialogNode(id, testContent, nextNode);

    // act
    const action = () => node.goNext;

    // assert
    expect(action()).toThrow();
  });

  it("next node is presented, should rise event", () => {
    // arrange
    const observer = {
      isEventFired: false,
      onNext(e) {
        this.isEventFired = true;
      },
    };

    const id = "8C3D3BCD-BCE3-49C4-8F52-9586FE1A31B9";
    const nextNode = new DialogNode(
      "77EB32BA-3560-4D93-B322-983A26AF51A9",
      testContent,
      null
    );

    const node = new DialogNode(id, testContent, nextNode);
    node.subscribe(observer);

    // act
    node.goNext();

    // assert
    expect(observer.isEventFired).toEqual(true);
  });
});
