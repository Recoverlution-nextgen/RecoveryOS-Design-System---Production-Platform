/**
 * VALIDATION MIDDLEWARE
 * 
 * Provides request validation with proper 422 error responses.
 * Returns field-level errors for invalid payloads.
 * 
 * USAGE:
 *   const { data, error } = validateRequest(body, schema);
 *   if (error) return c.json({ error: 'Validation failed', field_errors: error }, 422);
 */

export interface FieldError {
  field: string;
  message: string;
}

export interface ValidationSchema {
  [key: string]: {
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'uuid';
    min?: number;
    max?: number;
    enum?: any[];
    pattern?: RegExp;
  };
}

export function validateRequest(data: any, schema: ValidationSchema): {
  data?: any;
  error?: FieldError[];
} {
  if (!data || typeof data !== 'object') {
    return { error: [{ field: '_root', message: 'Request body must be a JSON object' }] };
  }

  const errors: FieldError[] = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    // Check required
    if (rules.required && (value === undefined || value === null || value === '')) {
      errors.push({ field, message: `${field} is required` });
      continue;
    }

    // Skip further validation if not required and not present
    if (!rules.required && (value === undefined || value === null)) {
      continue;
    }

    // Check type
    if (rules.type) {
      const actualType = Array.isArray(value) ? 'array' : typeof value;
      
      if (rules.type === 'uuid') {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (typeof value !== 'string' || !uuidRegex.test(value)) {
          errors.push({ field, message: `${field} must be a valid UUID` });
        }
      } else if (actualType !== rules.type) {
        errors.push({ field, message: `${field} must be a ${rules.type}` });
        continue;
      }
    }

    // Check string length
    if (rules.type === 'string' && typeof value === 'string') {
      if (rules.min !== undefined && value.length < rules.min) {
        errors.push({ field, message: `${field} must be at least ${rules.min} characters` });
      }
      if (rules.max !== undefined && value.length > rules.max) {
        errors.push({ field, message: `${field} must be at most ${rules.max} characters` });
      }
    }

    // Check number range
    if (rules.type === 'number' && typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push({ field, message: `${field} must be at least ${rules.min}` });
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push({ field, message: `${field} must be at most ${rules.max}` });
      }
    }

    // Check enum
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push({ field, message: `${field} must be one of: ${rules.enum.join(', ')}` });
    }

    // Check pattern
    if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
      errors.push({ field, message: `${field} has invalid format` });
    }
  }

  if (errors.length > 0) {
    return { error: errors };
  }

  return { data };
}

/**
 * Validate JSON body parsing
 * Returns 400 if JSON is malformed
 */
export async function parseJsonBody(c: any): Promise<{ data?: any; error?: Response }> {
  try {
    const body = await c.req.json();
    return { data: body };
  } catch (err) {
    return {
      error: c.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        400
      ),
    };
  }
}
