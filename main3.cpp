#include <iostream>
#include <cmath>
#include <vector>
#include <limits>
using namespace std;

template <typename type>
struct Node
{
    type key;
    Node *parent;
    Node *child;
    Node *left;
    Node *right;
    int degree;
    bool mark;

    Node(type key) : key(key), parent(nullptr), child(nullptr), left(this), right(this), degree(0), mark(false) {}
};

template <typename type>
class FibHeap
{
private:
    Node<type> *minNode;
    int numNodes;

    void addToRootList(Node<type> *node)
    {
        if (minNode == nullptr)
        {
            minNode = node;
        }
        else
        {
            node->left = minNode;
            node->right = minNode->right;
            minNode->right->left = node;
            minNode->right = node;
            if (node->key < minNode->key)
            {
                minNode = node;
            }
        }
    }

    void consolidate()
    {
        int maxDegree = static_cast<int>(log2(numNodes)) + 1;
        vector<Node<type> *> degreeTable(maxDegree, nullptr);

        vector<Node<type> *> nodes;
        Node<type> *current = minNode;
        if (current)
        {
            do
            {
                nodes.push_back(current);
                current = current->right;
            } while (current != minNode);
        }

        for (Node<type> *node : nodes)
        {
            int d = node->degree;
            while (degreeTable[d] != nullptr)
            {
                Node<type> *other = degreeTable[d];
                if (node->key > other->key)
                {
                    swap(node, other);
                }
                fibHeapLink(other, node);
                degreeTable[d] = nullptr;
                d++;
            }
            degreeTable[d] = node;
        }

        minNode = nullptr;
        for (Node<type> *root : degreeTable)
        {
            if (root)
            {
                addToRootList(root);
            }
        }
    }

    void fibHeapLink(Node<type> *child, Node<type> *parent)
    {
        child->left->right = child->right;
        child->right->left = child->left;

        if (parent->child == nullptr)
        {
            parent->child = child;
            child->left = child->right = child;
        }
        else
        {
            child->left = parent->child;
            child->right = parent->child->right;
            parent->child->right->left = child;
            parent->child->right = child;
        }

        child->parent = parent;
        parent->degree++;
        child->mark = false;
    }

public:
    FibHeap() : minNode(nullptr), numNodes(0) {}

    void insert(type key)
    {
        Node<type> *node = new Node<type>(key);
        addToRootList(node);
        numNodes++;
    }

    // void merge(FibHeap<type>& other) {
    //     if (other.minNode == nullptr) {
    //         return;
    //     }

    //     if (minNode == nullptr) {
    //         minNode = other.minNode;
    //     } else {
    //         Node<type>* thisRight = minNode->right;
    //         Node<type>* otherLeft = other.minNode->left;

    //         minNode->right = other.minNode;
    //         other.minNode->left = minNode;
    //         thisRight->left = otherLeft;
    //         otherLeft->right = thisRight;

    //         if (other.minNode->key < minNode->key) {
    //             minNode = other.minNode;
    //         }
    //     }

    //     numNodes += other.numNodes;
    //     other.minNode = nullptr;
    //     other.numNodes = 0;
    // }

    void merge(FibHeap &other)
    {
        if (other.minNode == nullptr)
        {
            return;
        }

        if (minNode == nullptr)
        {
            minNode = other.minNode;
        }
        else
        {
            // Povezivanje dve kružno povezane liste
            Node<type> *thisRight = minNode->right;
            Node<type> *otherLeft = other.minNode->left;

            minNode->right = other.minNode;
            other.minNode->left = minNode;

            thisRight->left = otherLeft;
            otherLeft->right = thisRight;

            // Ažuriranje minimalnog čvora
            if (other.minNode->key < minNode->key)
            {
                minNode = other.minNode;
            }
        }

        // Ažuriranje broja čvorova
        numNodes += other.numNodes;

        // Resetovanje druge gomile
        other.minNode = nullptr;
        other.numNodes = 0;
    }

    type extractMin()
    {
        if (minNode == nullptr)
        {
            throw runtime_error("Heap is empty.");
        }

        Node<type> *oldMin = minNode;
        if (oldMin->child)
        {
            Node<type> *child = oldMin->child;
            do
            {
                Node<type> *next = child->right;
                addToRootList(child);
                child->parent = nullptr;
                child = next;
            } while (child != oldMin->child);
        }

        oldMin->left->right = oldMin->right;
        oldMin->right->left = oldMin->left;

        if (oldMin == oldMin->right)
        {
            minNode = nullptr;
        }
        else
        {
            minNode = oldMin->right;
            consolidate();
        }

        type minKey = oldMin->key;
        delete oldMin;
        numNodes--;
        return minKey;
    }

    bool isEmpty() const
    {
        return minNode == nullptr;
    }

    void print()
    {
        if (minNode == nullptr)
        {
            cout << "Heap is empty." << endl;
            return;
        }

        cout << "Heap contains: ";
        Node<type> *current = minNode;
        do
        {
            cout << current->key << " ";
            current = current->right;
        } while (current != minNode);
        cout << endl;
    }
};

template <typename type>
void testInsert(FibHeap<type> &heap)
{
    cout << "Testing Insert...\n";
    heap.insert(10);
    heap.insert(20);
    heap.insert(5);
    heap.print();
}

template <typename type>
void testExtractMin(FibHeap<type> &heap)
{
    cout << "Testing Extract Min...\n";
    cout << "Minimum extracted: " << heap.extractMin() << endl;
    heap.print();
}

template <typename type>
void testUnion(FibHeap<type> &heap1, FibHeap<type> &heap2)
{
    cout << "Testing Union...\n";
    heap1.merge(heap2);
    heap1.print();
}

int main()
{
    FibHeap<int> heap1, heap2;

    testInsert(heap1);
    testInsert(heap2);

    testUnion(heap1, heap2);

    testExtractMin(heap1);

    return 0;
}
