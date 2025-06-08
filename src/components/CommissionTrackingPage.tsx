
import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import EarningsSnapshot from './commission/EarningsSnapshot';
import FilterBar from './commission/FilterBar';
import CommissionTable from './commission/CommissionTable';

const CommissionTrackingPage = () => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState('all');

  const commissionData = [
    {
      loadId: 'LD-20240301-001',
      dateCompleted: '2024-03-01',
      carrier: 'Rajesh Transport',
      amountEarned: '₹5,500',
      paymentStatus: 'Paid' as const,
      baseCommission: '₹4,000',
      bonus: '₹1,500',
      transactionId: 'TXN240301001',
      paymentMode: 'Bank Transfer'
    },
    {
      loadId: 'LD-20240228-005',
      dateCompleted: '2024-02-28',
      carrier: 'Kumar Logistics',
      amountEarned: '₹3,200',
      paymentStatus: 'Pending' as const,
      baseCommission: '₹2,800',
      bonus: '₹400'
    },
    {
      loadId: 'LD-20240225-003',
      dateCompleted: '2024-02-25',
      carrier: 'Singh Transport',
      amountEarned: '₹7,800',
      paymentStatus: 'Paid' as const,
      baseCommission: '₹6,000',
      bonus: '₹1,800',
      transactionId: 'TXN240225003',
      paymentMode: 'UPI'
    },
    {
      loadId: 'LD-20240220-007',
      dateCompleted: '2024-02-20',
      carrier: 'Sharma Freight',
      amountEarned: '₹4,500',
      paymentStatus: 'Overdue' as const,
      baseCommission: '₹3,200',
      bonus: '₹1,300'
    }
  ];

  const totalEarned = commissionData.reduce((sum, item) => {
    return sum + parseInt(item.amountEarned.replace(/[₹,]/g, ''));
  }, 0);

  const pendingAmount = commissionData
    .filter(item => item.paymentStatus === 'Pending' || item.paymentStatus === 'Overdue')
    .reduce((sum, item) => {
      return sum + parseInt(item.amountEarned.replace(/[₹,]/g, ''));
    }, 0);

  const monthlyChange = 12.5; // Positive percentage change

  const handleApplyFilters = () => {
    console.log('Applying filters:', { dateRange, statusFilter });
    // Filter logic would go here
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    // Export logic would go here
  };

  const handleRemindPayment = (loadId: string) => {
    console.log('Sending payment reminder for:', loadId);
    // Reminder logic would go here (WhatsApp/Email)
  };

  const handleViewInvoice = (loadId: string) => {
    console.log('Viewing invoice for:', loadId);
    // Invoice viewing logic would go here
  };

  return (
    <DashboardLayout
      userRole="broker"
      userName="Rajesh Kumar"
      userId="BR123456"
      isVerified={false}
      verificationStatus="not-started"
    >
      {/* Breadcrumb */}
      <div className="mb-6">
        <p className="text-sm text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
          Dashboard &gt; Commission Tracking
        </p>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
          💼 Commission Dashboard
        </h1>
        <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
          Track your earnings, manage payments, and analyze performance
        </p>
      </div>

      {/* Block A: Earnings Snapshot */}
      <EarningsSnapshot 
        totalEarned={totalEarned}
        pendingAmount={pendingAmount}
        monthlyChange={monthlyChange}
      />

      {/* Block B: Filter Bar */}
      <FilterBar
        dateRange={dateRange}
        statusFilter={statusFilter}
        onDateRangeChange={setDateRange}
        onStatusFilterChange={setStatusFilter}
        onApplyFilters={handleApplyFilters}
        onExportCSV={handleExportCSV}
      />

      {/* Block C: Commission Details Table */}
      <CommissionTable
        data={commissionData}
        onRemindPayment={handleRemindPayment}
        onViewInvoice={handleViewInvoice}
      />
    </DashboardLayout>
  );
};

export default CommissionTrackingPage;
