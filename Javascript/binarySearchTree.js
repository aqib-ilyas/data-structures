/** 
 *  In this problem, We will create binary search tree from the input array
 * 
 *  Description of BST:
 *      Binary search tree is a data structure that quickly allows us to maintain a sorted list of data.
 *      Each tree node has a maximum of two children and it can be used to search for the presence of data in O(log(n)) time.

 *      The properties that separate a binary search tree from a regular binary tree are:
 *
 *          1. Data in all nodes of left subtree is less than the root node
 *          2. Data in all nodes of right subtree are greater than the root node
 *          3. Both subtrees of each node are also BSTs i.e. they have the above two properties
 * 
 *  @param []: int
 *  Output: Tree
 */


// Node represent single data element in the tree
class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/* Binary search tree will perform following operations:
    1. Insertion: Insert a node at proper position
    2. Deletion: Delete a node
    3. Searching: Search whether a node exists in the tree
    4. Traversal: Traversing the tree
*/

class BinarySearchTree{
    constructor(){
        this.root = null;
    }
    
    // Insertion
    insert(value){
        var newNode = new Node(value);
        if(this.root === null){
            this.root = newNode;
            return this;
        }
        let current = this.root;
        while(current){
            if(value === current.value) return undefined;
            if(value < current.value){
                if(current.left === null){
                    current.left = newNode;
                    return this;
                }
                current = current.left;
            } else {
                if(current.right === null){
                    current.right = newNode;
                    return this;
                } 
                current = current.right;
            }
        }
    }
    
    
    // Deletion: 
    // Deletion of leaf node results in null value
    // Deletion of node with single child results in replacement 
    // otherwise, deleted node will be replaced with minimum data node from it's right subtree

    remove(value){
        if(this.root === null) return undefined;
        
        let current = this.root;
        while(current){
            if(value === current.value){
                return this.root = this.deleteNode(current, value);
            }
            if(value < current.value){
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return undefined;
    }
    
    deleteNode(current, value){
        if(current.left === null && current.right === null) return null;
        else if(current.left === null) return current = current.right;
        else if(current.right === null) return current = current.left;
        else{
            let temp = this.smallestNode(current.right);
            current.value = temp.value;
            current.right = this.deleteNode(current.right, current.value);
            return current;
        }
    }
    
    /// helper function to find the smallest node
    
    smallestNode(node) {
        while(!node.left === null)
            node = node.left
        return node
    }
    
    
    // Searching
    search(value){
      if(!this.root) return false;
      
      let current = this.root;
      let found = false;
      while(current && !found){
            if(value < current.value) current = current.left;
            else if(value > current.value) current = current.right;
            else found = current; 
        }
        return found ? found : false;
    }
    
    // traversal in binary search tree
    
    // in-order-traversal left-root-right
    inOrder() {
        let visited = [],
        current = this.root;

        let traverse = node => {
            if (node.left) traverse(node.left);
            visited.push(node.value);
            if (node.right) traverse(node.right);
        };

        traverse(current);
        return visited;
    }
    
    // post-order-traversal left-right-root
    postOrder() {
        let visited = [],
        current = this.root;

        let traverse = node => {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            visited.push(node.value);
        };

        traverse(current);
        return visited;
    }
    
    // pre-order-traversal root-left-right
    preOrder() {
        let visited = [],
        current = this.root;

        let traverse = node => {
            visited.push(node.value);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        };

        traverse(current);
        return visited;
    }
    
}


// Creating a binary tree
const input = [10, 7, 14, 20, 1, 5, 8];
let bst = new BinarySearchTree();
for(let i = 0; i < input.length; i++){
    bst.insert(input[i]);
}
console.log(bst.inOrder());
console.log(bst.search(27));
console.log(bst.remove(35));
console.log(bst.postOrder());
console.log(bst.preOrder());