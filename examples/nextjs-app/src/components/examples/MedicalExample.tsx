'use client';

import React, { useState } from 'react';
import { useEncryption } from '@/hooks/useEncryption';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface MedicalRecord {
  id: string;
  type: string;
  encryptedValue: string;
  timestamp: string;
}

export function MedicalExample() {
  const [bloodPressure, setBloodPressure] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [bloodSugar, setBloodSugar] = useState('');
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const { encrypt, isEncrypting } = useEncryption();

  const encryptAndStoreRecord = async (
    type: string,
    value: string,
    dataType: 'uint8' | 'uint16' = 'uint8'
  ) => {
    if (!value) return;

    try {
      const encrypted = await encrypt(dataType, parseInt(value));
      const hexString = Array.from(encrypted.data)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

      const record: MedicalRecord = {
        id: Date.now().toString(),
        type,
        encryptedValue: hexString,
        timestamp: new Date().toLocaleString(),
      };

      setRecords(prev => [...prev, record]);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  return (
    <Card title="Confidential Medical Records Example">
      <div className="space-y-6">
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
          <p className="text-sm text-purple-800">
            <strong>Use Case:</strong> Securely encrypt sensitive medical data like vital signs.
            Healthcare providers can compute on encrypted data without exposing patient privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Input
              label="Blood Pressure (mmHg)"
              type="number"
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              placeholder="e.g., 120"
            />
            <Button
              onClick={() => encryptAndStoreRecord('Blood Pressure', bloodPressure, 'uint8')}
              disabled={isEncrypting || !bloodPressure}
              variant="primary"
              className="mt-2 w-full"
            >
              Encrypt BP
            </Button>
          </div>

          <div>
            <Input
              label="Heart Rate (bpm)"
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="e.g., 72"
            />
            <Button
              onClick={() => encryptAndStoreRecord('Heart Rate', heartRate, 'uint8')}
              disabled={isEncrypting || !heartRate}
              variant="primary"
              className="mt-2 w-full"
            >
              Encrypt HR
            </Button>
          </div>

          <div>
            <Input
              label="Blood Sugar (mg/dL)"
              type="number"
              value={bloodSugar}
              onChange={(e) => setBloodSugar(e.target.value)}
              placeholder="e.g., 95"
            />
            <Button
              onClick={() => encryptAndStoreRecord('Blood Sugar', bloodSugar, 'uint8')}
              disabled={isEncrypting || !bloodSugar}
              variant="primary"
              className="mt-2 w-full"
            >
              Encrypt BS
            </Button>
          </div>
        </div>

        {records.length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Encrypted Medical Records:</h4>
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="p-3 bg-purple-50 border border-purple-200 rounded">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-purple-900">{record.type}</span>
                    <span className="text-xs text-gray-500">{record.timestamp}</span>
                  </div>
                  <div className="font-mono text-xs break-all text-gray-700">
                    {record.encryptedValue.slice(0, 48)}...
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded">
          <h5 className="font-semibold mb-2 text-sm">Privacy Features:</h5>
          <ul className="text-sm space-y-1 text-gray-700">
            <li>✓ Data encrypted before storage</li>
            <li>✓ Computations possible without decryption</li>
            <li>✓ Only authorized parties can decrypt</li>
            <li>✓ HIPAA-compliant encryption standards</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
