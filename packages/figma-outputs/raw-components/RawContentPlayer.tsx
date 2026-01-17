/**
 * RAW CONTENT PLAYER - V3 READY
 * Minimal content player without V2 dependencies
 */

import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface RawContentItem {
  id: string;
  type: 'text' | 'video' | 'image' | 'audio';
  title?: string;
  content: string; // URL or text content
  responseRequired?: boolean;
  responseType?: 'text' | 'slider' | 'voice';
}

interface RawContentPlayerProps {
  items: RawContentItem[];
  onComplete?: (itemId: string, response?: any) => void;
  onClose?: () => void;
  showProgress?: boolean;
}

export function RawContentPlayer({
  items,
  onComplete,
  onClose,
  showProgress = true
}: RawContentPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, any>>({});

  const currentItem = items[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === items.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleItemComplete = (response?: any) => {
    const updatedResponses = { ...responses, [currentItem.id]: response };
    setResponses(updatedResponses);

    onComplete?.(currentItem.id, response);

    if (!isLast) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const renderContent = () => {
    switch (currentItem.type) {
      case 'text':
        return (
          <div style={{
            fontSize: '18px',
            lineHeight: '1.6',
            textAlign: 'center',
            padding: '20px'
          }}>
            {currentItem.content}
          </div>
        );

      case 'image':
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <img
              src={currentItem.content}
              alt={currentItem.title}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '0' // InfiniteK: no rounded corners
              }}
            />
          </div>
        );

      case 'video':
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <video
              controls
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '0'
              }}
            >
              <source src={currentItem.content} />
            </video>
          </div>
        );

      default:
        return <div>Unsupported content type</div>;
    }
  };

  const renderResponse = () => {
    if (!currentItem.responseRequired) {
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <button
            onClick={() => handleItemComplete()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#FF6B6B',
              color: 'white',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Continue
          </button>
        </div>
      );
    }

    switch (currentItem.responseType) {
      case 'text':
        return (
          <div style={{ padding: '20px' }}>
            <textarea
              placeholder="Share your thoughts..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '12px',
                border: '2px solid #E5E7EB',
                borderRadius: '0',
                fontSize: '16px',
                resize: 'vertical'
              }}
              onChange={(e) => {
                const response = e.target.value;
                setResponses({ ...responses, [currentItem.id]: response });
              }}
            />
            <div style={{ textAlign: 'center', marginTop: '16px' }}>
              <button
                onClick={() => handleItemComplete(responses[currentItem.id])}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#FF6B6B',
                  color: 'white',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                Submit Response
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <button
              onClick={() => handleItemComplete()}
              style={{
                padding: '12px 24px',
                backgroundColor: '#FF6B6B',
                color: 'white',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Continue
            </button>
          </div>
        );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'white',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderBottom: '1px solid #E5E7EB'
      }}>
        <div style={{ flex: 1 }}>
          {!isFirst && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>

        {showProgress && (
          <div style={{ fontSize: '14px', color: '#6B7280' }}>
            {currentIndex + 1} of {items.length}
          </div>
        )}

        <div style={{ flex: 1, textAlign: 'right' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {currentItem.title && (
          <div style={{
            fontSize: '24px',
            fontWeight: '600',
            textAlign: 'center',
            padding: '20px',
            borderBottom: '1px solid #E5E7EB'
          }}>
            {currentItem.title}
          </div>
        )}

        {renderContent()}
        {renderResponse()}
      </div>

      {/* Footer navigation */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #E5E7EB',
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <div>
          {!isFirst && (
            <button
              onClick={handlePrevious}
              style={{
                padding: '8px 16px',
                backgroundColor: '#F3F4F6',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer'
              }}
            >
              Previous
            </button>
          )}
        </div>

        <div>
          {!isLast && (
            <button
              onClick={handleNext}
              style={{
                padding: '8px 16px',
                backgroundColor: '#FF6B6B',
                color: 'white',
                border: 'none',
                borderRadius: '0',
                cursor: 'pointer'
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}