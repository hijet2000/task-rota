// FIX: Implement the ComplianceReportModal component.
import React from 'react';
import { Modal, Button } from './ui';

interface Violation {
    type: 'Working Time' | 'Rest Period' | 'Fair Scheduling';
    description: string;
    employeeName: string;
    date: string;
}

interface ComplianceReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    violations: Violation[];
}

export const ComplianceReportModal: React.FC<ComplianceReportModalProps> = ({ isOpen, onClose, violations }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Compliance Violation Report"
            footer={<Button variant="secondary" onClick={onClose}>Close</Button>}
        >
            <div className="space-y-4">
                <p>The following potential compliance violations were found in the current schedule. Please review and adjust as necessary.</p>
                {violations.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2">
                        {violations.map((v, i) => (
                             <li key={i}>
                                <strong>{v.type} ({v.employeeName} on {v.date}):</strong> {v.description}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No violations found.</p>
                )}
            </div>
        </Modal>
    );
};