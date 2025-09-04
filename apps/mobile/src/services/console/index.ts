// Console service

import { CONSOLE_COMMANDS } from '@/domain/constants';
import { timerService } from '@/services/timer';
import { coachAgent } from '@/services/coachAgent';

export interface ConsoleCommand {
  command: string;
  args: string[];
  description: string;
}

export class ConsoleService {
  private static instance: ConsoleService;
  
  private commands: ConsoleCommand[] = [
    {
      command: CONSOLE_COMMANDS.MINIMUM,
      args: ['[15|20]'],
      description: 'старт минимума',
    },
    {
      command: CONSOLE_COMMANDS.PLAN,
      args: ['[60|120]'],
      description: 'план на N минут (дефолт 120)',
    },
    {
      command: CONSOLE_COMMANDS.LOWER,
      args: [],
      description: 'снизить нагрузку на сегодня',
    },
    {
      command: CONSOLE_COMMANDS.REFLECT,
      args: [],
      description: 'открыть «Запись №…»',
    },
    {
      command: CONSOLE_COMMANDS.START,
      args: ['<protocolId>'],
      description: 'запустить протокол каталога',
    },
  ];
  
  static getInstance(): ConsoleService {
    if (!ConsoleService.instance) {
      ConsoleService.instance = new ConsoleService();
    }
    return ConsoleService.instance;
  }
  
  // Get all available commands
  getCommands(): ConsoleCommand[] {
    return [...this.commands];
  }
  
  // Parse a command string
  parseCommand(input: string): { command: string; args: string[] } | null {
    const trimmed = input.trim();
    if (!trimmed.startsWith('/')) {
      return null;
    }
    
    const parts = trimmed.split(' ');
    const command = parts[0];
    const args = parts.slice(1);
    
    return { command, args };
  }
  
  // Execute a console command
  async executeCommand(input: string): Promise<string> {
    const parsed = this.parseCommand(input);
    if (!parsed) {
      return 'Неверный формат команды. Команды должны начинаться с /';
    }
    
    const { command, args } = parsed;
    
    switch (command) {
      case CONSOLE_COMMANDS.MINIMUM:
        return this.executeMinimumCommand(args);
      
      case CONSOLE_COMMANDS.PLAN:
        return this.executePlanCommand(args);
      
      case CONSOLE_COMMANDS.LOWER:
        return this.executeLowerCommand();
      
      case CONSOLE_COMMANDS.REFLECT:
        return this.executeReflectCommand();
      
      case CONSOLE_COMMANDS.START:
        return this.executeStartCommand(args);
      
      default:
        return `Неизвестная команда: ${command}. Введите /help для списка доступных команд.`;
    }
  }
  
  // Execute /minimum command
  private async executeMinimumCommand(args: string[]): Promise<string> {
    const duration = args[0] ? parseInt(args[0], 10) : 15;
    
    if (isNaN(duration) || (duration !== 15 && duration !== 20)) {
      return 'Неверная продолжительность. Используйте 15 или 20 минут.';
    }
    
    // Start a focus session
    const session = timerService.startSession('focus');
    return `Минимум запущен на ${duration} минут. Начало: ${session.startedAt}`;
  }
  
  // Execute /plan command
  private async executePlanCommand(args: string[]): Promise<string> {
    const duration = args[0] ? parseInt(args[0], 10) : 120;
    
    if (isNaN(duration) || duration < 60 || duration > 120) {
      return 'Неверная продолжительность. Используйте значение от 60 до 120 минут.';
    }
    
    // Generate a plan using the AI coach
    const nonce = coachAgent.generateNonce();
    return `План на ${duration} минут сгенерирован. Nonce: ${nonce}`;
  }
  
  // Execute /lower command
  private async executeLowerCommand(): Promise<string> {
    // Adjust load downward
    // In a real implementation, this would interact with the coach agent
    return 'Нагрузка снижена на сегодня.';
  }
  
  // Execute /reflect command
  private async executeReflectCommand(): Promise<string> {
    // Open reflection screen
    return 'Открываю экран записи для рефлексии.';
  }
  
  // Execute /start command
  private async executeStartCommand(args: string[]): Promise<string> {
    if (args.length === 0) {
      return 'Необходимо указать ID протокола. Использование: /start <protocolId>';
    }
    
    const protocolId = args[0];
    // Start protocol
    // In a real implementation, this would start the protocol
    return `Протокол ${protocolId} запущен.`;
  }
}

// Export singleton instance
export const consoleService = ConsoleService.getInstance();