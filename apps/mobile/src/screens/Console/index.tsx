import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/useStore';
import { useThemeColors } from '@/theming/hooks';

const ConsoleScreen = () => {
  const { consoleMessages, addConsoleMessage } = useStore();
  const colors = useThemeColors();
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Add initial welcome message
  useEffect(() => {
    if (consoleMessages.length === 0) {
      addConsoleMessage('> Добро пожаловать в консоль коуча');
      addConsoleMessage('> Доступные команды: /minimum, /plan, /lower, /reflect, /start <id>');
    }
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [consoleMessages]);

  const processCommand = (command: string) => {
    addConsoleMessage(`> ${command}`);
    
    // Process different commands
    if (command.startsWith('/minimum')) {
      addConsoleMessage('Установлено минимальное время фокуса: 15 минут');
    } else if (command.startsWith('/plan')) {
      addConsoleMessage('Генерация плана на день...');
      addConsoleMessage('План-2ч: Фокус-сессия 25 мин | Перерыв 5 мин | Фокус-сессия 25 мин | Перерыв 15 мин');
    } else if (command.startsWith('/lower')) {
      addConsoleMessage('Нагрузка снижена. Рекомендую сосредоточиться только на обязательных задачах.');
    } else if (command.startsWith('/reflect')) {
      addConsoleMessage('Начинаем процесс рефлексии...');
      addConsoleMessage('Вопрос 1: Что сегодня далось легко?');
    } else if (command.startsWith('/start')) {
      const protocolId = command.split(' ')[1];
      if (protocolId) {
        addConsoleMessage(`Запуск протокола ${protocolId}...`);
        addConsoleMessage('Протокол №001 "Утренний ритуал" запущен');
        addConsoleMessage('Шаг 1: Медитация 5 минут');
      } else {
        addConsoleMessage('Ошибка: Укажите ID протокола. Пример: /start 001');
      }
    } else {
      addConsoleMessage(`Неизвестная команда: ${command}`);
      addConsoleMessage('> Доступные команды: /minimum, /plan, /lower, /reflect, /start <id>');
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      processCommand(inputText.trim());
      setInputText('');
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.nativeEvent.key === 'Enter') {
      handleSend();
    }
  };

  const renderMessage = ({ item }: { item: string }) => (
    <Text style={[styles.message, { color: colors.text }]}>
      {item}
    </Text>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Консоль</Text>
      
      {/* Console Output */}
      <View style={[styles.consoleOutput, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
        <FlatList
          ref={flatListRef}
          data={consoleMessages}
          renderItem={renderMessage}
          keyExtractor={(item, index) => index.toString()}
          style={styles.messageList}
        />
      </View>
      
      {/* Command Input */}
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
          placeholder="Введите команду..."
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={[styles.sendButtonText, { color: colors.primary }]}>[ Отправить ]</Text>
        </TouchableOpacity>
      </View>
      
      {/* Supported Commands */}
      <View style={[styles.commandsSection, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.commandsTitle, { color: colors.text }]}>Поддерживаемые команды:</Text>
        <Text style={[styles.command, { color: colors.text }]}>/minimum - Установить минимальное время фокуса</Text>
        <Text style={[styles.command, { color: colors.text }]}>/plan - Сгенерировать/получить дневной план</Text>
        <Text style={[styles.command, { color: colors.text }]}>/lower - Снизить нагрузку</Text>
        <Text style={[styles.command, { color: colors.text }]}>/reflect - Запустить процесс рефлексии</Text>
        <Text style={[styles.command, { color: colors.text }]}>/start {'<id>'} - Запустить протокол по ID</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  consoleOutput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  messageList: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    fontFamily: 'monospace',
  },
  sendButton: {
    justifyContent: 'center',
    padding: 12,
  },
  sendButtonText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  commandsSection: {
    padding: 16,
    borderRadius: 4,
  },
  commandsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  command: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
});

export default ConsoleScreen;