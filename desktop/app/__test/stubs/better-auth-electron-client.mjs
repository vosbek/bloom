// The real Better Auth Electron client initializes Electron-only protocol,
// session, and IPC surfaces at module load. Desktop unit tests run in plain
// Node, so provide only the client actions consumed by src/main/accounts.ts.
export function electronClient() {
  return {
    id: 'better-auth-electron-test',
    getActions() {
      return {
        getCookie: () => '',
        requestAuth: async () => undefined,
        setupMain: () => undefined
      }
    }
  }
}

export function normalizeUserOutput(user) {
  return user.image ? { ...user, image: `user-image://${user.id}` } : { ...user }
}

export function registerUserImageScheme() {}
