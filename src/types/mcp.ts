/**
 * MCP Schema Types
 * These types define the structure of the MCP schema for the Fabric integration
 */

// YouTube Video Information
export interface YouTubeVideoInfo {
  videoId: string;
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration: string;
}

// Transcription Result
export interface TranscriptionResult {
  text: string;
  segments: TranscriptionSegment[];
  summary?: string;
  keyPoints?: string[];
}

// Transcription Segment
export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  speaker?: string;
}

// Fabric Pattern Result
export interface FabricPatternResult {
  patternId: string;
  output: string;
  metadata?: Record<string, any>;
}

// MCP Operation Types
export enum MCPOperationType {
  // YouTube operations
  TRANSCRIBE_YOUTUBE = 'transcribe_youtube',
  SUMMARIZE_YOUTUBE = 'summarize_youtube',
  EXTRACT_WISDOM = 'extract_wisdom',
  ANALYZE_CLAIMS = 'analyze_claims',
  GET_VIDEO_INFO = 'get_video_info',
  EXTRACT_INTERESTING_PARTS = 'extract_interesting_parts',
  RATE_CONTENT = 'rate_content',
  
  // Content creation operations
  WRITE_ESSAY = 'write_essay',
  SUMMARIZE_PAPER = 'summarize_paper',
  CREATE_ART_PROMPT = 'create_art_prompt',
  EXPLAIN_CODE = 'explain_code',
  IMPROVE_DOCUMENTATION = 'improve_documentation',
  CREATE_SOCIAL_MEDIA = 'create_social_media'
}

// MCP Request
export interface MCPRequest {
  operation: MCPOperationType;
  params: {
    // YouTube related parameters
    youtubeUrl?: string;
    videoId?: string;
    includeMetadata?: boolean;
    includeSummary?: boolean;
    includeKeyPoints?: boolean;
    
    // Content related parameters
    content?: string;
    paperUrl?: string;
    codeSnippet?: string;
    documentationText?: string;
    essayTopic?: string;
    contentToRate?: string;
    contentType?: 'video' | 'article' | 'paper' | 'podcast' | 'code';
    userVoice?: string;
    
    // Pattern related parameters
    patternId?: string;
    patternInput?: Record<string, any>;
  };
}

// MCP Response
export interface MCPResponse {
  success: boolean;
  data?: {
    videoInfo?: YouTubeVideoInfo;
    transcription?: TranscriptionResult;
    patternResult?: FabricPatternResult;
  };
  error?: {
    code: string;
    message: string;
  };
} 