export const degreesToRadians = (degrees: number): number => (degrees * Math.PI) / 180;
export const radiansToDegrees = (radians: number): number => (radians * 180) / Math.PI;

export const formatResult = (value: number): string => {
  return isFinite(value) ? value.toFixed(8) : '未定义';
};