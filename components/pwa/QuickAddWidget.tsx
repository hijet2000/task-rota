import React, { useState, useRef } from 'react';
import { Button } from '../ui';
import { CameraIcon, MicIcon, TrashIcon } from '../icons';

export const QuickAddWidget: React.FC = () => {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceNote, setVoiceNote] = useState<Blob | null>(null);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleMicClick = () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop();
        } else {
            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    const mediaRecorder = new MediaRecorder(stream);
                    mediaRecorderRef.current = mediaRecorder;
                    mediaRecorder.start();
                    setIsRecording(true);

                    const audioChunks: Blob[] = [];
                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                        setVoiceNote(audioBlob);
                        setIsRecording(false);
                        stream.getTracks().forEach(track => track.stop()); // Stop microphone
                    });
                })
                .catch(err => {
                    console.error("Error accessing microphone:", err);
                    alert("Could not access the microphone. Please check permissions.");
                });
        }
    };

    const handleSubmit = () => {
        if (!text.trim() && !photo && !voiceNote) return;

        setStatus('submitting');
        console.log("Submitting quick add:", { text, photo: !!photo, voiceNote: !!voiceNote });
        setTimeout(() => {
            setStatus('submitted');
            setTimeout(() => {
                setText('');
                setPhoto(null);
                setVoiceNote(null);
                setStatus('idle');
            }, 1500);
        }, 1000);
    };

    const hasContent = !!(text.trim() || photo || voiceNote);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Quick Add Task</h3>
            <textarea
                className="w-full border-gray-300 rounded-md shadow-sm p-2"
                rows={3}
                placeholder="Type a task, add a photo, or record a voice note..."
                value={text}
                onChange={e => setText(e.target.value)}
            />
            {photo && (
                <div className="relative mt-2">
                    <img src={photo} alt="Task attachment" className="rounded-lg w-full" />
                    <button onClick={() => setPhoto(null)} className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1" aria-label="Remove photo">
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </div>
            )}
            {voiceNote && (
                <div className="mt-2 flex items-center space-x-2">
                    <audio src={URL.createObjectURL(voiceNote)} controls className="w-full" />
                    <button onClick={() => setVoiceNote(null)} className="text-gray-500 p-1" aria-label="Remove voice note">
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
            <div className="mt-2 flex justify-between items-center">
                <div className="flex space-x-2">
                    <input type="file" accept="image/*" capture="environment" ref={photoInputRef} onChange={handlePhotoChange} className="hidden" />
                    <Button variant="secondary" size="sm" onClick={() => photoInputRef.current?.click()}>
                        <CameraIcon className="w-4 h-4 mr-1" /> Photo
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleMicClick} className={isRecording ? 'bg-red-100 text-red-700' : ''}>
                        <MicIcon className="w-4 h-4 mr-1" /> {isRecording ? 'Stop' : 'Voice'}
                    </Button>
                </div>
                <Button onClick={handleSubmit} disabled={!hasContent || status !== 'idle'}>
                    {status === 'submitting' ? 'Saving...' : status === 'submitted' ? 'Saved!' : 'Save Task'}
                </Button>
            </div>
        </div>
    );
};
