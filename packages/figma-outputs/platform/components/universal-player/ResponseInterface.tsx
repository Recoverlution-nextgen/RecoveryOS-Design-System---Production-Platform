/**
 * RESPONSE INTERFACE
 * Polymorphic response UI based on response_type (21 types)
 */

import React from 'react';
import { ResponseType } from '../../lib/navicues/types';

// Import existing response components
import { Voice10Response } from '../navicues/responses/Voice10Response';
import { SortResponse } from '../navicues/responses/SortResponse';
import { BodyMapResponse } from '../navicues/responses/BodyMapResponse';
import { MirrorResponse } from '../navicues/responses/MirrorResponse';
import { ConstellationResponse } from '../navicues/responses/ConstellationResponse';
import { TimelineResponse } from '../navicues/responses/TimelineResponse';
import { DialResponse } from '../navicues/responses/DialResponse';
import { SpectrumResponse } from '../navicues/responses/SpectrumResponse';
import { ComparisonResponse } from '../navicues/responses/ComparisonResponse';
import { ParadoxResponse } from '../navicues/responses/ParadoxResponse';
import { EchoResponse } from '../navicues/responses/EchoResponse';
import { WitnessResponse } from '../navicues/responses/WitnessResponse';
import { CurveballResponse } from '../navicues/responses/CurveballResponse';

// Simple response components (to be created)
import { 
  TapResponse, 
  BinaryResponse, 
  SliderResponse, 
  OneWordResponse, 
  BreathResponse, 
  HoldResponse,
  AutoAdvanceResponse 
} from './responses/SimpleResponses';

interface ResponseInterfaceProps {
  type: ResponseType;
  options?: any;
  onResponse: (response: any) => void;
  pillarColor?: string;
}

export function ResponseInterface({ type, options = {}, onResponse, pillarColor = '#5739FB' }: ResponseInterfaceProps) {
  // Render based on response_type
  // NOTE: Pass both onComplete and onRespond for backward compatibility
  const responseHandlers = {
    onComplete: onResponse,
    onRespond: onResponse,
    pillarColor
  };

  switch (type) {
    // ========================================================================
    // ADVANCED RESPONSES (already built)
    // ========================================================================
    
    case 'voice10':
      return <Voice10Response {...options} {...responseHandlers} />;
    
    case 'sort':
      return <SortResponse {...options} {...responseHandlers} />;
    
    case 'body_map':
      return <BodyMapResponse {...options} {...responseHandlers} />;
    
    case 'mirror':
      return <MirrorResponse {...options} {...responseHandlers} />;
    
    case 'constellation':
      return <ConstellationResponse {...options} {...responseHandlers} />;
    
    case 'timeline':
      return <TimelineResponse {...options} {...responseHandlers} />;
    
    case 'dial':
      return <DialResponse {...options} {...responseHandlers} />;
    
    case 'spectrum':
      return <SpectrumResponse {...options} {...responseHandlers} />;
    
    case 'comparison':
      return <ComparisonResponse {...options} {...responseHandlers} />;
    
    case 'paradox':
      return <ParadoxResponse {...options} {...responseHandlers} />;
    
    case 'echo':
      return <EchoResponse {...options} {...responseHandlers} />;
    
    case 'witness':
      return <WitnessResponse {...options} {...responseHandlers} />;
    
    case 'curveball':
      return <CurveballResponse {...options} {...responseHandlers} />;
    
    // ========================================================================
    // SIMPLE RESPONSES
    // ========================================================================
    
    case 'tap':
      return <TapResponse {...options} {...responseHandlers} />;
    
    case 'binary':
      return <BinaryResponse {...options} {...responseHandlers} />;
    
    case 'slider':
      return <SliderResponse {...options} {...responseHandlers} />;
    
    case 'one_word':
      return <OneWordResponse {...options} {...responseHandlers} />;
    
    case 'voice':
      return <Voice10Response {...options} {...responseHandlers} />; // Use voice10 for now
    
    case 'breath':
      return <BreathResponse {...options} {...responseHandlers} />;
    
    case 'hold':
      return <HoldResponse {...options} {...responseHandlers} />;
    
    case 'none':
      return <AutoAdvanceResponse {...options} {...responseHandlers} />;
    
    // ========================================================================
    // FALLBACK
    // ========================================================================
    
    default:
      console.warn(`Unknown response type: ${type}, falling back to tap`);
      return <TapResponse {...responseHandlers} />;
  }
}
