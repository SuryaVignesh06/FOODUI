const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath);

const inputVideo = path.join(__dirname, 'src/assets/video.mp4');
const outputDir = path.join(__dirname, 'src/assets/frames');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from video...');
console.log('Input:', inputVideo);
console.log('Output:', outputDir);

// Extract frames at 10 fps to keep file count reasonable
ffmpeg(inputVideo)
    .outputOptions([
        '-vf', 'fps=10,scale=1280:-1', // 10 frames per second, width 1280px
        '-q:v', '3' // Quality (2-31, lower is better)
    ])
    .output(path.join(outputDir, 'frame_%04d.jpg'))
    .on('start', (cmd) => {
        console.log('Starting ffmpeg...');
    })
    .on('progress', (progress) => {
        if (progress.percent) {
            console.log(`Progress: ${Math.round(progress.percent)}%`);
        }
    })
    .on('end', () => {
        console.log('Done! Frames extracted successfully.');

        // Count frames
        const frames = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg'));
        console.log(`Total frames: ${frames.length}`);
    })
    .on('error', (err) => {
        console.error('Error:', err.message);
    })
    .run();
