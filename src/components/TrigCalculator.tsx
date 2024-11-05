import React, { useState, KeyboardEvent } from 'react';
import { Select } from './shared/Select';
import { TrigFunction, AngleUnit } from '../types/calculator';
import { degreesToRadians, formatResult } from '../utils/math';

export default function TrigCalculator() {
  const [selectedFunc, setSelectedFunc] = useState<TrigFunction>('sin');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('degrees');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const trigFunctions = [
    { value: 'sin', label: 'sin' },
    { value: 'cos', label: 'cos' },
    { value: 'tan', label: 'tan' },
    { value: 'csc', label: 'csc' },
    { value: 'sec', label: 'sec' },
    { value: 'cot', label: 'cot' }
  ];

  const angleUnits = [
    { value: 'degrees', label: '角度' },
    { value: 'radians', label: '弧度' }
  ];

  const calculateResult = (value: number, func: TrigFunction, unit: AngleUnit) => {
    const radians = unit === 'degrees' ? degreesToRadians(value) : value;

    try {
      let res: number;
      switch (func) {
        case 'sin': res = Math.sin(radians); break;
        case 'cos': res = Math.cos(radians); break;
        case 'tan': res = Math.tan(radians); break;
        case 'csc': res = 1 / Math.sin(radians); break;
        case 'sec': res = 1 / Math.cos(radians); break;
        case 'cot': res = 1 / Math.tan(radians); break;
        default: return '无效函数';
      }
      return formatResult(res);
    } catch {
      return '错误';
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        setResult(calculateResult(numValue, selectedFunc, angleUnit));
      } else {
        setResult('无效输入');
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          label="函数"
          value={selectedFunc}
          onChange={(value) => setSelectedFunc(value as TrigFunction)}
          options={trigFunctions}
        />
        <Select
          label="输入单位"
          value={angleUnit}
          onChange={(value) => setAngleUnit(value as AngleUnit)}
          options={angleUnits}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          角度值
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入角度值"
          className="block w-full rounded-lg border-gray-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      {result && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-600">计算结果：</p>
          <p className="text-2xl font-semibold text-indigo-600">{result}</p>
        </div>
      )}
    </div>
  );
}