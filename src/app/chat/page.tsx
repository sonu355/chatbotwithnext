"use client";
import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";

import {
    PromptInput,
    PromptInputBody,
    type PromptInputMessage,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools
} from "@/components/ai-elements/prompt-input"
import { Message, MessageContent } from "@/components/ai-elements/message"
import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { Input } from "@base-ui/react";
import { Markdown } from "@/components/ui/markdown";


export default function RAGChatBot() {
    const [input, setInput] = useState("");
    const { messages, sendMessage, status } = useChat();

    const handleSubmit = (message: any) => {
        if (!message.text) return;
        sendMessage({ text: message.text });
        setInput("");
    };

    return (
        <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh)]">
            <div className="flex flex-col h-full">
                <Conversation>
                    <ConversationContent>
                        {messages.map((message) => (
                            <div key={message.id}>
                                {/* Map through parts - standard in AI SDK 5 and 6 */}
                                {message.parts.map((part, i) => {
                                    if (part.type === "text") {
                                        return (
                                            <Fragment key={`${message.id}-${i}`}>
                                                <Message from={message.role}>
                                                    <MessageContent>
                                                        <Markdown content={part.text} />
                                                    </MessageContent>
                                                </Message>
                                            </Fragment>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        ))}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>

                {/* Ensure your PromptInput matches this handler */}
                <PromptInput onSubmit={handleSubmit} className="mt-4">
                    <PromptInputBody>
                        <PromptInputTextarea 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask anything you want..."
                        />
                        <div className="flex items-center justify-between p-2">
                             <PromptInputSubmit />
                        </div>
                    </PromptInputBody>
                </PromptInput>
            </div>
        </div>
    );
}