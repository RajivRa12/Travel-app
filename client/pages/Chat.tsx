import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "http://localhost:3000";

interface Message {
  _id?: string;
  sender: string;
  recipient: string;
  content: string;
  room: string;
  timestamp?: string;
}

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [user, setUser] = useState("customer@example.com"); // Replace with real user
  const [recipient, setRecipient] = useState("agent@example.com"); // Replace with real recipient
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = io(SOCKET_URL);
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleJoin = () => {
    if (socket && room) {
      socket.emit("join", room);
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (socket && input.trim()) {
      const msg: Message = {
        sender: user,
        recipient,
        content: input,
        room,
      };
      socket.emit("send_message", msg);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Real-time Chat</h1>
        {!joined ? (
          <div className="flex flex-col gap-4 w-full max-w-sm">
            <Input
              placeholder="Enter chat room ID (e.g. booking123)"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <Button onClick={handleJoin} disabled={!room} className="w-full">
              Join Room
            </Button>
          </div>
        ) : (
          <div className="w-full max-w-lg flex flex-col h-[60vh] border rounded-lg shadow bg-white">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={msg._id || i}
                  className={`p-2 rounded-lg max-w-xs ${
                    msg.sender === user
                      ? "bg-primary text-white ml-auto"
                      : "bg-muted text-foreground mr-auto"
                  }`}
                >
                  <div className="text-xs opacity-70 mb-1">
                    {msg.sender === user ? "You" : msg.sender}
                  </div>
                  <div>{msg.content}</div>
                  <div className="text-[10px] opacity-50 mt-1 text-right">
                    {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="flex gap-2 p-2 border-t">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1"
                disabled={!joined}
              />
              <Button onClick={handleSend} disabled={!input.trim() || !joined}>
                Send
              </Button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
} 