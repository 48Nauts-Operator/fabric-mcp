import { Request, Response } from 'express';
import { MCPRequest, MCPOperationType, MCPResponse, FabricPatternResult } from '../types/mcp';
import fabricService from '../services/fabric.service';
import { extractVideoId, isValidYouTubeUrl } from '../utils/youtube';

/**
 * Controller for handling MCP requests
 */
class MCPController {
  /**
   * Handles MCP requests
   * @param req Express request
   * @param res Express response
   */
  async handleMCPRequest(req: Request, res: Response) {
    try {
      const mcpRequest = req.body as MCPRequest;
      
      if (!mcpRequest.operation) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: 'Operation is required',
          },
        } as MCPResponse);
      }
      
      let response: MCPResponse;
      
      switch (mcpRequest.operation) {
        case MCPOperationType.GET_VIDEO_INFO:
          response = await this.handleGetVideoInfo(mcpRequest);
          break;
        case MCPOperationType.TRANSCRIBE_YOUTUBE:
          response = await this.handleTranscribeYouTube(mcpRequest);
          break;
        case MCPOperationType.SUMMARIZE_YOUTUBE:
          response = await this.handleSummarizeYouTube(mcpRequest);
          break;
        case MCPOperationType.EXTRACT_WISDOM:
          response = await this.handleExtractWisdom(mcpRequest);
          break;
        case MCPOperationType.ANALYZE_CLAIMS:
          response = await this.handleAnalyzeClaims(mcpRequest);
          break;
        case MCPOperationType.EXTRACT_INTERESTING_PARTS:
          response = await this.handleExtractInterestingParts(mcpRequest);
          break;
        case MCPOperationType.RATE_CONTENT:
          response = await this.handleRateContent(mcpRequest);
          break;
        case MCPOperationType.WRITE_ESSAY:
          response = await this.handleWriteEssay(mcpRequest);
          break;
        case MCPOperationType.SUMMARIZE_PAPER:
          response = await this.handleSummarizePaper(mcpRequest);
          break;
        case MCPOperationType.CREATE_ART_PROMPT:
          response = await this.handleCreateArtPrompt(mcpRequest);
          break;
        case MCPOperationType.EXPLAIN_CODE:
          response = await this.handleExplainCode(mcpRequest);
          break;
        case MCPOperationType.IMPROVE_DOCUMENTATION:
          response = await this.handleImproveDocumentation(mcpRequest);
          break;
        case MCPOperationType.CREATE_SOCIAL_MEDIA:
          response = await this.handleCreateSocialMedia(mcpRequest);
          break;
        default:
          response = {
            success: false,
            error: {
              code: 'INVALID_OPERATION',
              message: `Operation ${mcpRequest.operation} is not supported`,
            },
          };
      }
      
      return res.json(response);
    } catch (error) {
      console.error('Error handling MCP request:', error);
      
      return res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An internal error occurred',
        },
      } as MCPResponse);
    }
  }
  
  /**
   * Handles the GET_VIDEO_INFO operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleGetVideoInfo(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // This is a placeholder - we'll need to implement the actual video info retrieval
      // using Fabric or a YouTube API client
      const videoId = extractVideoId(youtubeUrl);
      
      if (!videoId) {
        return {
          success: false,
          error: {
            code: 'INVALID_VIDEO_ID',
            message: 'Could not extract video ID from URL',
          },
        };
      }
      
      // Placeholder for video info - in a real implementation, we would fetch this from Fabric or YouTube API
      const videoInfo = {
        videoId,
        title: 'Sample Video Title',
        description: 'Sample video description',
        channelTitle: 'Sample Channel',
        publishedAt: new Date().toISOString(),
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        duration: 'PT10M30S',
      };
      
      return {
        success: true,
        data: {
          videoInfo,
        },
      };
    } catch (error) {
      console.error('Error getting video info:', error);
      
      return {
        success: false,
        error: {
          code: 'VIDEO_INFO_ERROR',
          message: 'Error retrieving video information',
        },
      };
    }
  }
  
  /**
   * Handles the TRANSCRIBE_YOUTUBE operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleTranscribeYouTube(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl, includeSummary, includeKeyPoints } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // Get video info first
      const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
      
      if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
        return videoInfoResponse;
      }
      
      // In a real implementation, we would use Fabric to transcribe the video
      // For now, we'll use a placeholder
      const transcriptionResult = await fabricService.transcribeYouTubeVideo(youtubeUrl);
      
      return {
        success: true,
        data: {
          videoInfo: videoInfoResponse.data.videoInfo,
          transcription: transcriptionResult,
        },
      };
    } catch (error) {
      console.error('Error transcribing YouTube video:', error);
      
      return {
        success: false,
        error: {
          code: 'TRANSCRIPTION_ERROR',
          message: 'Error transcribing YouTube video',
        },
      };
    }
  }
  
  /**
   * Handles the SUMMARIZE_YOUTUBE operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleSummarizeYouTube(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // Get video info first
      const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
      
      if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
        return videoInfoResponse;
      }
      
      // In a real implementation, we would use Fabric to summarize the video
      const summaryResult = await fabricService.summarizeYouTubeVideo(youtubeUrl);
      
      const patternResult: FabricPatternResult = {
        patternId: 'summarize',
        output: summaryResult,
      };
      
      return {
        success: true,
        data: {
          videoInfo: videoInfoResponse.data.videoInfo,
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error summarizing YouTube video:', error);
      
      return {
        success: false,
        error: {
          code: 'SUMMARIZATION_ERROR',
          message: 'Error summarizing YouTube video',
        },
      };
    }
  }
  
  /**
   * Handles the EXTRACT_WISDOM operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleExtractWisdom(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // Get video info first
      const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
      
      if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
        return videoInfoResponse;
      }
      
      // In a real implementation, we would use Fabric to extract wisdom from the video
      // For now, we'll use a placeholder
      const wisdomResult = await fabricService.executePattern('extract_wisdom', { youtubeUrl });
      
      const patternResult: FabricPatternResult = {
        patternId: 'extract_wisdom',
        output: wisdomResult,
      };
      
      return {
        success: true,
        data: {
          videoInfo: videoInfoResponse.data.videoInfo,
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error extracting wisdom from YouTube video:', error);
      
      return {
        success: false,
        error: {
          code: 'WISDOM_EXTRACTION_ERROR',
          message: 'Error extracting wisdom from YouTube video',
        },
      };
    }
  }
  
  /**
   * Handles the ANALYZE_CLAIMS operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleAnalyzeClaims(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // Get video info first
      const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
      
      if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
        return videoInfoResponse;
      }
      
      // In a real implementation, we would use Fabric to analyze claims in the video
      // For now, we'll use a placeholder
      const claimsResult = await fabricService.executePattern('analyze_claims', { youtubeUrl });
      
      const patternResult: FabricPatternResult = {
        patternId: 'analyze_claims',
        output: claimsResult,
      };
      
      return {
        success: true,
        data: {
          videoInfo: videoInfoResponse.data.videoInfo,
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error analyzing claims in YouTube video:', error);
      
      return {
        success: false,
        error: {
          code: 'CLAIMS_ANALYSIS_ERROR',
          message: 'Error analyzing claims in YouTube video',
        },
      };
    }
  }

  /**
   * Handles the EXTRACT_INTERESTING_PARTS operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleExtractInterestingParts(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl } = mcpRequest.params;
    
    if (!youtubeUrl || !isValidYouTubeUrl(youtubeUrl)) {
      return {
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'Invalid YouTube URL',
        },
      };
    }
    
    try {
      // Get video info first
      const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
      
      if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
        return videoInfoResponse;
      }
      
      // Extract interesting parts using Fabric
      const interestingPartsResult = await fabricService.extractInterestingParts(youtubeUrl);
      
      const patternResult: FabricPatternResult = {
        patternId: 'extract_interesting_parts',
        output: interestingPartsResult,
      };
      
      return {
        success: true,
        data: {
          videoInfo: videoInfoResponse.data.videoInfo,
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error extracting interesting parts from YouTube video:', error);
      
      return {
        success: false,
        error: {
          code: 'EXTRACTION_ERROR',
          message: 'Error extracting interesting parts from YouTube video',
        },
      };
    }
  }

  /**
   * Handles the RATE_CONTENT operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleRateContent(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { youtubeUrl, content, contentType } = mcpRequest.params;
    
    try {
      let contentToRate = content;
      let videoInfo = undefined;
      
      // If YouTube URL is provided, get video info and use that as content
      if (youtubeUrl && isValidYouTubeUrl(youtubeUrl)) {
        const videoInfoResponse = await this.handleGetVideoInfo(mcpRequest);
        
        if (!videoInfoResponse.success || !videoInfoResponse.data?.videoInfo) {
          return videoInfoResponse;
        }
        
        videoInfo = videoInfoResponse.data.videoInfo;
        contentToRate = `${videoInfo.title}\n${videoInfo.description}`;
      } else if (!contentToRate) {
        return {
          success: false,
          error: {
            code: 'INVALID_CONTENT',
            message: 'Either youtubeUrl or content must be provided',
          },
        };
      }
      
      // Rate the content using Fabric
      const ratingResult = await fabricService.rateContent(contentToRate, contentType || 'article');
      
      const patternResult: FabricPatternResult = {
        patternId: 'rate_content',
        output: ratingResult,
      };
      
      return {
        success: true,
        data: {
          videoInfo: videoInfo,
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error rating content:', error);
      
      return {
        success: false,
        error: {
          code: 'RATING_ERROR',
          message: 'Error rating content',
        },
      };
    }
  }

  /**
   * Handles the WRITE_ESSAY operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleWriteEssay(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { essayTopic, userVoice } = mcpRequest.params;
    
    if (!essayTopic) {
      return {
        success: false,
        error: {
          code: 'INVALID_TOPIC',
          message: 'Essay topic is required',
        },
      };
    }
    
    try {
      // Write essay using Fabric
      const essayResult = await fabricService.writeEssay(essayTopic, userVoice);
      
      const patternResult: FabricPatternResult = {
        patternId: 'write_essay',
        output: essayResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error writing essay:', error);
      
      return {
        success: false,
        error: {
          code: 'ESSAY_ERROR',
          message: 'Error writing essay',
        },
      };
    }
  }

  /**
   * Handles the SUMMARIZE_PAPER operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleSummarizePaper(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { paperUrl, content } = mcpRequest.params;
    
    if (!paperUrl && !content) {
      return {
        success: false,
        error: {
          code: 'INVALID_PAPER',
          message: 'Either paperUrl or content must be provided',
        },
      };
    }
    
    try {
      // Summarize paper using Fabric
      const summaryResult = await fabricService.summarizePaper(paperUrl, content);
      
      const patternResult: FabricPatternResult = {
        patternId: 'summarize_paper',
        output: summaryResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error summarizing paper:', error);
      
      return {
        success: false,
        error: {
          code: 'SUMMARY_ERROR',
          message: 'Error summarizing paper',
        },
      };
    }
  }

  /**
   * Handles the CREATE_ART_PROMPT operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleCreateArtPrompt(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { content } = mcpRequest.params;
    
    if (!content) {
      return {
        success: false,
        error: {
          code: 'INVALID_CONTENT',
          message: 'Content is required',
        },
      };
    }
    
    try {
      // Create art prompt using Fabric
      const promptResult = await fabricService.createArtPrompt(content);
      
      const patternResult: FabricPatternResult = {
        patternId: 'create_art_prompt',
        output: promptResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error creating art prompt:', error);
      
      return {
        success: false,
        error: {
          code: 'PROMPT_ERROR',
          message: 'Error creating art prompt',
        },
      };
    }
  }

  /**
   * Handles the EXPLAIN_CODE operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleExplainCode(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { codeSnippet } = mcpRequest.params;
    
    if (!codeSnippet) {
      return {
        success: false,
        error: {
          code: 'INVALID_CODE',
          message: 'Code snippet is required',
        },
      };
    }
    
    try {
      // Explain code using Fabric
      const explanationResult = await fabricService.explainCode(codeSnippet);
      
      const patternResult: FabricPatternResult = {
        patternId: 'explain_code',
        output: explanationResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error explaining code:', error);
      
      return {
        success: false,
        error: {
          code: 'EXPLANATION_ERROR',
          message: 'Error explaining code',
        },
      };
    }
  }

  /**
   * Handles the IMPROVE_DOCUMENTATION operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleImproveDocumentation(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { documentationText } = mcpRequest.params;
    
    if (!documentationText) {
      return {
        success: false,
        error: {
          code: 'INVALID_DOCUMENTATION',
          message: 'Documentation text is required',
        },
      };
    }
    
    try {
      // Improve documentation using Fabric
      const improvedResult = await fabricService.improveDocumentation(documentationText);
      
      const patternResult: FabricPatternResult = {
        patternId: 'improve_documentation',
        output: improvedResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error improving documentation:', error);
      
      return {
        success: false,
        error: {
          code: 'DOCUMENTATION_ERROR',
          message: 'Error improving documentation',
        },
      };
    }
  }

  /**
   * Handles the CREATE_SOCIAL_MEDIA operation
   * @param mcpRequest The MCP request
   * @returns The MCP response
   */
  private async handleCreateSocialMedia(mcpRequest: MCPRequest): Promise<MCPResponse> {
    const { content } = mcpRequest.params;
    
    if (!content) {
      return {
        success: false,
        error: {
          code: 'INVALID_CONTENT',
          message: 'Content is required',
        },
      };
    }
    
    try {
      // Create social media posts using Fabric
      const postsResult = await fabricService.createSocialMedia(content);
      
      const patternResult: FabricPatternResult = {
        patternId: 'create_social_media',
        output: postsResult,
      };
      
      return {
        success: true,
        data: {
          patternResult,
        },
      };
    } catch (error) {
      console.error('Error creating social media posts:', error);
      
      return {
        success: false,
        error: {
          code: 'SOCIAL_MEDIA_ERROR',
          message: 'Error creating social media posts',
        },
      };
    }
  }
}

export default new MCPController(); 