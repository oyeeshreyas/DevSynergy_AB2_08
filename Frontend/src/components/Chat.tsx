import  { useState, useRef, useEffect } from 'react';
import { MessageSquare,  Send, Mic, Play, Pause, ChevronRight, X, Image, ShoppingBasket,  Check, IndianRupee } from 'lucide-react';

// Types
type MessageType = 'text' | 'voice' | 'offer';

interface Offer {
  price: number;
  quantity: number;
  unit: string;
  product: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'FarmDirect';
  timestamp: Date;
  type: MessageType;
  duration?: number; // For voice messages
  offer?: Offer; // For offer messages
  image?: string; // For messages with images
}

interface QuickReply {
  id: string;
  text: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Welcome to FarmDirect! How can I help with your order today?',
      sender: 'FarmDirect',
      timestamp: new Date(Date.now() - 3600000),
      type: 'text',
    },
    {
      id: '2',
      content: 'I\'m interested in ordering organic tomatoes for my restaurant.',
      sender: 'user',
      timestamp: new Date(Date.now() - 3000000),
      type: 'text',
    },
    {
      id: '3',
      content: 'Great! We have fresh organic tomatoes available. How many pounds are you looking for?',
      sender: 'FarmDirect',
      timestamp: new Date(Date.now() - 2400000),
      type: 'text',
    },
    {
      id: '4',
      content: '',
      sender: 'user',
      timestamp: new Date(Date.now() - 1800000),
      type: 'offer',
      offer: {
        price: 3.50,
        quantity: 25,
        unit: 'lbs',
        product: 'Organic Tomatoes',
        status: 'pending'
      }
    },
    {
      id: '5',
      content: '',
      sender: 'FarmDirect',
      timestamp: new Date(Date.now() - 1700000),
      type: 'offer',
      offer: {
        price: 3.75,
        quantity: 25,
        unit: 'lbs',
        product: 'Organic Tomatoes',
        status: 'pending'
      }
    },
    {
      id: '6',
      content: 'voice-message-1',
      sender: 'user',
      timestamp: new Date(Date.now() - 1600000),
      type: 'voice',
      duration: 8,
    },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerDetails, setOfferDetails] = useState<Offer>({
    price: 0,
    quantity: 0,
    unit: 'lbs',
    product: '',
    status: 'pending'
  });
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const quickReplies: QuickReply[] = [
    { id: 'qr1', text: 'Accept offer' },
    { id: 'qr2', text: 'Counter offer' },
    { id: 'qr3', text: 'Need delivery by Friday' },
    { id: 'qr4', text: 'Can you do bulk discount?' },
  ];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    const typingTimeout = setTimeout(() => {
      setIsTyping(false);
    }, 3000);

    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '' && !attachedImage) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
      image: attachedImage || undefined
    };
    
    setMessages([...messages, newMessage]);
    setInputMessage('');
    setAttachedImage(null);
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thanks for your message. Let me check our inventory and get back to you with the best price for that quantity.',
        sender: 'FarmDirect',
        timestamp: new Date(),
        type: 'text',
      };
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 3000);
  };

  const handleQuickReply = (reply: QuickReply) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content: reply.text,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    
    setMessages([...messages, newMessage]);
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate response after a short delay
    setTimeout(() => {
      let responseContent = '';
      
      switch(reply.text) {
        case 'Accept offer':
          responseContent = 'Great! I\'ve confirmed your order. We\'ll deliver 25 kg of organic tomatoes at ₹75/kg by Wednesday. Would you like a confirmation email?';
          // Update the last offer status
          setMessages(prev => 
            prev.map(msg => 
              msg.type === 'offer' && msg.sender === 'FarmDirect' && msg.offer?.status === 'pending'
                ? {...msg, offer: {...msg.offer, status: 'accepted'}}
                : msg
            )
          );
          break;
        case 'Counter offer':
          setShowOfferModal(true);
          responseContent = 'I\'m open to discussing the price. What did you have in mind?';
          break;
        case 'Need delivery by Friday':
          responseContent = "We can definitely arrange delivery by Friday. There is no extra charge for this delivery date. Would you like to proceed with the order?";
          break;
        case 'Can you do bulk discount?':
          responseContent = 'For orders over 50 kg, we offer a 10% discount. Would you like to increase your order to qualify for the discount?';
          break;
        default:
          responseContent = 'Thank you for your message. How else can I help with your order today?';
      }
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'FarmDirect',
        timestamp: new Date(),
        type: 'text',
      };
      
      setMessages(prev => [...prev, responseMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    
    if (isRecording) {
      // Simulate ending recording and sending voice message
      const newVoiceMessage: Message = {
        id: Date.now().toString(),
        content: `voice-message-${messages.length + 1}`,
        sender: 'user',
        timestamp: new Date(),
        type: 'voice',
        duration: Math.floor(Math.random() * 20) + 5, // Random duration between 5-25 seconds
      };
      
      setMessages([...messages, newVoiceMessage]);
      
      // Simulate typing indicator
      setIsTyping(true);
      
      // Simulate response after a short delay
      setTimeout(() => {
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: 'I listened to your voice message. Let me check with our farm manager about your request and get back to you shortly.',
          sender: 'FarmDirect',
          timestamp: new Date(),
          type: 'text',
        };
        setMessages(prev => [...prev, responseMessage]);
        setIsTyping(false);
      }, 3000);
    }
  };

  const toggleVoicePlayback = (messageId: string) => {
    if (playingVoiceId === messageId) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(messageId);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleAttachImage = () => {
    // Simulate attaching an image
    const randomImage = `https://source.unsplash.com/random/800x600/?organic,vegetables&${Date.now()}`;
    setAttachedImage(randomImage);
  };

  const handleSubmitOffer = () => {
    if (offerDetails.price <= 0 || offerDetails.quantity <= 0 || !offerDetails.product) {
      return; // Don't submit invalid offers
    }
    
    const newOfferMessage: Message = {
      id: Date.now().toString(),
      content: '',
      sender: 'user',
      timestamp: new Date(),
      type: 'offer',
      offer: {...offerDetails, status: 'pending'}
    };
    
    setMessages([...messages, newOfferMessage]);
    setShowOfferModal(false);
    setOfferDetails({
      price: 0,
      quantity: 0,
      unit: 'lbs',
      product: '',
      status: 'pending'
    });
    
    // Simulate typing indicator
    setIsTyping(true);
    
    // Simulate counter offer after a short delay
    setTimeout(() => {
      const counterOffer = {
        ...offerDetails,
        price: offerDetails.price + 0.25, // Slightly higher price
        status: 'pending' as const
      };
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        sender: 'FarmDirect',
        timestamp: new Date(),
        type: 'offer',
        offer: counterOffer
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Follow up with text explanation
      setTimeout(() => {
        const followUpMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: `I can offer ${counterOffer.quantity} ${counterOffer.unit} of ${counterOffer.product} at $${counterOffer.price.toFixed(2)}/${counterOffer.unit}. This price includes delivery and our quality guarantee.`,
          sender: 'FarmDirect',
          timestamp: new Date(),
          type: 'text',
        };
        
        setMessages(prev => [...prev, followUpMessage]);
        setIsTyping(false);
      }, 1000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 relative">
      {/* Floating Chat Button (visible when chat is closed) */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all duration-300 z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}
      
      {/* Chat Window */}
      <div 
        className={`w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 ${
          isChatOpen 
            ? 'h-[600px] opacity-100 fixed bottom-4 right-4 sm:relative sm:bottom-0 sm:right-0 z-50' 
            : 'h-0 opacity-0'
        }`}
        style={{ maxHeight: isChatOpen ? '90vh' : '0' }}
      >
        {/* Chat Header */}
        <div className="bg-green-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-full">
              <MessageSquare className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-bold">FarmDirect Negotiation</h2>
              <p className="text-xs text-green-100">Online | Farmer John</p>
            </div>
          </div>
          <button 
            onClick={() => setIsChatOpen(false)} 
            className="text-white hover:bg-green-700 rounded-full p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex flex-col max-w-[80%]">
                {message.sender === 'FarmDirect' && (
                  <div className="flex items-center mb-1 space-x-2">
                    <div className="bg-green-600 rounded-full p-1">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-500">Farmer John</span>
                  </div>
                )}
                
                {message.type === 'offer' ? (
                  <div 
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{message.offer?.product}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          message.offer?.status === 'accepted' 
                            ? 'bg-green-200 text-green-800' 
                            : message.offer?.status === 'rejected'
                              ? 'bg-red-200 text-red-800'
                              : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-1">
                        <IndianRupee className="h-4 w-4" />
                        <span>₹{message.offer?.price.toFixed(2)}/{message.offer?.unit}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <ShoppingBasket className="h-4 w-4" />
                        <span>{message.offer?.quantity} {message.offer?.unit}</span>
                      </div>
                      
                      {message.offer?.status === 'pending' && message.sender !== 'user' && (
                        <div className="mt-2 flex space-x-2">
                          <button 
                            onClick={() => {
                              setMessages(prev => 
                                prev.map(msg => 
                                  msg.id === message.id
                                    ? {...msg, offer: {...msg.offer!, status: 'accepted'}}
                                    : msg
                                )
                              );
                            }}
                            className="bg-green-700 text-white text-xs px-2 py-1 rounded-full flex items-center"
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Accept
                          </button>
                          <button 
                            onClick={() => setShowOfferModal(true)}
                            className="bg-white text-green-700 border border-green-700 text-xs px-2 py-1 rounded-full"
                          >
                            Counter
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    {message.type === 'text' ? (
                      <div>
                        <p>{message.content}</p>
                        {message.image && (
                          <div className="mt-2 rounded-lg overflow-hidden">
                            <img 
                              src={message.image} 
                              alt="Attached" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => toggleVoicePlayback(message.id)}
                          className={`rounded-full p-2 ${
                            message.sender === 'user' ? 'bg-green-700' : 'bg-gray-200'
                          }`}
                        >
                          {playingVoiceId === message.id ? (
                            <Pause className={`h-4 w-4 ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`} />
                          ) : (
                            <Play className={`h-4 w-4 ${message.sender === 'user' ? 'text-white' : 'text-gray-700'}`} />
                          )}
                        </button>
                        
                        {/* Voice waveform visualization */}
                        <div className="flex items-center space-x-0.5">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div 
                              key={i}
                              className={`w-1 rounded-full ${
                                playingVoiceId === message.id 
                                  ? 'animate-pulse' 
                                  : ''
                              } ${
                                message.sender === 'user' 
                                  ? 'bg-green-300' 
                                  : 'bg-gray-400'
                              }`}
                              style={{ 
                                height: `${Math.sin(i / 2) * 10 + 10}px`,
                                animationDelay: `${i * 0.1}s`
                              }}
                            ></div>
                          ))}
                        </div>
                        
                        <span className={`text-xs ${message.sender === 'user' ? 'text-green-200' : 'text-gray-500'}`}>
                          {message.duration}s
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                <span className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-right' : ''
                } text-gray-500`}>
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex flex-col max-w-[80%]">
                <div className="flex items-center mb-1 space-x-2">
                  <div className="bg-green-600 rounded-full p-1">
                    <MessageSquare className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-500">Farmer John</span>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Replies */}
        {quickReplies.length > 0 && (
          <div className="p-2 overflow-x-auto whitespace-nowrap bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              {quickReplies.map(reply => (
                <button
                  key={reply.id}
                  onClick={() => handleQuickReply(reply)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full text-sm flex items-center transition-colors duration-200"
                >
                  {reply.text}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Image Preview */}
        {attachedImage && (
          <div className="p-2 bg-gray-100 border-t border-gray-200 relative">
            <div className="relative w-20 h-20 rounded-md overflow-hidden">
              <img 
                src={attachedImage} 
                alt="Attached" 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setAttachedImage(null)}
                className="absolute top-1 right-1 bg-gray-800 bg-opacity-70 rounded-full p-0.5"
              >
                <X className="h-3 w-3 text-white" />
              </button>
            </div>
          </div>
        )}
        
        {/* Message Input */}
        <div className="p-3 bg-white border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-2">
              <button 
                onClick={handleAttachImage}
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <Image className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setShowOfferModal(true)}
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                <IndianRupee className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 flex items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="bg-transparent w-full focus:outline-none text-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
            </div>
            
            {inputMessage.trim() || attachedImage ? (
              <button 
                onClick={handleSendMessage}
                className="bg-green-600 text-white rounded-full p-2 hover:bg-green-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            ) : (
              <button 
                onClick={handleRecording}
                className={`${
                  isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                } rounded-full p-2 transition-colors`}
              >
                <Mic className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Make an Offer</h3>
              <button 
                onClick={() => setShowOfferModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product
                </label>
                <input
                  type="text"
                  value={offerDetails.product}
                  onChange={(e) => setOfferDetails({...offerDetails, product: e.target.value})}
                  placeholder="e.g., Organic Tomatoes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per {offerDetails.unit}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">₹</span>
                  </div>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={offerDetails.price || ''}
                    onChange={(e) => setOfferDetails({...offerDetails, price: parseFloat(e.target.value) || 0})}
                    placeholder="0.00"
                    className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={offerDetails.quantity || ''}
                    onChange={(e) => setOfferDetails({...offerDetails, quantity: parseInt(e.target.value) || 0})}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    value={offerDetails.unit}
                    onChange={(e) => setOfferDetails({...offerDetails, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="kg">kg</option>
                    <option value="boxes">boxes</option>
                    <option value="units">units</option>
                    <option value="lbs">lbs</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-2">
                <button
                  onClick={handleSubmitOffer}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Send Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Attribution */}
      <p className="text-xs text-gray-500 mt-4 fixed bottom-2 left-1/2 transform -translate-x-1/2">
        FarmDirect Negotiation Chat | Connecting Farmers & Consumers
      </p>
    </div>
  );
}

export default App;