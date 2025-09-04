// Navigation types

export type RootTabParamList = {
  Today: undefined;
  Diagnostics: undefined;
  Console: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  Record: { id: string };
  Catalog: undefined;
  Scenarios: undefined;
  Protocols: undefined;
  Settings: undefined;
  Status: undefined;
  ProtocolDetail: { id: string };
  Entry: undefined;
  Archive: undefined;
  Docs: undefined;
};

export type AppStackParamList = RootStackParamList & RootTabParamList;