import React, { useState, KeyboardEvent } from 'react';
import { Select } from './shared/Select';
import { InverseTrigFunction, AngleUnit } from '../types/calculator';
import { radiansToDegrees, formatResult } from '../utils/math';

export default function InverseTrigCalculator() {
  const [selectedFunc, setSelectedFunc] = useState<InverseTrigFunction>('arcsin');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('degrees');
  const [inputValue, setInputValue] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const inverseTrigFunctions = [
    { value: 'arcsin', label: 'arcsin' },
    { value: 'arccos', label: 'arccos' },
    { value: 'arctan', label: 'arctan' },
    { value: 'arccsc', label: 'arccsc' },
    { value: 'arcsec', label: 'arcsec' },
    { value: 'arccot', label: 'arccot' }
  ];

  const angleUnits = [
    { value: 'degrees', label: '角度' },
    { value: 'radians', label: '弧度' }
  ];

  const calculateResult = (value: number, func: InverseTrigFunction, unit: AngleUnit) => {
    try {
      let res: number;
      switch (func) {
        case 'arcsin':
          if (value < -1 || value > 1) throw new Error('Domain error');
          res = Math.asin(value);
          break;
        case 'arccos':
          if (value < -1 || value > 1) throw new Error('Domain error');
          res = Math.acos(value);
          break;
        case 'arctan':
          res = Math.atan(value);
          break;
        case 'arccsc':
          if (Math.abs(value) < 1) throw new Error('Domain error');
          res = Math.asin(1 / value);
          break;
        case 'arcsec':
          if (Math.abs(value) < 1) throw new Error('Domain error');
          res = Math.acos(1 / value);
          break;
        case 'arccot':
          res = Math.PI / 2 - Math.atan(value);
          break;
        default:
          return '无效函数';
      }

      if (unit === 'degrees') {
        res = radiansToDegrees(res);
      }

      return formatResult(res);
    } catch {
      return '定义域错误';
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

  const getDomainText = (func: InverseTrigFunction): string => {
    switch (func) {
      case 'arcsin':
      case 'arccos':
        return '定义域: [-1, 1]';
      case 'arctan':
        return '定义域: (-∞, ∞)';
      case 'arccsc':
      case 'arcsec':
        return '定义域: (-∞, -1] ∪ [1, ∞)';
      case 'arccot':
        return '定义域: (-∞, ∞)';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select
          label="函数"
          value={selectedFunc}
          onChange={(value) => setSelectedFunc(value as InverseTrigFunction)}
          options={inverseTrigFunctions}
        />
        <Select
          label="输出单位"
          value={angleUnit}
          onChange={(value) => setAngleUnit(value as AngleUnit)}
          options={angleUnits}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          输入值
        </label>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="请输入值"
          className="block w-full rounded-lg border-gray-300 border p-2.5 focus:border-indigo-500 focus:ring-indigo-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          {getDomainText(selectedFunc)}
        </p>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <p className="text-sm text-gray-600">计算结果：</p>
          <p className="text-2xl font-semibold text-indigo-600">
            {result} {result !== '定义域错误' && result !== '无效输入' ? angleUnit === 'degrees' ? '度' : '弧度' : ''}
          </p>
        </div>
      )}
    </div>
  );
}