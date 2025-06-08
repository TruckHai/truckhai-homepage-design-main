
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// SVG Icons
const FileTextIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const BellIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

interface CommissionData {
  loadId: string;
  dateCompleted: string;
  carrier: string;
  amountEarned: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  baseCommission: string;
  bonus: string;
  transactionId?: string;
  paymentMode?: string;
}

interface CommissionTableProps {
  data: CommissionData[];
  onRemindPayment: (loadId: string) => void;
  onViewInvoice: (loadId: string) => void;
}

const CommissionTable = ({ data, onRemindPayment, onViewInvoice }: CommissionTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [remindedPayments, setRemindedPayments] = useState<Set<string>>(new Set());

  const handleRemindPayment = (loadId: string) => {
    onRemindPayment(loadId);
    setRemindedPayments(prev => new Set([...prev, loadId]));
    
    // Re-enable after 24 hours (for demo, we'll use 5 seconds)
    setTimeout(() => {
      setRemindedPayments(prev => {
        const newSet = new Set(prev);
        newSet.delete(loadId);
        return newSet;
      });
    }, 5000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500 text-white hover:bg-green-600">✅ Paid</Badge>;
      case 'Pending':
        return <Badge className="bg-orange-500 text-white hover:bg-orange-600">🔄 Pending</Badge>;
      case 'Overdue':
        return <Badge className="bg-red-500 text-white hover:bg-red-600">🔴 Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="bg-white border-0 shadow-md rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between" style={{ fontFamily: 'Inter, sans-serif' }}>
          <span>Commission Details</span>
          <div className="text-sm font-normal text-gray-500">
            {data.length} records
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 rounded-l-lg">Load ID</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Date Completed</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Carrier</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Amount Earned</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700">Payment Status</th>
                <th className="text-left py-4 px-4 font-semibold text-gray-700 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((commission, index) => (
                <React.Fragment key={commission.loadId}>
                  <tr 
                    className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                    }`}
                    onClick={() => setExpandedRow(expandedRow === commission.loadId ? null : commission.loadId)}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-blue-600 hover:text-blue-800">
                          {commission.loadId}
                        </span>
                        <ChevronDownIcon />
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{commission.dateCompleted}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                          <span className="text-xs font-semibold text-white">
                            {commission.carrier.charAt(0)}
                          </span>
                        </div>
                        <span className="text-gray-900 font-medium">{commission.carrier}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900 text-lg">{commission.amountEarned}</span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(commission.paymentStatus)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewInvoice(commission.loadId);
                          }}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <FileTextIcon />
                          <span>Invoice</span>
                        </Button>
                        {commission.paymentStatus === 'Pending' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemindPayment(commission.loadId);
                            }}
                            disabled={remindedPayments.has(commission.loadId)}
                            className={`${
                              remindedPayments.has(commission.loadId)
                                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                                : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                            }`}
                          >
                            <BellIcon />
                            <span>
                              {remindedPayments.has(commission.loadId) ? 'Reminded' : 'Remind'}
                            </span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  {/* Expanded Row Details */}
                  {expandedRow === commission.loadId && (
                    <tr className="bg-blue-50 border-b border-blue-200">
                      <td colSpan={6} className="py-4 px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-semibold text-gray-700">Transaction ID:</span>
                            <p className="text-gray-600">{commission.transactionId || 'TXN' + commission.loadId.slice(-6)}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Base Commission:</span>
                            <p className="text-gray-600">{commission.baseCommission}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Bonus:</span>
                            <p className="text-gray-600">{commission.bonus}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Payment Mode:</span>
                            <p className="text-gray-600">{commission.paymentMode || 'Bank Transfer'}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-700">Payout Reference:</span>
                            <p className="text-gray-600">REF{commission.loadId.slice(-8)}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Accordion Cards */}
        <div className="md:hidden space-y-4">
          {data.map((commission) => (
            <Card key={commission.loadId} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-blue-600">{commission.loadId}</span>
                    {getStatusBadge(commission.paymentStatus)}
                  </div>
                  <span className="font-bold text-lg">{commission.amountEarned}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {commission.carrier.charAt(0)}
                      </span>
                    </div>
                    <span>{commission.carrier}</span>
                  </div>
                  <p>Completed: {commission.dateCompleted}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onViewInvoice(commission.loadId)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex-1"
                  >
                    <FileTextIcon />
                    <span>View Invoice</span>
                  </Button>
                  {commission.paymentStatus === 'Pending' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRemindPayment(commission.loadId)}
                      disabled={remindedPayments.has(commission.loadId)}
                      className={`flex-1 ${
                        remindedPayments.has(commission.loadId)
                          ? 'border-gray-300 text-gray-400'
                          : 'border-orange-500 text-orange-600 hover:bg-orange-50'
                      }`}
                    >
                      <BellIcon />
                      <span>
                        {remindedPayments.has(commission.loadId) ? 'Reminded' : 'Remind Payment'}
                      </span>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sticky Mobile Remind Bar */}
        <div className="md:hidden fixed bottom-4 left-4 right-4 bg-orange-500 text-white p-4 rounded-lg shadow-lg z-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Quick Payout Nudge</p>
              <p className="text-sm opacity-90">Send reminders for all pending payments</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              className="text-white border-white hover:bg-orange-600"
            >
              Send All
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommissionTable;
