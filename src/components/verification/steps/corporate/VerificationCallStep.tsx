
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar as CalendarIcon, Clock, User, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

interface VerificationCallStepProps {
  data: any;
  onNext: (data: any) => void;
  onBack: () => void;
}

const VerificationCallStep = ({ data, onNext, onBack }: VerificationCallStepProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [contactPerson, setContactPerson] = useState(data.contactPerson || 'Rajesh Kumar');
  const [alternateContact, setAlternateContact] = useState(data.alternateContact || '');
  const [isScheduled, setIsScheduled] = useState(false);

  const timeSlots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  const handleScheduleCall = () => {
    if (selectedDate && selectedTime && contactPerson) {
      setIsScheduled(true);
      setTimeout(() => {
        onNext({
          scheduledDate: selectedDate,
          scheduledTime: selectedTime,
          contactPerson,
          alternateContact
        });
      }, 1500);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isScheduled) {
    return (
      <div className="p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Call Scheduled!</h2>
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-green-900 mb-2">Call Details</h3>
            <div className="space-y-2 text-sm text-green-800">
              <p><strong>Date:</strong> {selectedDate && formatDate(selectedDate)}</p>
              <p><strong>Time:</strong> {selectedTime}</p>
              <p><strong>Contact Person:</strong> {contactPerson}</p>
            </div>
          </div>
          <p className="text-gray-600">Our verification team will call you at the scheduled time. Please keep your documents ready.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Verification Call</h2>
          <p className="text-gray-600">Our team will verify your business over a 15-min call. Choose a time that works for you.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-green-600" />
                Select Date
              </h3>
              <div className="border rounded-xl p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Time Slots & Contact Info */}
          <div className="space-y-6">
            {/* Time Slots */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                Available Time Slots
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? "bg-green-500 hover:bg-green-600" : ""}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson">Representative Name</Label>
                  <Input
                    id="contactPerson"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="mt-1"
                    placeholder="Who will attend the call?"
                  />
                </div>
                <div>
                  <Label htmlFor="alternateContact">Alternate Contact (Optional)</Label>
                  <Input
                    id="alternateContact"
                    value={alternateContact}
                    onChange={(e) => setAlternateContact(e.target.value)}
                    className="mt-1"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Selected Summary */}
            {selectedDate && selectedTime && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-medium text-blue-900 mb-2">Selected Slot</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Duration:</strong> 15 minutes</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-8">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={handleScheduleCall}
            disabled={!selectedDate || !selectedTime || !contactPerson}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Book Verification Slot
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationCallStep;
