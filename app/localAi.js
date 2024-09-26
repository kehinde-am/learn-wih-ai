// import { pipeline, env } from "@xenova/transformers";

// // Ensure that the transformer uses WASM instead of Node.js backends
// env.backends.onnx = 'wasm';

// // Skip local model check (optional, adjust according to your use case)
// env.allowLocalModels = false;

// // Singleton pattern to ensure the pipeline is only initialized once
// class PipelineSingleton {
//     static task = 'text-classification';
//     static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
//     static instance = null;

//     // This method initializes the model pipeline if it's not already initialized
//     static async getInstance(progress_callback = null) {
//         if (this.instance === null) {
//             try {
//                 // Initialize the pipeline for text classification with WASM backend
//                 this.instance = await pipeline(this.task, this.model, { progress_callback });
//             } catch (error) {
//                 console.error('Error loading the model pipeline:', error);
//                 throw error;
//             }
//         }
//         return this.instance;
//     }
// }

// // Listen for messages from the main thread
// self.addEventListener('message', async (event) => {
//     try {
//         // Load the classification pipeline (lazily)
//         const classifier = await PipelineSingleton.getInstance((progress) => {
//             // Progress callback: send progress updates to the main thread
//             self.postMessage({ status: 'loading', progress });
//         });

//         // Perform the text classification
//         const output = await classifier(event.data.text);

//         // Send the classification result back to the main thread
//         self.postMessage({
//             status: 'complete',
//             output: output,
//         });
//     } catch (error) {
//         // Handle any errors during the classification process
//         self.postMessage({
//             status: 'error',
//             error: error.message || 'An error occurred during classification',
//         });
//     }
// });


import { pipeline } from '@xenova/transformers';

let nlpPipeline;

export async function loadModel() {
  // Load the model pipeline
  nlpPipeline = await pipeline('text-generation', 'gpt2');
  console.log('Local AI model loaded.');
}

export async function generateResponse(input) {
  if (!nlpPipeline) {
    await loadModel(); // Load the model if it hasn't been loaded yet
  }

  const output = await nlpPipeline(input);
  return output[0].generated_text;
}
