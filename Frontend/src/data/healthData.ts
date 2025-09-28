export interface HealthDataPoint {
  date: string;
  energy: number;
  stress: number;
  digestion: number;
  sleep: number;
}

// Mock data for 30 days of health metrics (0-100 scale)
const generateMockHealthData = (): HealthDataPoint[] => {
  const data: HealthDataPoint[] = [];
  const startDate = new Date('2024-12-01');
  
  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];
    
    // Generate sample data with some trends (energy improving, stress decreasing, etc.)
    data.push({
      date: dateStr,
      energy: Math.round(60 + (i * 1.2) + (Math.random() * 10 - 5)), // Improving trend
      stress: Math.round(70 - (i * 0.8) + (Math.random() * 10 - 5)), // Decreasing trend
      digestion: Math.round(65 + (Math.sin(i / 5) * 15) + (Math.random() * 10 - 5)), // Fluctuating
      sleep: Math.round(75 - (Math.random() * 20) + (i % 7 === 0 ? 10 : 0)), // Weekly pattern
    });
  }
  
  return data;
};

const healthData = generateMockHealthData();

export default healthData;
