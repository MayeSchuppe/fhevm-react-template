import { useState, useCallback } from 'react';
import { Contract } from 'ethers';

export type ComputationOperation = 'add' | 'sub' | 'mul' | 'div' | 'and' | 'or' | 'xor';

export function useComputation() {
  const [isComputing, setIsComputing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compute = useCallback(
    async (
      contract: Contract,
      operation: ComputationOperation,
      operand1: string,
      operand2: string
    ) => {
      setIsComputing(true);
      setError(null);

      try {
        let result;

        switch (operation) {
          case 'add':
            result = await contract.add(operand1, operand2);
            break;
          case 'sub':
            result = await contract.sub(operand1, operand2);
            break;
          case 'mul':
            result = await contract.mul(operand1, operand2);
            break;
          case 'div':
            result = await contract.div(operand1, operand2);
            break;
          case 'and':
            result = await contract.and(operand1, operand2);
            break;
          case 'or':
            result = await contract.or(operand1, operand2);
            break;
          case 'xor':
            result = await contract.xor(operand1, operand2);
            break;
          default:
            throw new Error(`Unsupported operation: ${operation}`);
        }

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Computation failed';
        setError(errorMessage);
        console.error('Computation error:', err);
        throw err;
      } finally {
        setIsComputing(false);
      }
    },
    []
  );

  const performBatchOperation = useCallback(
    async (
      contract: Contract,
      operation: ComputationOperation,
      operands: string[]
    ) => {
      if (operands.length < 2) {
        throw new Error('At least 2 operands are required');
      }

      setIsComputing(true);
      setError(null);

      try {
        let result = operands[0];

        for (let i = 1; i < operands.length; i++) {
          result = await compute(contract, operation, result, operands[i]);
        }

        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Batch computation failed';
        setError(errorMessage);
        throw err;
      } finally {
        setIsComputing(false);
      }
    },
    [compute]
  );

  return {
    compute,
    performBatchOperation,
    isComputing,
    error,
  };
}
