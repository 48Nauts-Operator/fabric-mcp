import axios from 'axios';
import config from '../config';
import { TranscriptionResult } from '../types/mcp';

/**
 * Service for interacting with the Fabric API
 */
class FabricService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = config.fabric.apiUrl;
    this.apiKey = config.fabric.apiKey;
  }

  /**
   * Creates an axios instance with the necessary headers
   * @returns Axios instance
   */
  private createAxiosInstance() {
    return axios.create({
      baseURL: this.apiUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });
  }

  /**
   * Executes a Fabric pattern with the given input
   * @param patternId The ID of the pattern to execute
   * @param input The input data for the pattern
   * @returns The result of the pattern execution
   */
  async executePattern(patternId: string, input: any): Promise<string> {
    try {
      const axiosInstance = this.createAxiosInstance();
      const response = await axiosInstance.post(`/patterns/${patternId}/execute`, {
        input,
      });
      
      // For now, return a placeholder since we don't have the actual Fabric API
      return `This is a placeholder result for the ${patternId} pattern with input: ${JSON.stringify(input)}`;
    } catch (error) {
      console.error(`Error executing Fabric pattern ${patternId}:`, error);
      throw error;
    }
  }

  /**
   * Transcribes a YouTube video using Fabric
   * @param videoUrl The URL of the YouTube video
   * @returns The transcription result
   */
  async transcribeYouTubeVideo(videoUrl: string): Promise<TranscriptionResult> {
    try {
      // In a real implementation, we would use the appropriate Fabric pattern
      // For now, return a placeholder
      return {
        text: 'This is a placeholder transcription of the YouTube video.',
        segments: [
          {
            start: 0,
            end: 10,
            text: 'This is a placeholder transcription of the YouTube video.',
          },
        ],
        summary: 'This is a placeholder summary of the video.',
        keyPoints: [
          'Key point 1',
          'Key point 2',
          'Key point 3',
        ],
      };
    } catch (error) {
      console.error('Error transcribing YouTube video:', error);
      throw error;
    }
  }

  /**
   * Summarizes a YouTube video using Fabric
   * @param videoUrl The URL of the YouTube video
   * @returns The summary result
   */
  async summarizeYouTubeVideo(videoUrl: string): Promise<string> {
    try {
      return this.executePattern('summarize', { youtubeUrl: videoUrl });
    } catch (error) {
      console.error('Error summarizing YouTube video:', error);
      throw error;
    }
  }

  /**
   * Extracts wisdom from a YouTube video using Fabric
   * @param videoUrl The URL of the YouTube video
   * @returns The extracted wisdom
   */
  async extractWisdom(videoUrl: string): Promise<string> {
    try {
      return this.executePattern('extract_wisdom', { youtubeUrl: videoUrl });
    } catch (error) {
      console.error('Error extracting wisdom from YouTube video:', error);
      throw error;
    }
  }

  /**
   * Analyzes claims in a YouTube video using Fabric
   * @param videoUrl The URL of the YouTube video
   * @returns The claims analysis
   */
  async analyzeClaims(videoUrl: string): Promise<string> {
    try {
      return this.executePattern('analyze_claims', { youtubeUrl: videoUrl });
    } catch (error) {
      console.error('Error analyzing claims in YouTube video:', error);
      throw error;
    }
  }

  /**
   * Extracts interesting parts from a YouTube video
   * @param videoUrl The URL of the YouTube video
   * @returns The extracted interesting parts
   */
  async extractInterestingParts(videoUrl: string): Promise<string> {
    try {
      return this.executePattern('extract_interesting_parts', { youtubeUrl: videoUrl });
    } catch (error) {
      console.error('Error extracting interesting parts from YouTube video:', error);
      throw error;
    }
  }

  /**
   * Rates the quality of content
   * @param content The content to rate
   * @param contentType The type of content
   * @returns The content rating
   */
  async rateContent(content: string, contentType: string): Promise<string> {
    try {
      return this.executePattern('rate_content', { content, contentType });
    } catch (error) {
      console.error('Error rating content:', error);
      throw error;
    }
  }

  /**
   * Writes an essay based on a topic
   * @param topic The essay topic
   * @param userVoice Optional user voice to mimic
   * @returns The generated essay
   */
  async writeEssay(topic: string, userVoice?: string): Promise<string> {
    try {
      return this.executePattern('write_essay', { topic, userVoice });
    } catch (error) {
      console.error('Error writing essay:', error);
      throw error;
    }
  }

  /**
   * Summarizes an academic paper
   * @param paperUrl The URL of the paper
   * @param paperContent The content of the paper
   * @returns The paper summary
   */
  async summarizePaper(paperUrl?: string, paperContent?: string): Promise<string> {
    try {
      return this.executePattern('summarize_paper', { paperUrl, paperContent });
    } catch (error) {
      console.error('Error summarizing paper:', error);
      throw error;
    }
  }

  /**
   * Creates an AI art prompt for a piece of writing
   * @param content The writing content
   * @returns The generated art prompt
   */
  async createArtPrompt(content: string): Promise<string> {
    try {
      return this.executePattern('create_art_prompt', { content });
    } catch (error) {
      console.error('Error creating art prompt:', error);
      throw error;
    }
  }

  /**
   * Explains code
   * @param codeSnippet The code snippet to explain
   * @returns The code explanation
   */
  async explainCode(codeSnippet: string): Promise<string> {
    try {
      return this.executePattern('explain_code', { codeSnippet });
    } catch (error) {
      console.error('Error explaining code:', error);
      throw error;
    }
  }

  /**
   * Improves documentation
   * @param documentationText The documentation to improve
   * @returns The improved documentation
   */
  async improveDocumentation(documentationText: string): Promise<string> {
    try {
      return this.executePattern('improve_documentation', { documentationText });
    } catch (error) {
      console.error('Error improving documentation:', error);
      throw error;
    }
  }

  /**
   * Creates social media posts from content
   * @param content The content to create posts from
   * @param platforms Optional platforms to target
   * @returns The generated social media posts
   */
  async createSocialMedia(content: string, platforms?: string[]): Promise<string> {
    try {
      return this.executePattern('create_social_media', { content, platforms });
    } catch (error) {
      console.error('Error creating social media posts:', error);
      throw error;
    }
  }
}

export default new FabricService(); 