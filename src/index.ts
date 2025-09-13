// src/types/index.ts

// Representa o resultado de um jogo
export interface GameResult {
  gameType: string;      // tipo do jogo (Memória, Sequência, Cores etc.)
  score: number;         // pontuação
  errors: number;        // quantidade de erros
  timeSpent: number;     // tempo gasto em segundos
}

// Representa o perfil de uma criança
export interface ChildProfile {
  id: string;                   // id único do perfil
  name: string;                 // nome da criança
  createdAt: string;            // data de criação do perfil
  gameResults: GameResult[];    // lista de resultados dos jogos
}
