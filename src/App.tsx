import React from 'react';
import { Calculator } from 'lucide-react';
import TrigCalculator from './components/TrigCalculator';
import InverseTrigCalculator from './components/InverseTrigCalculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Trigonometric Functions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">三角函数</h1>
          </div>
          <TrigCalculator />
          <p className="mt-6 text-sm text-gray-500 text-center">
            输入数值后按回车键计算
          </p>
        </div>

        {/* Inverse Trigonometric Functions */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-indigo-600 rotate-180" />
            <h1 className="text-2xl font-bold text-gray-800">反三角函数</h1>
          </div>
          <InverseTrigCalculator />
          <p className="mt-6 text-sm text-gray-500 text-center">
            输入数值后按回车键计算
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;