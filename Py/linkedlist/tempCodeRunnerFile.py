class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
class LinkedList:
    def __init__(self):
        self.head = None
    
    def print_list(self):
        curr_node = self.head
        while curr_node:
            print(curr_node.data)
            curr_node = curr_node.next
    def append(self, data):
         new_node = Node(data)

         if self.head is None:
             self.head = new_node
             return
         last_node = self.head
         while last_node.next: