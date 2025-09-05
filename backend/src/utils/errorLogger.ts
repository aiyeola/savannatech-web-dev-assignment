import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

interface ErrorLogEntry {
  timestamp: string;
  method: string;
  url: string;
  error: string;
  stack?: string;
  statusCode?: number;
  userAgent?: string;
  ip?: string;
}

class ErrorLogger {
  private logFilePath: string;

  constructor() {
    const logDir = path.join(process.cwd(), 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    this.logFilePath = path.join(logDir, 'error.log');
  }

  private formatLogEntry(entry: ErrorLogEntry): string {
    return JSON.stringify(entry, null, 2) + '\n---\n';
  }

  logError(req: Request, error: Error | string, statusCode?: number): void {
    const timestamp = new Date().toISOString();
    const errorMessage = error instanceof Error ? error.message : error;
    const stack = error instanceof Error ? error.stack : undefined;

    const logEntry: ErrorLogEntry = {
      timestamp,
      method: req.method,
      url: req.originalUrl || req.url,
      error: errorMessage,
      stack,
      statusCode,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.socket.remoteAddress
    };

    // Log to console
    console.error(`[${timestamp}] ${req.method} ${req.url} - ${errorMessage}`);
    if (stack) {
      console.error(stack);
    }

    // Log to file
    try {
      const logString = this.formatLogEntry(logEntry);
      fs.appendFileSync(this.logFilePath, logString);
    } catch (fileError) {
      console.error('Failed to write to log file:', fileError);
    }
  }

  // Express middleware for automatic error logging
  middleware() {
    return (error: Error, req: Request, res: Response, next: NextFunction) => {
      this.logError(req, error, res.statusCode);
      next(error);
    };
  }

  // Helper method to log errors in try-catch blocks
  logAndRespond(req: Request, res: Response, error: Error | string, statusCode: number = 500, message: string = 'Internal server error') {
    this.logError(req, error, statusCode);
    res.status(statusCode).send({ error: message });
  }
}

export const errorLogger = new ErrorLogger();