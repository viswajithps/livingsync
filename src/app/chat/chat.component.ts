import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

interface Chat {
  name: string;
  lastMessage: string;
  time: string;
  status: string;
  tags: string[];
}

interface Message {
  text: string;
  time: string;
  sender: string;
  type: 'sent' | 'received';
}



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink,NavbarComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {


  chats: Chat[] = [
    { name: 'Main Group', lastMessage: 'Haha oh man 😂', time: '12m', status: 'active', tags: ['Question', 'Help wanted'] },
    { name: 'Diwali', lastMessage: 'woohooep', time: '24m', status: '', tags: [''] },
    { name: 'Yoga', lastMessage: 'Haha that’s terrifying 😂', time: '1h', status: '', tags: ['Bug', 'Hacktoberfest'] },
    { name: '1st Floor', lastMessage: 'omg, this is amazing', time: '5h', status: '', tags: ['Question', 'Some content'] },
  ];

   // Messages for each chat
   chatMessages: { [key: string]: Message[] } = {
    'Main Group': [
      { text: 'omg, this is amazing', time: '12m', sender: 'received', type: 'received' },
      { text: 'perfect!👌', time: '11m', sender: 'sent', type: 'sent' },
      { text: 'Wow, this is really epic', time: '10m', sender: 'received', type: 'received' },
      { text: 'How are you?', time: '9m', sender: 'sent', type: 'sent' },
      { text: 'just ideas for next time', time: '8m', sender: 'received', type: 'received' },
      { text: 'I’ll be there in 2 mins', time: '7m', sender: 'sent', type: 'sent' },
      { text: 'woohoooo', time: '6m', sender: 'received', type: 'received' },
      { text: 'Haha oh man', time: '5m', sender: 'sent', type: 'sent' },
      { text: 'Haha that’s terrifying 😂', time: '4m', sender: 'received', type: 'received' },
      { text: 'aww', time: '3m', sender: 'sent', type: 'sent' },
    ],
    'Diwali': [
      // Messages for Diwali chat
      { text: 'Happy Diwali!', time: '15m', sender: 'received', type: 'received' },
      { text: 'Thanks! Same to you!', time: '14m', sender: 'sent', type: 'sent' }
    ],
    // Add messages for other chats similarly
  };

  selectedChat: string = 'Main Group';
  messages: Message[] = this.chatMessages[this.selectedChat];

  newMessage='';
  newChatName: string = ''; // For new chat input

  showModal: boolean = false; // Flag to control modal visibility

  searchTerm: string = '';

  get filteredChats(): Chat[] {
    if (!this.searchTerm) {
      return this.chats;
    }
    return this.chats.filter(chat => chat.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

  sendMessage(){
    if (this.newMessage.trim()) {
      // Add new message to the messages array
      this.messages.push({
        text: this.newMessage,
        time: 'Just now', // You can modify this to the current time if needed
        sender: 'sent',
        type: 'sent'
      });
      
      // Clear the new message input
      this.newMessage = '';
  }
}

selectChat(chatName: string) {
  this.selectedChat = chatName;
  this.messages = this.chatMessages[chatName];
}

newGroup() {
  this.showModal = true;
}

closeNewChatModal() {
  this.showModal = false;
}

addNewChat() {
  if (this.newChatName.trim() && !this.chats.some(chat => chat.name === this.newChatName)) {
    // Add the new chat to the chats list
    this.chats.push({
      name: this.newChatName,
      lastMessage: '',
      time: 'Just now',
      status: '',
      tags: []
    });

    // Initialize empty messages for the new chat
    this.chatMessages[this.newChatName] = [];
    this.newChatName = '';
    this.showModal = false;
  }
}

}
