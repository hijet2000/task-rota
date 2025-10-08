import React, { useState, useRef, useEffect } from 'react';
// FIX: Added .tsx extension to import path
import { Button } from '../ui.tsx';
// FIX: Added .tsx extension to import path
import { CameraIcon, MicIcon, TrashIcon } from '../icons.tsx';

export const QuickAddWidget: React.FC = () => {
    const [text, setText] = useState('');
    const [photo, setPhoto] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceNote, setVoiceNote] = useState<Blob | null>(null);
    const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const mediaRecorder = useRef<MediaRecorder | null>(null);
    const audioChunks = useRef<Blob[]>([]);

    const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setPhoto(e.target.result as string);
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleRecord = async () => {
        if (isRecording) {
            mediaRecorder.current?.stop();
            setIsRecording(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorder.current = new MediaRecorder(stream);
                mediaRecorder.current.ondataavailable = (event) => {
                    audioChunks.current.push(event.data);
                };
                mediaRecorder.current.onstop = () => {
                    const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
                    setVoiceNote(audioBlob);
                    audioChunks.current = [];
                    stream.getTracks().forEach(track => track.stop());
                };
                mediaRecorder.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Microphone access denied:", err);
                alert("Microphone access is needed to record a voice note.");
            }
        }
    };

    const handleAddTask = () => {
        if (!text && !photo && !voiceNote) return;
        setStatus('saving');

        const newTask = {
            id: `offline_${Date.now()}`,
            title: text.split('\n')[0] || 'New Offline Task',
            description: text,
            photo, // base64 string
            // In a real app, you would handle the blob data for upload
            voiceNoteUrl: voiceNote ? URL.createObjectURL(voiceNote) : null,
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage for offline persistence
        const offlineTasks = JSON.parse(localStorage.getItem('offlineTasks') || '[]');
        offlineTasks.push(newTask);
        localStorage.setItem('offlineTasks', JSON.stringify(offlineTasks));

        setTimeout(() => {
            setStatus('saved');
            setText('');
            setPhoto(null);
            setVoiceNote(null);
            setTimeout(() => setStatus('idle'), 1500);
        }, 500);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-2">Offline Quick Add</h3>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm p-2 text-sm"
                rows={3}
                placeholder="Type a task, add a photo, or record a voice note... (transcribed on sync)"
            />
            {photo && <img src={photo} alt="Captured" className="mt-2 rounded-md max-h-40" />}
            {voiceNote && <audio src={URL.createObjectURL(voiceNote)} controls className="mt-2 w-full" />}
            
            <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <label className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                        <CameraIcon className="w-6 h-6 text-gray-600" />
                        <input type="file" accept="image/*" capture className="hidden" onChange={handlePhotoCapture} />
                    </label>
                    <button onClick={handleRecord} className={`p-2 rounded-full hover:bg-gray-100 ${isRecording ? 'bg-red-100' : ''}`}>
                        <MicIcon className={`w-6 h-6 ${isRecording ? 'text-red-600' : 'text-gray-600'}`} />
                    </button>
                    {(photo || voiceNote) && (
                        <button onClick={() => { setPhoto(null); setVoiceNote(null); }} className="p-2 rounded-full hover:bg-gray-100">
                            <TrashIcon className="w-6 h-6 text-red-500" />
                        </button>
                    )}
                </div>
                <Button onClick={handleAddTask} disabled={status !== 'idle'}>
                    {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved!' : 'Add Task'}
                </Button>
            </div>
        </div>
    );
};