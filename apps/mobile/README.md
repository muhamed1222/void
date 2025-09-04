# White Room

Практичное приложение для планирования и отслеживания личной продуктивности с фокусом на минимализм и оффлайн-первую архитектуру.

## Архитектура

Приложение следует архитектуре, описанной в [Архитектура разработки.md](../../Архитектура%20разработки.md).

## Стек технологий

- **Фреймворк**: Expo (React Native + TypeScript)
- **Навигация**: `@react-navigation/native` (Stack + BottomTabs)
- **Состояние**: `zustand` + `persist` (на MMKV)
- **Хранилище**: 
  - MMKV для легковесных состояний
  - SQLite для журналов и протоколов
- **Списки**: `@shopify/flash-list`
- **Тестирование**: Jest + React Native Testing Library (unit), Detox (E2E)
- **ИИ-слой**: провайдер-агностичный HTTP (OpenAI-совместимый)

## Структура проекта

```
src/
  navigation/             # Навигация (react-navigation)
  screens/                # Экраны приложения
  components/             # Переиспользуемые компоненты
  store/                  # Zustand store
  services/               # Сервисы (таймер, ИИ, хранилище и т.д.)
  domain/                 # Доменные типы, константы, флаги
  utils/                  # Утилиты (время, форматирование и т.д.)
  theming/                # Темизация (typography, spacing)
e2e/                    # E2E тесты (Detox)
```

## Установка

```bash
npm install
```

## Запуск

```bash
# Запуск в режиме разработки
npm start

# Запуск на iOS
npm run ios

# Запуск на Android
npm run android
```

## Тестирование

```bash
# Unit тесты
npm test

# E2E тесты (требуется запущенный эмулятор/симулятор)
npm run e2e
```

## Сборка

Используется Expo Application Services (EAS) для сборки и доставки:

```bash
# Сборка для разработки
eas build --profile development

# Сборка для production
eas build --profile production
```

## CI/CD

GitHub Actions для автоматической проверки типов, линтинга, тестов и сборки.

## Локализация

Основной язык: ru (русский)
Планируемый дополнительный язык: en (английский)

## Безопасность

- Все данные хранятся локально
- Сетевые запросы к ИИ не содержат PII
- Safety-гейт для критических ситуаций