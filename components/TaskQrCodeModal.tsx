import React from 'react';
import { Modal, Button } from './ui';
import { Task } from '../types';
import { PrintIcon } from './icons';

interface TaskQrCodeModalProps {
    isOpen: boolean;
    onClose: () => void;
    task: Task | null;
}

export const TaskQrCodeModal: React.FC<TaskQrCodeModalProps> = ({ isOpen, onClose, task }) => {
    if (!task) return null;

    const qrData = JSON.stringify({ taskId: task.id });
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=200x200&qzone=1`;

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Task QR Code: ${task.code}</title>
                        <style>
                             @media print {
                                body { font-family: sans-serif; text-align: center; margin-top: 50px; }
                                h1 { font-size: 24px; }
                                h2 { font-size: 20px; font-weight: normal; color: #333; }
                                p { font-size: 14px; color: #555; }
                                img { max-width: 100%; height: auto; margin-top: 20px; }
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Task: ${task.code}</h1>
                        <h2>${task.title}</h2>
                        <img src="${qrCodeUrl}" alt="QR Code for ${task.code}" />
                        <p>Scan this code to view and update this task.</p>
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
                printWindow.close();
            }, 500);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={`QR Code for ${task.code}`}
            footer={
                 <div className="space-x-2">
                    <Button variant="secondary" onClick={onClose}>Close</Button>
                    <Button onClick={handlePrint}>
                        <PrintIcon className="w-4 h-4 mr-2" />
                        Print
                    </Button>
                </div>
            }
        >
            <div className="text-center p-4">
                <p className="text-gray-600 mb-4">Scan this code with a mobile device to quickly open this task.</p>
                <div className="flex justify-center p-4 bg-gray-100 rounded-lg">
                    <img src={qrCodeUrl} alt={`QR Code for ${task.title}`} className="mx-auto" />
                </div>
            </div>
        </Modal>
    );
};