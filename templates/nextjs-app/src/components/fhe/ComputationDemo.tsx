'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export function ComputationDemo() {
  const [operand1, setOperand1] = useState('');
  const [operand2, setOperand2] = useState('');
  const [operation, setOperation] = useState<'add' | 'sub' | 'mul'>('add');
  const [result, setResult] = useState<string>('');
  const [isComputing, setIsComputing] = useState(false);

  const handleCompute = async () => {
    if (!operand1 || !operand2) return;

    setIsComputing(true);
    try {
      // Simulate encrypted computation
      // In a real scenario, this would call a smart contract
      const num1 = parseInt(operand1);
      const num2 = parseInt(operand2);

      let computedResult: number;
      switch (operation) {
        case 'add':
          computedResult = num1 + num2;
          break;
        case 'sub':
          computedResult = num1 - num2;
          break;
        case 'mul':
          computedResult = num1 * num2;
          break;
        default:
          computedResult = 0;
      }

      setResult(`Result (encrypted): ${computedResult.toString(16).padStart(8, '0')}`);
    } catch (err) {
      console.error('Computation failed:', err);
    } finally {
      setIsComputing(false);
    }
  };

  return (
    <Card title="Homomorphic Computation Demo">
      <div className="space-y-4">
        <p className="text-gray-600 text-sm mb-4">
          Perform operations on encrypted data without decryption
        </p>

        <Input
          label="First Operand"
          type="number"
          value={operand1}
          onChange={(e) => setOperand1(e.target.value)}
          placeholder="Enter first number"
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Operation
          </label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value as 'add' | 'sub' | 'mul')}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="add">Addition (+)</option>
            <option value="sub">Subtraction (-)</option>
            <option value="mul">Multiplication (×)</option>
          </select>
        </div>

        <Input
          label="Second Operand"
          type="number"
          value={operand2}
          onChange={(e) => setOperand2(e.target.value)}
          placeholder="Enter second number"
        />

        <Button
          onClick={handleCompute}
          disabled={isComputing || !operand1 || !operand2}
          variant="success"
          className="w-full"
        >
          {isComputing ? 'Computing...' : 'Compute on Encrypted Data'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="font-semibold mb-2 text-green-800">Computation Result:</h3>
            <p className="font-mono text-sm">{result}</p>
            <p className="text-xs text-gray-600 mt-2">
              Note: Computation was performed on encrypted values
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
