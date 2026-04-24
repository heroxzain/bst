const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) { return; }
  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

class QueueNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.queue = null;
    this.front = null;
    this.back = null;
  }

  enqueue(value) {
    if(this.queue === null) {
      this.queue = new QueueNode(value);
      this.front = this.queue;
      this.back = this.queue;
      return;
    }
    this.back.next = new QueueNode(value);
    this.back = this.back.next;
  }

  dequeue() {
    const temp = this.queue;
    this.queue = this.queue.next;
    this.front = temp.next;
    return temp.data;
  }

  isEmpty() {
    return this.queue === null;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const result = this.#clean(arr);
    this.root = this.#buildTree(result, 0, result.length - 1); 
  }

  #buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);

    return root;
  }

  #clean(arr) {
    return Array.from(new Set(arr)).sort((a, b) => a-b);
  }


  includes(value) {
    return this.#traversal(value, this.root);
  }

  #traversal(value, root) {
    if (root === undefined || root === null) return false;
    if (root.data === value) return true;
    else if (root.data > value) return this.#traversal(value, root.left);
    else return this.#traversal(value, root.right);
  }


  insert(value) {
    this.root = this.#insertion(value, this.root);
  }

  #insertion(value, root) {
    if (root === null || root === undefined) return new Node(value);
    if (root.data === value) return root;
    if (root.data > value) 
      root.left = this.#insertion(value, root.left);
    else 
      root.right = this.#insertion(value, root.right);
    return root;
  }

  deleteItem(value) {
    this.root = this.#deletion(value, this.root);    
  }

  #getSuccessor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null)
          curr = curr.left;
      return curr;
  }

  #deletion(value, root) {
    if (root === null) return null;
    if (root.data > value) 
      root.left = this.#deletion(value, root.left);
    else if (root.data < value)
      root.right = this.#deletion(value, root.right);
    else {
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      const succ = this.#getSuccessor(root);
      root.data = succ.data;
      root.right = this.#deletion(succ.data, root.right)
    }
    return root;
  }

  levelOrderForEachIterative(callback) {
    if (typeof callback != "function")
      throw new Error("A callback function is required!")
    if (this.root === null) return;

    const queue = new Queue();
    queue.enqueue(this.root);

    while(!queue.isEmpty()) {
      const current = queue.dequeue();
      callback(current.data);
      if(current.left !== null) 
        queue.enqueue(current.left);
      if(current.right !== null) 
        queue.enqueue(current.right);
    }
  }

  levelOrderForEachRecursive(callback) {
    if (typeof callback != "function")
      throw new Error("A callback function is required!")
    if (this.root === null) return;

    const queue = new Queue();
    queue.enqueue(this.root);
    this.#levelOrder(callback, queue);
  }

  #levelOrder(callback, queue) {
    if (queue.isEmpty()) return;
    const current = queue.dequeue();
    callback(current.data);
    if(current.left !== null) 
      queue.enqueue(current.left);
    if(current.right !== null) 
      queue.enqueue(current.right);
    this.#levelOrder(callback, queue);
  }

  inOrderForEach(callback) {
    if (typeof callback != "function")
      throw new Error("A callback function is required!")
    this.#inOrder(callback, this.root);
  }

  #inOrder(callback, root) {
    if (root === null) return;
    this.#inOrder(callback, root.left);
    callback(root.data);
    this.#inOrder(callback, root.right);
  }

  preOrderForEach(callback) {
    if (typeof callback != "function")
      throw new Error("A callback function is required!")
    this.#preOrder(callback, this.root);
  }

  #preOrder(callback, root) {
    if (root === null) return;
    callback(root.data);
    this.#preOrder(callback, root.left);
    this.#preOrder(callback, root.right);
  }

  postOrderForEach(callback) {
    if (typeof callback != "function")
      throw new Error("A callback function is required!")
    this.#postOrder(callback, this.root);
  }

  #postOrder(callback, root) {
    if (root === null) return;
    this.#postOrder(callback, root.left);
    this.#postOrder(callback, root.right);
    callback(root.data);
  }

  depth(value) {
    return this.#findDepth(value, this.root);
  }

  #findDepth(value, root) {
    if (root === null) return;
    if (value > root.data) {
      const result = this.#findDepth(value, root.right);
      return result + 1 ?? result;
    } else if (value < root.data) {
      const result = this.#findDepth(value, root.left);
      return result + 1 ?? result;
    } else return 0; 
  }

  height(value) {
    const node = this.#findNode(value, this.root);
    if (!node) return;
    return this.#findHeight(node);
  }

  #findNode(value, root) {
    if (root === null) return;
    if (root.data === value) return root;
    else if (root.data > value) return this.#findNode(value, root.left);
    return this.#findNode(value, root.right);
  }

  #findHeight(root) {
    if (root === null) return -1;
    const left = this.#findHeight(root.left);
    const right = this.#findHeight(root.right);
    return Math.max(left, right) + 1;
  }

  isBalanced() {
    return this.#checkBalance(this.root) !== -1;
  }

  #checkBalance(root) {
    if (root === null) return 0;
    const left = this.#checkBalance(root.left);
    if (left === -1) return -1;
    const right = this.#checkBalance(root.right);
    if (right === -1) return -1;

    if(Math.abs(left - right) > 1) return -1;
    return Math.max(left, right) + 1;
  }

  rebalance() {
    if (this.isBalanced()) return;
    const arr = [];
    this.inOrderForEach((v) => arr.push(v));
    this.root = this.#buildTree(arr, 0, arr.length - 1); 
  }
}


export default Tree;
