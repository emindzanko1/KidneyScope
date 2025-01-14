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

    void rbDeleteFixup(Node<type> *x)
    {
        while (x != root && x->color == BLACK)
        {
            if (x == x->parent->left)
            {
                Node<type> *w = x->parent->right;
                if (w->color == RED)
                { // 1
                    w->color = BLACK;
                    x->parent->color = RED;
                    leftRotate(x->parent);
                    w = x->parent->right;
                }
                if (w->left->color == BLACK && w->right->color == BLACK)
                { // 2
                    w->color = RED;
                    x = x->parent;
                }
                else
                {
                    if (w->left->color == RED)
                    {
                        w->left->color = BLACK;
                        w->color = RED;
                        rightRotate(w);
                        w = x->parent->right;
                    }
                    w->color = x->parent->color;
                    x->parent->color = BLACK;
                    w->right->color = BLACK;
                    leftRotate(x->parent);
                    x = root;
                }
            }
            else
            {
                Node<type> *w = x->parent->left;
                if (w->color == RED)
                {
                    w->color = BLACK;
                    x->parent->color = RED;
                    rightRotate(x->parent);
                    w = x->parent->left;
                }
                if (w->right->color == BLACK && w->left->color == BLACK)
                {
                    w->color = RED;
                    x = x->parent;
                }
                else
                {
                    if (w->right->color == RED)
                    {
                        w->right->color = BLACK;
                        w->color = RED;
                        leftRotate(w);
                        w = x->parent->left;
                    }
                    w->color = x->parent->color;
                    x->parent->color = BLACK;
                    w->left->color = BLACK;
                    rightRotate(x->parent);
                    x = root;
                }
            }
        }
        x->color = BLACK;
    }

    void rbDelete(Node<type> *z)
    {
        Node<type> *x;
        Node<type> *y = z;
        Color yOriginalColor = y->color;

        if (z->left == TNULL)
        {
            x = z->right;
            rbTransplant(z, z->right);
        }
        else if (z->right == TNULL)
        {
            x = z->left;
            rbTransplant(z, z->left);
        }
        else
        {
            y = treeMinimum(z->right);
            yOriginalColor = y->color;
            x = y->right;
            if (y != z->right)
            {
                rbTransplant(y, y->right);
                y->right = z->right;
                y->right->parent = y;
            }
            else
            {
                x->parent = y;
                rbTransplant(z, y);
                y->left = z->left;
                y->left->parent = y;
                y->color = z->color;
            }
            if (yOriginalColor == BLACK)
                rbDeleteFixup(x);
        }
    }

    void rbTransplant(Node<type> *u, Node<type> *v)
    {
        if (u->parent == TNULL)
            root = v;
        else if (u == u->parent->left)
            u->parent->left = v;
        else
            u->parent->right = v;

        v->parent = u->parent;
    }

    Node<type> *treeMinimum(Node<type> *x)
    {
        while (x->left != TNULL)
            x = x->left;
        return x;
    }

    Node<type> *treeMaximum(Node<type> *x)
    {
        while (x->right != TNULL)
            x = x->right;
        return x;
    }

    void destroyTree(Node<type>* node) {
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

    void deleteNode(int key)
    {
        Node<type> *node = root;
        while (node != TNULL)
        {
            if (node->key == key)
            {
                rbDelete(node);
                return;
            }
            if (key < node->key)
            {
                node = node->left;
            }
            else
            {
                node = node->right;
            }
        }
        std::cout << "Cvor s kljucem " << key << " nije pronadjen u stablu. " << std::endl;
    }
};

int main()
{
    RBTree<int> tree;

    // int keys[] = {6, 11, 10, 2, 9, 7, 5, 13, 22, 27, 36, 12, 31};
    // for (int key : keys)
    // {
    //     tree.rbInsert(key);
    // }

    // std::cout << "Sadrzaj stabla nakon umetanja kljuceva: " << std::endl;
    // tree.inorder();

    int choice, key;
    do
    {
        std::cout << "\n--- Meni ---\n";
        std::cout << "1) Umetanje novog cvora\n";
        std::cout << "2) INORDER ispis cvorova\n";
        std::cout << "3) Brisanje cvora\n";
        std::cout << "4) Izlaz\n";
        std::cout << "Unesite opciju: ";
        std::cin >> choice;

        switch (choice)
        {
        case 1:
            std::cout << "Unesite kljuc: ";
            std::cin >> key;
            tree.rbInsert(key);
            break;
        case 2:
            std::cout << "Sadrzaj stabla: ";
            tree.inorder();
            break;
        case 3:
            std::cout << "Unesite kljuc za brisanje: ";
            std::cin >> key;
            tree.deleteNode(key);
            break;
        case 4:
            std::cout << "Izlaz iz programa.\n";
            break;
        default:
            std::cout << "Pogresan unos, pokusajte ponovo.\n";
        }
    } while (choice != 4);

    return 0;
}