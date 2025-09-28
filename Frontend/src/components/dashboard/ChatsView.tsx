import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Paperclip, User, Stethoscope, Clock } from "lucide-react";

export const ChatsView = () => {
  const [selectedChat, setSelectedChat] = useState("dr-priya");
  const [message, setMessage] = useState("");

  const conversations = [
    {
      id: "dr-priya",
      name: "Dr. Priya Sharma",
      role: "Lead Physician",
      avatar: "PS",
      lastMessage: "Please continue with the prescribed herbal supplements",
      lastTime: "2 hours ago",
      unread: 0,
      online: true
    },
    {
      id: "dr-raj",
      name: "Dr. Raj Kumar",
      role: "Therapist",
      avatar: "RK",
      lastMessage: "How are you feeling after yesterday's session?",
      lastTime: "1 day ago",
      unread: 2,
      online: false
    },
    {
      id: "support",
      name: "Support Team",
      role: "Customer Support",
      avatar: "ST",
      lastMessage: "Your appointment has been confirmed",
      lastTime: "3 days ago",
      unread: 0,
      online: true
    }
  ];

  const messages = {
    "dr-priya": [
      {
        id: 1,
        sender: "doctor",
        content: "Good morning John! How are you feeling after yesterday's Abhyanga session?",
        time: "9:30 AM",
        date: "Today"
      },
      {
        id: 2,
        sender: "patient",
        content: "Good morning Dr. Sharma! I'm feeling much more relaxed and my energy levels seem better.",
        time: "9:45 AM",
        date: "Today"
      },
      {
        id: 3,
        sender: "doctor",
        content: "That's wonderful to hear! The treatment is working as expected. Please continue with the prescribed herbal supplements and remember to take them with warm water.",
        time: "10:00 AM",
        date: "Today"
      },
      {
        id: 4,
        sender: "patient",
        content: "Thank you! Should I continue with the morning oil pulling routine?",
        time: "10:15 AM",
        date: "Today"
      },
      {
        id: 5,
        sender: "doctor",
        content: "Yes, absolutely! Oil pulling is very beneficial for your constitution. Continue with coconut oil for another week.",
        time: "10:30 AM",
        date: "Today"
      }
    ],
    "dr-raj": [
      {
        id: 1,
        sender: "doctor",
        content: "Hi John, how are you feeling after yesterday's Shirodhara session?",
        time: "2:00 PM",
        date: "Yesterday"
      },
      {
        id: 2,
        sender: "doctor",
        content: "Please let me know if you experienced any changes in your sleep quality.",
        time: "2:05 PM",
        date: "Yesterday"
      }
    ],
    "support": [
      {
        id: 1,
        sender: "support",
        content: "Hello John! Your appointment for tomorrow at 10:00 AM has been confirmed.",
        time: "3:00 PM",
        date: "3 days ago"
      }
    ]
  };

  const currentConversation = conversations.find(conv => conv.id === selectedChat);
  const currentMessages = messages[selectedChat as keyof typeof messages] || [];

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Chats</h1>
        <p className="text-muted-foreground">Secure communication with your healthcare team</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <MessageSquare className="w-5 h-5 mr-2" />
              Conversations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`
                    p-4 cursor-pointer border-b border-border hover:bg-muted/50 transition-colors
                    ${selectedChat === conversation.id ? 'bg-wellness-light/20 border-l-4 border-l-wellness' : ''}
                  `}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {conversation.avatar}
                        </span>
                      </div>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-wellness rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-foreground truncate">
                          {conversation.name}
                        </h3>
                        {conversation.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{conversation.role}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {conversation.lastTime}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="lg:col-span-2 flex flex-col">
          {currentConversation && (
            <>
              {/* Chat Header */}
              <CardHeader className="border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {currentConversation.avatar}
                      </span>
                    </div>
                    {currentConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-wellness rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{currentConversation.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{currentConversation.role}</span>
                      <span className={`text-xs ${currentConversation.online ? 'text-wellness' : 'text-muted-foreground'}`}>
                        {currentConversation.online ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-xs lg:max-w-md px-4 py-2 rounded-lg
                      ${msg.sender === 'patient' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-wellness-light/20 text-foreground'
                      }
                    `}>
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'patient' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-wellness hover:bg-wellness/90"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};