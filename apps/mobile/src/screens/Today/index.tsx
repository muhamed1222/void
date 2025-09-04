import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useStore } from '@/store/useStore';
import { useThemeColors } from '@/theming/hooks';
import { TaskItem, Message } from '@/domain/types';

const TodayScreen = () => {
  const { 
    todayTasks, 
    contextualInstruction, 
    streak, 
    disciplineScore, 
    focusTime,
    coachMessages,
    addTask,
    completeTask,
    setContextualInstruction,
    addCoachMessage,
    setFocusTime
  } = useStore();
  
  const colors = useThemeColors();
  const [loading, setLoading] = useState(false);
  
  // Load contextual instruction and coach messages on component mount
  useEffect(() => {
    loadContextualInstruction();
    loadCoachMessages();
    // Initialize with some default tasks if none exist
    if (todayTasks.length === 0) {
      initializeDefaultTasks();
    }
  }, []);
  
  const loadContextualInstruction = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call the coach agent service
      // For now, we'll use a placeholder
      setContextualInstruction("Сегодня рекомендую сосредоточиться на важных задачах и сделать перерыв каждые 45 минут.");
    } catch (error) {
      console.error('Error loading contextual instruction:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const loadCoachMessages = async () => {
    try {
      // Only add the placeholder message if there are no messages
      if (coachMessages.length === 0) {
        // In a real implementation, this would load messages from the coach agent
        // For now, we'll add a placeholder message with a unique ID
        const placeholderMessage: Message = {
          id: `coach-msg-${Date.now()}`, // Use timestamp to ensure unique ID
          content: 'Не забудь сделать перерыв через 45 минут работы!',
          role: 'coach',
          timestamp: new Date().toISOString(),
          type: 'reminder'
        };
        addCoachMessage(placeholderMessage);
      }
    } catch (error) {
      console.error('Error loading coach messages:', error);
    }
  };
  
  const initializeDefaultTasks = () => {
    // Add a minimum focus time task (15-20 min)
    const minFocusTask: TaskItem = {
      id: 'task-min-focus',
      title: 'Минимум фокуса (15-20 мин)',
      domain: 'mind',
      done: false,
      createdAt: new Date().toISOString(),
      estimatedDuration: 20
    };
    
    // Add a book reading task
    const bookTask: TaskItem = {
      id: 'task-book-reading',
      title: 'Прочитать +10 страниц',
      domain: 'mind',
      done: false,
      createdAt: new Date().toISOString(),
      estimatedDuration: 15
    };
    
    // Add some regular tasks
    const regularTask1: TaskItem = {
      id: 'task-regular-1',
      title: 'Завершить важный проект',
      domain: 'mind',
      done: false,
      createdAt: new Date().toISOString(),
      estimatedDuration: 60
    };
    
    const regularTask2: TaskItem = {
      id: 'task-regular-2',
      title: 'Сделать упражнения',
      domain: 'body',
      done: false,
      createdAt: new Date().toISOString(),
      estimatedDuration: 30
    };
    
    // Add tasks to store
    addTask(minFocusTask);
    addTask(bookTask);
    addTask(regularTask1);
    addTask(regularTask2);
    
    // Set default focus time
    setFocusTime(0);
  };
  
  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId);
    // Update focus time if this was a focus task
    const task = todayTasks.find(t => t.id === taskId);
    if (task && task.id === 'task-min-focus') {
      setFocusTime(focusTime + task.estimatedDuration);
    }
    // In a real implementation, this would trigger an update to the coach agent
  };
  
  const handleLowerWorkload = () => {
    // In a real implementation, this would communicate with the coach agent
    console.log('Lower workload requested');
  };
  
  const handleRebuildPlan = () => {
    // In a real implementation, this would communicate with the coach agent
    console.log('Rebuild plan requested');
  };
  
  const openFullChat = () => {
    // In a real implementation, this would navigate to the full chat screen
    console.log('Opening full chat');
  };
  
  const renderTaskItem = ({ item }: { item: TaskItem }) => (
    <View style={[styles.taskItem, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
      <TouchableOpacity 
        onPress={() => handleTaskComplete(item.id)}
        disabled={item.done}
      >
        <Text style={[
          styles.taskTitle, 
          { 
            color: item.done ? colors.textSecondary : colors.text,
            textDecorationLine: item.done ? 'line-through' : 'none'
          }
        ]}>
          {item.title}
        </Text>
      </TouchableOpacity>
      {item.done && (
        <Text style={[styles.taskCompleted, { color: colors.success }]}>
          ✓ Завершено
        </Text>
      )}
    </View>
  );
  
  const renderCoachMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageItem, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.messageContent, { color: colors.text }]}>{item.content}</Text>
      <Text style={[styles.messageTime, { color: colors.textSecondary }]}>
        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Сегодня</Text>
      
      {/* Contextual Instruction */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Инструкция</Text>
        {loading ? (
          <ActivityIndicator size="small" color={colors.primary} />
        ) : (
          <Text style={[styles.instructionText, { color: colors.text }]}>{contextualInstruction}</Text>
        )}
      </View>
      
      {/* Task List */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Задачи</Text>
        <FlatList
          data={todayTasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          style={styles.taskList}
        />
      </View>
      
      {/* Quick Actions */}
      <View style={[styles.section, styles.quickActionsSection]}>
        <TouchableOpacity onPress={handleLowerWorkload} style={styles.quickActionButton}>
          <Text style={[styles.quickActionText, { color: colors.text }]}>[ Снизить нагрузку ]</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRebuildPlan} style={styles.quickActionButton}>
          <Text style={[styles.quickActionText, { color: colors.text }]}>[ Пересобрать план ]</Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.section}>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressLabel, { color: colors.text }]}>Прогресс дня</Text>
          <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: colors.primary,
                  width: `${(todayTasks.filter(t => t.done).length / Math.max(todayTasks.length, 1)) * 100}%`
                }
              ]} 
            />
          </View>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {todayTasks.filter(t => t.done).length} из {todayTasks.length}
          </Text>
        </View>
      </View>
      
      {/* Mini Report */}
      <View style={[styles.section, { backgroundColor: colors.backgroundSecondary }]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Мини-отчёт</Text>
        <View style={styles.reportRow}>
          <View style={styles.reportItem}>
            <Text style={[styles.reportValue, { color: colors.text }]}>{streak}</Text>
            <Text style={[styles.reportLabel, { color: colors.textSecondary }]}>Дней подряд</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={[styles.reportValue, { color: colors.text }]}>{disciplineScore}%</Text>
            <Text style={[styles.reportLabel, { color: colors.textSecondary }]}>Дисциплина</Text>
          </View>
          <View style={styles.reportItem}>
            <Text style={[styles.reportValue, { color: colors.text }]}>{focusTime} мин</Text>
            <Text style={[styles.reportLabel, { color: colors.textSecondary }]}>Фокус</Text>
          </View>
        </View>
      </View>
      
      {/* Coach Chat Snippet */}
      <View style={styles.section}>
        <View style={styles.chatHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Сообщения коуча</Text>
          <TouchableOpacity onPress={openFullChat}>
            <Text style={[styles.chatLink, { color: colors.primary }]}>Открыть чат</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={coachMessages.slice(-3)} // Show last 3 messages
          renderItem={renderCoachMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
        />
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
  section: {
    marginBottom: 16,
    padding: 16,
  },
  quickActionsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  quickActionButton: {
    padding: 8,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 16,
    lineHeight: 22,
  },
  taskList: {
    maxHeight: 150,
  },
  taskItem: {
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  taskCompleted: {
    fontSize: 14,
    marginTop: 4,
  },
  progressContainer: {
    padding: 16,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
  },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportItem: {
    alignItems: 'center',
  },
  reportValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  reportLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  chatLink: {
    fontSize: 14,
    fontWeight: '500',
  },
  messageList: {
    maxHeight: 120,
  },
  messageItem: {
    padding: 12,
    marginBottom: 8,
  },
  messageContent: {
    fontSize: 14,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 12,
  },
});

export default TodayScreen;