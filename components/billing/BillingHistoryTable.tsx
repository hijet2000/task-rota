

import React from 'react';
// FIX: Corrected relative import path for ui.tsx.
import { Card, Button } from '../ui.tsx';
// FIX: Corrected relative import path for invoices.ts.
import { invoiceHistory } from '../../data/invoices.ts';
// FIX: Corrected relative import path for icons.tsx.
import { DownloadCloudIcon } from '../icons.tsx';

export const BillingHistoryTable: React.FC = () => {
    return (
        <Card title="Billing History" description="Download past invoices for your records.">
            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="relative px-6 py-3"><span className="sr-only">Download</span></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoiceHistory.map(invoice => (
                            <tr key={invoice.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">{invoice.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">£{invoice.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                    <a href={invoice.pdfUrl} download>
                                        <Button variant="secondary" size="sm">
                                            <DownloadCloudIcon className="w-4 h-4 mr-2" />
                                            PDF
                                        </Button>
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};