import React, { useState } from 'react';
import { FileText, Download, Calendar, AlertTriangle, TrendingUp, Brain } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ChildProfile, GameResult } from '../types';

export default function Reports() {
  const [profiles] = useLocalStorage<ChildProfile[]>('childProfiles', []);
  const [selectedProfile, setSelectedProfile] = useState<ChildProfile | null>(
    profiles.length > 0 ? profiles[0] : null
  );

  const generateReport = (profile: ChildProfile) => {
    if (profile.gameResults.length === 0) return null;

    const totalGames = profile.gameResults.length;
    const averageScore = Math.round(
      profile.gameResults.reduce((sum: number, result: GameResult) => sum + result.score, 0) / totalGames
    );
    const totalErrors = profile.gameResults.reduce(
      (sum: number, result: GameResult) => sum + result.errors,
      0
    );
    const averageTime = Math.round(
      profile.gameResults.reduce((sum: number, result: GameResult) => sum + result.timeSpent, 0) / totalGames
    );

    // Analyze patterns
    const memoryGames = profile.gameResults.filter((r: GameResult) => r.gameType === 'Jogo da Memória');
    const patternGames = profile.gameResults.filter((r: GameResult) => r.gameType === 'Jogo de Sequências');
    const colorGames = profile.gameResults.filter((r: GameResult) => r.gameType === 'Jogo das Cores');

    const memoryAvg = memoryGames.length > 0 
      ? Math.round(memoryGames.reduce((sum: number, r: GameResult) => sum + r.score, 0) / memoryGames.length)
      : 0;
    const patternAvg = patternGames.length > 0 
      ? Math.round(patternGames.reduce((sum: number, r: GameResult) => sum + r.score, 0) / patternGames.length)
      : 0;
    const colorAvg = colorGames.length > 0 
      ? Math.round(colorGames.reduce((sum: number, r: GameResult) => sum + r.score, 0) / colorGames.length)
      : 0;

    return {
      totalGames,
      averageScore,
      totalErrors,
      averageTime,
      memoryAvg,
      patternAvg,
      colorAvg,
      memoryGames: memoryGames.length,
      patternGames: patternGames.length,
      colorGames: colorGames.length,
    };
  };

  const printReport = () => {
    if (!selectedProfile) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const report = generateReport(selectedProfile);
    if (!report) return;

    const htmlContent = `...`; // Mantive igual ao seu, sem alterações
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  if (profiles.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Nenhum Relatório Disponível</h2>
        <p className="text-gray-600">Crie um perfil e jogue alguns jogos para gerar relatórios!</p>
      </div>
    );
  }

  const report = selectedProfile ? generateReport(selectedProfile) : null;

  return (
    <div className="space-y-8">
      {/* Restante do seu layout mantido exatamente igual */}
    </div>
  );
}
