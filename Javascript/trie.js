/*
    Trie is a Tree like data structure mostly used to store data that needs to be 
    accessed frequently. This is because it minimizes the search complexities and 
    data can be retrieved in O(M) time where M is the length of the data. 
    It can be visualized using graph.
*/

class Node {
    constructor() {
        this.children = {};
        this.isWordEnd = false; 
  }
}
class Trie {
    constructor() {
        this.root = new Node(); // root node of Trie
    }
    
    // insert data to Trie
    insertData(data) {
        let current = this.root;
        for(const d of data){
            if (!current.children.hasOwnProperty(d)) {
                current.children[d] = new Node();
            }
            current = current.children[d];
        }
        current.isWordEnd = true;
    }
    
    // search data in the Trie
    containsWord(data) {
        let current = this.root;
        for(const d of data){
            if (!current.children.hasOwnProperty(d)) {
                return false;
            }
            current = current.children[d];
        }
        return current.isWordEnd;
    }

    // find all words in the Trie with specific prefix 
    findWords(prefix) {
        let current = this.root;
        for(const p of prefix){
            if (!current.children.hasOwnProperty(p)) {
                return false;
            }
            current = current.children[p];
        }
        return this.findAllWords(current, [], prefix)
    }

    findAllWords(current=this.root, output=[], pre=""){
        
        if(current.isWordEnd){
            output.push(pre);
        }
        for(let [key, child] of Object.entries(current.children)){
            this.findAllWords(child, output, pre+key);
        }

        return output;
    }

    // remove data in the Trie
    removeData(data) {
        let current = this.root;
        for(const d of data){
            if (!current.children.hasOwnProperty(d)) {
                return false;
            }
            current = current.children[d];
        }
        if(current.isWordEnd){
            current.isWordEnd = false;
            return true;
        }
        return false;
    }
}

const trie = new Trie();
trie.insertData("apple");
trie.insertData("able");
trie.insertData("cat");
trie.insertData("Done");
trie.insertData("Do");
console.log(trie.containsWord("Do"));
console.log(trie.findAllWords());
console.log(trie.findWords("D"));
console.log(trie.removeData("Do"));
console.log(trie.findAllWords());