import Tree from "./bst";

describe('BST Tests (All Methods', () => {
  describe('BST Basic Functionality', () => {
    let bst;

    beforeEach(() => {
      const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
      bst = new Tree(arr);
    });

    test('tree is created and contains values', () => {
      expect(bst.includes(1)).toBe(true);
      expect(bst.includes(23)).toBe(true);
      expect(bst.includes(999)).toBe(false);
    });

    test('insert adds new values', () => {
      bst.insert(150);
      bst.insert(200);

      expect(bst.includes(150)).toBe(true);
      expect(bst.includes(200)).toBe(true);
    });

    test('insert does not duplicate values', () => {
      bst.insert(7);
      bst.insert(7);

      // still only one 7 exists (indirect check via traversal)
      let count = 0;
      bst.inOrderForEach(v => {
        if (v === 7) count++;
      });

      expect(count).toBe(1);
    });

    test('delete removes leaf node', () => {
      bst.deleteItem(5);
      expect(bst.includes(5)).toBe(false);
    });

    test('delete removes node with one child', () => {
      bst.insert(150);
      bst.deleteItem(150);

      expect(bst.includes(150)).toBe(false);
    });

    test('delete removes node with two children', () => {
      bst.deleteItem(7);
      expect(bst.includes(7)).toBe(false);
    });
  });

  describe('Traversal Tests', () => {
    let bst;

    beforeEach(() => {
      const arr = [1, 7, 4, 23, 8, 9, 3, 5];
      bst = new Tree(arr);
    });

    test('inOrder traversal returns sorted values', () => {
      const result = [];
      bst.inOrderForEach(v => result.push(v));

      const sorted = [...result].sort((a, b) => a - b);
      expect(result).toEqual(sorted);
    });

    test('levelOrder traversal visits all nodes', () => {
      const result = [];
      bst.levelOrderForEachIterative(v => result.push(v));

      expect(result.length).toBeGreaterThan(0);
    });

    test('preOrder and postOrder run without errors', () => {
      const pre = [];
      const post = [];

      bst.preOrderForEach(v => pre.push(v));
      bst.postOrderForEach(v => post.push(v));

      expect(pre.length).toBeGreaterThan(0);
      expect(post.length).toBeGreaterThan(0);
    });
  });

  describe('Depth and Height', () => {
    let bst;

    beforeEach(() => {
      const arr = [1, 7, 4, 23, 8, 9, 3, 11];
      bst = new Tree(arr);
    });

    test('depth returns correct value', () => {
      expect(bst.depth(7)).toBe(0); // root
      expect(bst.depth(3)).toBeGreaterThan(0);
    });

    test('height returns correct value', () => {
      expect(bst.height(7)).toBeGreaterThanOrEqual(0);
      expect(bst.height(23)).toBe(0); // leaf
    });

    test('height returns undefined for missing node', () => {
      expect(bst.height(999)).toBeUndefined();
    });
  });

  describe('Balance Tests', () => {
    test('balanced tree returns true', () => {
      const arr = [1, 7, 8, 9, 4, 3, 11];
      const balanced = new Tree(arr);

      expect(balanced.isBalanced()).toBe(true);
    });

    test('tree becomes unbalanced after skewed inserts', () => {
      const bst = new Tree([10, 20, 30]);

      bst.insert(100);
      bst.insert(200);
      bst.insert(300);

      expect(bst.isBalanced()).toBe(false);
    });

    test('rebalance restores balance', () => {
      const bst = new Tree([10, 20, 30]);

      bst.insert(100);
      bst.insert(200);
      bst.insert(300);

      expect(bst.isBalanced()).toBe(false);

      bst.rebalance();

      expect(bst.isBalanced()).toBe(true);
    });
  });
});

const randomArray = () => {
  let arr = [];
  for(let i = 0; i < 10; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}

describe('Driver Script By The Odin Project', () => {
  // const bst = new Tree(randomArray());
  const arr = [30, 20, 50, 70, 60, 10, 40, 90, 80, 0];
  const bst = new Tree(arr);

  test('confirm the tree is balanced', () => {
    expect(bst.isBalanced()).toBe(true);
  });

  test('printing all the elements in the tree', () => {
    const levelOrder = [];
    const inOrder = [];
    const preOrder = [];
    const postOrder = [];
    bst.levelOrderForEachIterative(item => levelOrder.push(item));
    bst.inOrderForEach(item => inOrder.push(item));
    bst.preOrderForEach(item => preOrder.push(item));
    bst.postOrderForEach(item => postOrder.push(item));
    expect(levelOrder).toEqual([40, 10, 70, 0, 20, 50, 80, 30, 60, 90]);
    expect(inOrder).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90]);
    expect(preOrder).toEqual([40, 10, 0, 20, 30, 70, 50, 60, 80, 90]);
    expect(postOrder).toEqual([0, 30, 20, 10, 60, 50, 90, 80, 70, 40]);
  });

  test('confirm the tree is un-balanced', () => {
    bst.insert(150);
    bst.insert(200);
    bst.insert(300);
    expect(bst.isBalanced()).toBe(false);
  });

  test('balancing the tree and confirm', () => {
    bst.rebalance();
    expect(bst.isBalanced()).toBe(true);
  });

  test('printing all the elements in the tree', () => {
    const levelOrder = [];
    const inOrder = [];
    const preOrder = [];
    const postOrder = [];
    bst.levelOrderForEachIterative(item => levelOrder.push(item));
    bst.inOrderForEach(item => inOrder.push(item));
    bst.preOrderForEach(item => preOrder.push(item));
    bst.postOrderForEach(item => postOrder.push(item));
    expect(levelOrder).toEqual([60, 20, 90, 0, 40, 70, 200, 10, 30, 50, 80, 150, 300]);
    expect(inOrder).toEqual([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 150, 200, 300]);
    expect(preOrder).toEqual([60, 20, 0, 10, 40, 30, 50, 90, 70, 80, 200, 150, 300]);
    expect(postOrder).toEqual([10, 0, 30, 50, 40, 20, 80, 70, 150, 300, 200, 90, 60]);
  });
});
