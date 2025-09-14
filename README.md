# cfsm-lista-tarefas-react-native

## Descrição

O `cfsm-lista-tarefas-react-native` é um aplicativo mobile desenvolvido em React Native para gerenciamento de tarefas (To-Do List). Ele permite ao usuário criar, listar, editar, marcar como concluídas e remover tarefas, tornando o gerenciamento do dia a dia mais prático, diretamente do smartphone. O app serve tanto como base de estudos em React Native quanto como ponto de partida para soluções mais completas.

## Tecnologias Utilizadas

- **Framework:** React Native
- **Linguagem:** JavaScript (ES6+) ou TypeScript (se aplicável)
- **Gerenciamento de Estado:** useState, Context API, Redux ou MobX (personalize conforme o projeto)
- **Navegação:** React Navigation
- **Estilização:** StyleSheet (padrão React Native), Styled Components ou Tailwind CSS (via NativeWind)
- **Testes:** Jest, React Native Testing Library
- **APIs e Serviços:** AsyncStorage, SQLite, ou integração com backend (opcional)
- **Build & Deploy:** Expo ou React Native CLI, EAS Build, Google Play Store, Apple App Store

## Estrutura de Pastas Sugerida

```
src/
├── components/     # Componentes reutilizáveis (TaskItem, TaskList, etc)
├── screens/        # Telas do aplicativo (HomeScreen, DetailsScreen, etc)
├── navigation/     # Configuração de rotas e navegação
├── hooks/          # Custom hooks
├── contexts/       # Contextos globais (opcional)
├── services/       # Serviços/API e armazenamento
├── styles/         # Estilos globais
├── utils/          # Funções utilitárias
└── App.js
```

## Como rodar localmente

1. **Pré-requisitos**
   - Node.js v18+ instalado
   - npm ou yarn
   - Expo CLI (se utilizar Expo):  
     ```bash
     npm install -g expo-cli
     ```

2. **Instalação**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execução**
   - Com Expo:
     ```bash
     expo start
     ```
   - Com React Native CLI:
     ```bash
     npx react-native run-android
     npx react-native run-ios
     ```
   - Siga as instruções do terminal para abrir no emulador ou no dispositivo físico.

4. **Testes**
   ```bash
   npm test
   # ou
   yarn test
   ```

## Funcionalidades

- Adicionar, editar e remover tarefas
- Marcar tarefas como concluídas/pendentes
- Listagem de tarefas filtradas (por status, por data, etc. — personalize conforme necessidade)
- Interface mobile responsiva, acessível e amigável
- Armazenamento local de tarefas com AsyncStorage ou banco local (opcional)
- Sincronização com backend/serviço externo (opcional)

## Deploy

- Para gerar builds de produção, utilize Expo Build ou EAS Build (caso utilize Expo) ou os comandos de build do React Native CLI.
- Consulte a [documentação do React Native](https://reactnative.dev/docs/environment-setup) e do [Expo](https://docs.expo.dev/) para detalhes de publicação.

## Contribuição

1. Faça um fork deste repositório
2. Crie uma branch para sua feature (`git checkout -b minha-feature`)
3. Commit suas alterações (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT.

---

> Dúvidas, sugestões ou encontrou algum problema? Abra uma Issue ou contribua enviando um Pull Request!