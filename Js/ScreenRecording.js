const recordBtn = document.querySelector('.ScreenRecord');
const drawingArea = document.querySelector('.DrawingArea');

let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

let offscreenCanvas;
let offscreenCtx;
let animationId;

recordBtn.addEventListener('click', async () => {
  recordBtn.classList.toggle('active');

  if (!isRecording) {
    isRecording = true;
    await startRecording();
  } else {
    isRecording = false;
    stopRecording();
  }
});

async function startRecording() {
  recordedChunks = [];

  const rect = drawingArea.getBoundingClientRect();
  offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = rect.width;
  offscreenCanvas.height = rect.height;
  offscreenCtx = offscreenCanvas.getContext('2d');

  const canvasStream = offscreenCanvas.captureStream(30); // 30 FPS

  let audioStream;
  try {
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    alert('Microphone access denied.');
    isRecording = false;
    recordBtn.classList.remove('active');
    return;
  }

  const combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioStream.getAudioTracks()
  ]);

  const options = { mimeType: 'video/webm; codecs=vp8,opus' };
  mediaRecorder = new MediaRecorder(combinedStream, options);

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) recordedChunks.push(e.data);
  };

  mediaRecorder.onstop = () => {
    if (recordedChunks.length === 0) {
      alert('No data recorded.');
      return;
    }

    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
    URL.revokeObjectURL(url);
  };

  mediaRecorder.start(1000);

  // Start smooth frame capture loop
  drawFrame();
}

function drawFrame() {
  if (!isRecording) return;

  html2canvas(drawingArea, { logging: false, backgroundColor: null }).then((snapshot) => {
    offscreenCtx.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    offscreenCtx.drawImage(snapshot, 0, 0);
  });

  animationId = requestAnimationFrame(() => {
    // Delay approx. 1 frame at 30 fps = ~33ms
    setTimeout(drawFrame, 0); // use setTimeout to prevent UI blocking
  });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
  }

  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}
