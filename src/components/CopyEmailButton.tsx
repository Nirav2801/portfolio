"use client";
import React, { useState, useCallback } from "react";

const COPY_RESET_DELAY = 2000;

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export const CopyEmailButton: React.FC<CopyEmailButtonProps> = ({
  email,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), COPY_RESET_DELAY);
      } else {
        // Fallback copy
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), COPY_RESET_DELAY);
        } else {
          console.error("Fallback copy command was unsuccessful");
        }
      }
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  }, [email]);

  return (
    <button onClick={handleCopyEmail} className={className}>
      {copied ? "Copied!" : "Copy Email"}
    </button>
  );
};

export default CopyEmailButton;
