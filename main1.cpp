#include <iostream>
#include <iomanip>

enum Color
{
    RED,
    BLACK
};

template <typename type>
struct Node
{
    int key;
    Color color;
    Node *left, *right, *parent;

    Node(int key) : key(key), color(RED), left(nullptr), right(nullptr), parent(nullptr) {}
};

template <typename type>
class RBTree
{
private:
    Node<type> *root;
    Node<type> *TNULL;

    void initializeTNULL()
    {
        TNULL = new Node<type>(0);
        TNULL->color = BLACK;
        TNULL->left = nullptr;
        TNULL->right = nullptr;
    }

    void leftRotate(Node<type> *x)
    {
        Node<type> *y = x->right;
        x->right = y->left;

        if (y->left != TNULL)
        {
            y->left->parent = x;
        }

        y->parent = x->parent;

        if (x->parent == TNULL)
            root = y;

        else if (x == x->parent->left)
            x->parent->left = y;

        else
            x->parent->right = y;

        y->left = x;
        x->parent = y;
    }

    void rightRotate(Node<type> *x)
    {
        Node<type> *y = x->left;
        x->left = y->right;

        if (y->left != TNULL)
        {
            y->right->parent = x;
        }

        y->parent = x->parent;

        if (x->parent == TNULL)
            root = y;

        else if (x == x->parent->right)
            x->parent->right = y;

        else
            x->parent->left = y;

        y->right = x;
        x->parent = y;
    }

    void rbInsertFixup(Node<type> *z)
    {
        while (z->parent->color == RED)
        {
            if (z->parent == z->parent->parent->left)
            {
                Node<type> *y = z->parent->parent->right;

                if (y->color == RED)
                {
                    z->parent->color = BLACK;
                    y->color = BLACK;
                    z->parent->parent->color = RED;
                    z = z->parent->parent;
                }
                else
                {
                    if (z == z->parent->right)
                    {
                        z = z->parent;
                        leftRotate(z);
                    }
                    z->parent->color = BLACK;
                    z->parent->parent->color = RED;
                    rightRotate(z->parent->parent);
                }
            }
            else
            {
                Node<type> *y = z->parent->parent->left;

                if (y->color == RED)
                {
                    z->parent->color = BLACK;
                    y->color = BLACK;
                    z->parent->parent->color = RED;
                    z = z->parent->parent;
                }
                else
                {
                    if (z == z->parent->left)
                    {
                        z = z->parent;
                        rightRotate(z);
                    }
                    z->parent->color = BLACK;
                    z->parent->parent->color = RED;
                    leftRotate(z->parent->parent);
                }
            }
        }
        root->color = BLACK;
    }

    void inorderHelper(Node<type> *node)
    {
        if (node != TNULL)
        {
            inorderHelper(node->left);
            std::cout << node->key << " ";
            inorderHelper(node->right);
        }
    }

    void destroyTree(Node<type> *node) {
    if (node != TNULL) {
        destroyTree(node->left);  
        destroyTree(node->right); 
        delete node;              
    }
}

public:
    RBTree()
    {
        initializeTNULL();
        root = TNULL;
    }

    ~RBTree()
    {
        destroyTree(root);
        delete TNULL;
    }

    void rbInsert(type value)
    {
        Node<type> *z = new Node<type>(value);
        Node<type> *x = root;
        Node<type> *y = TNULL;

        while (x != TNULL)
        {
            y = x;

            if (z->key < x->key)
                x = x->left;

            else
                x = x->right;
        }

        z->parent = y;

        if (y == TNULL)
            root = z;

        else if (z->key < y->key)
            y->left = z;

        else
            y->right = z;

        z->left = TNULL;
        z->right = TNULL;
        z->color = RED;
        rbInsertFixup(z);
    }

    void inorder()
    {
        inorderHelper(root);
        std::cout << std::endl;
    }
};

int main()
{
    RBTree<int> tree;
    int choice, key;
    // Node *newNode = nullptr;

    // int keys[] = {6, 11, 10, 2, 9, 7, 5, 13, 22, 27, 36, 12, 31};
    // for (int key : keys)
    // {
    //     Node *newNode = new Node(key);
    //     tree.rbInsert(newNode);
    // }
    // tree.rbInsert(6);
    // tree.rbInsert(11);
    // tree.rbInsert(10);
    // tree.rbInsert(2);
    // tree.rbInsert(9);
    // tree.rbInsert(7);
    // tree.rbInsert(5);
    // tree.rbInsert(13);
    // tree.rbInsert(22);
    // tree.rbInsert(27);
    // tree.rbInsert(36);
    // tree.rbInsert(12);
    // tree.rbInsert(31);
    // std::cout << "Sadržaj stabla nakon umetanja ključeva: " << std::endl;
    // Sadržaj stabla: 2 5 6 7 9 10 11 12 13 22 27 31 36
    // tree.inorder();

    do
    {
        std::cout << "1) Umetanje novog čvora\n";
        std::cout << "2) INORDER ispis čvorova\n";
        std::cout << "3) Izlaz\n";
        std::cout << "Unesite opciju: ";
        std::cout << "\n--- Meni ---\n";
        std::cin >> choice;

        switch (choice)
        {
        case 1:
            std::cout << "Unesite ključ: ";
            std::cin >> key;
            tree.rbInsert(key);
            break;
        case 2:
            std::cout << "Sadržaj stabla: ";
            tree.inorder();
            break;
        case 3:
            std::cout << "Izlaz iz programa.\n";
            break;
        default:
            std::cout << "Pogrešan unos, pokušajte ponovo.\n";
        }
    } while (choice != 3);

    return 0;
}
