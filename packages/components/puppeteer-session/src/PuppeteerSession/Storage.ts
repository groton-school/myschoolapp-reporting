import * as Plugin from '@qui-cli/plugin';

export type Configuration = Plugin.Configuration & {
  headless?: boolean;
  quit?: boolean;
  username?: string;
  password?: string;
  sso?: string;
  mfa?: string;
  viewportWidth?: number;
  viewportHeight?: number;
};

let _headless = false;
let _quit = true;
let _username: string | undefined = undefined;
let _password: string | undefined = undefined;
let _sso: string | undefined = undefined;
let _mfa: string | undefined = undefined;
let _viewportWidth = 0;
let _viewportHeight = 0;

export function headless(value?: boolean) {
  if (value !== undefined) {
    _headless = value;
  }
  return _headless;
}

export function quit(value?: boolean) {
  if (value !== undefined) {
    _quit = value;
  }
  return _quit;
}

export function username(value?: string) {
  if (value) {
    _username = value;
  }
  return _username;
}

export function password(value?: string) {
  if (value) {
    _password = value;
  }
  return _password;
}

export function sso(value?: string) {
  if (value) {
    _sso = value;
  }
  return _sso;
}

export function mfa(value?: string) {
  if (value) {
    _mfa = value;
  }
  return _mfa;
}

export function viewportWidth(value?: number) {
  if (value !== undefined) {
    _viewportWidth = value;
  }
  return _viewportWidth;
}

export function viewportHeight(value?: number) {
  if (value !== undefined) {
    _viewportHeight = value;
  }
  return _viewportHeight;
}
