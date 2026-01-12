declare module 'croffle' {
  export interface Schedule {
    id: string;
    title: string;
    description: string;
    location: string;
    startDate: string; // ISO 8601 format
    endDate: string; // ISO 8601 format
    isAllDay: boolean;
    recurrenceRule?: string;
    colorLabel: string;
    tags: Tag[];
    createdAt: string; // ISO 8601 format
    updatedAt: string; // ISO 8601 format
  }

  export interface Tag {
    id: string;
    name: string;
    color: string;
  }

  export interface SearchQuery {
    text?: string;
    dateRange?: {
      start: string; // ISO 8601 format
      end: string; // ISO 8601 format
    };
    tags?: Tag[];
  }

  export interface PluginInfo {
    id: string;
    name: string;
    version: string;
    author: string;
    description: string;
    enabled: boolean;
  }

  export enum AppSettingLanguage {
    KO = 'ko',
    EN = 'en',
  }

  export enum AppSettingTheme {
    LIGHT = 'light',
    DARK = 'dark',
    SYSTEM = 'system',
  }

  export enum AppSettingStartupBehavior {
    OPEN_LAST_SESSION = 'openLastSession',
    OPEN_NEW_WINDOW = 'openNewWindow',
    DO_NOTHING = 'doNothing',
  }

  export enum CalendarView {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year',
  }

  export enum CalendarWeekStartDay {
    SUNDAY = 'sunday',
    MONDAY = 'monday',
  }

  export enum CalendarTimeFormat {
    H12 = '12h',
    H24 = '24h',
  }

  export interface AppSettings {
    general: {
      language: AppSettingLanguage;
      theme: AppSettingTheme;
      autoUpdate: boolean;
      startupBehavior: AppSettingStartupBehavior;
      startOnSystemBoot: boolean;
      startMinimized: boolean;
    };
    calendar: {
      defaultView: CalendarView;
      weekStartDay: CalendarWeekStartDay;
      showWeekNumbers: boolean;
      timeFormat: CalendarTimeFormat;
    };
    notifications: {
      enabled: boolean;
      defaultReminderMinutes: number;
    };
  }

  export namespace windows {
    export function minimize(): void;
    export function maximize(): void;
    export function close(): void;
  }

  export namespace tags {
    export function getAll(): Promise<Tag[]>;
    export function getByName(name: string): Promise<Tag | null>;
    export function create(name: string, color: string): Promise<Tag>;
    export function modify(id: string, name: string, color: string): Promise<Tag>;
    export function remove(id: string): Promise<boolean>;
  }

  export namespace schedules {
    export function get(id: string): Promise<Schedule | null>;
    export function getAll(): Promise<Schedule[]>;
    export function create(data: Partial<Schedule>): Promise<Schedule>;
  }

  export namespace pluginInfo {
    export function getInstalled(): Promise<PluginInfo[]>;
    export function getEnabled(): Promise<PluginInfo[]>;
    export function getByName(name: string): Promise<PluginInfo | null>;
    export function install(data: Partial<PluginInfo>): Promise<PluginInfo>;
    export function toggle(name: string, enable: boolean): Promise<PluginInfo | null>;
    export function uninstall(name: string): Promise<boolean>;
  }

  export namespace settings {
    export function get(): Promise<AppSettings>;
    export function update(newSettings: Partial<AppSettings>): Promise<AppSettings>;
  }

  export namespace pluginStorage {
    export function get(pluginId: string, key: string): Promise<string | null>;
    export function set(pluginId: string, key: string, value: string): Promise<void>;
    export function remove(pluginId: string, key: string): Promise<void>;
  }

  export const base: {
    windows: typeof windows;
    tags: typeof tags;
    schedules: typeof schedules;
    pluginInfo: typeof pluginInfo;
    settings: typeof settings;
  };

  export const app: {
    storage: typeof pluginStorage;
  };
}
