const STORAGE_KEY = "vibehub_fake_user";

const mockUsers = {
  visitor: {
    id: "visitor-1",
    name: "Alex Rivers",
    email: "alex.rivers@vibehub.club",
    role: "visitor",
    joinedAt: "October 24, 2024",
    bio: "Digital storyteller and curator of ethereal aesthetic spaces. Seeking inspiration in the intersection of tech and human emotion.",
    interests: ["Digital Art", "UX Design", "Minimalism", "Soulful Spaces"],
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAhympUU7yJ0UXIaO_ZWPeAleXI5I85h-3Xz6xnWB8Zd3VyhUJDSEq4y-j6nvk2ycBufoBluGLqOrlrpENLOd5xt2vlc5TJ0w2NBHxtQobN5ERyJvt1vZqXlF2dvXZeMewaFhdzApQ5njfa2sxuJ3msuMBuwddeSuKW62GXUdJ-zafIjX7u5OnyEP4ojUkGXOAwfKgZYCWdcqZb-wVpOlk5Topjvy97ga5ndS_KOS3qbroXprePsk44VJA-4clzNqmo6V_Qn9fGXpw",
  },
  member: {
    id: "member-1",
    name: "Alex",
    email: "alex.member@vibehub.club",
    role: "member",
    mbti: "INTJ",
    mbtiBlurb:
      "The Architect: Imaginative and strategic thinkers with a plan for everything.",
    eventsAttended: 12,
    testsTaken: 4,
    xpCurrent: 240,
    xpGoal: 500,
    tier: "Silver Tier",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnXEFypmfE2zm7XkpmzJuD-Im1sxaSlArAVc69QQ1FEguvOi0Oin6CQThtEqJxxdQE0-eLyYaw26faFpjXFEPfa7MTqTR-2am03zzlZ57SHQ64agFGp7SMN-oIUlNDZ6n4FhHhZpFS0-H8PB6qZMa818KqwvFS6EDbC-WDxWjQe19UI0zOnRPukCnFwUiDUHHi0BQxx1iYwNBgMi_j6gYFTx4RP1j6MkMa3bPOCM-3S6fSIGrtwsld9OXIm13fobnJChus0LcAt6o",
  },
  admin: {
    id: "admin-1",
    name: "Alex Rivera",
    email: "admin@vibehub.club",
    role: "admin",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTL3i9djwipRW3LJx_vnuKNw6um8K5lpmD0AqnatWJ642px9t5ADy_BhOKvTmt6-Kq_G3GLU3CHcJV-BMJAgQpn7Kgy7CZ6VjOu-dXT-7-0B93XlIIagAIhPeLBPwtiiW-ai5_IfayTa0LUTDNJFJeIxk1k9BgsAH6kAS1wPta8NJTLmQJ6Z0j9ZLZarO5yGNDjibPjcaDzJnAFiixHFIDgsLRNz9SiSArEpoKPmifMizSKXyhr45Pln_EFG5r4gy7wZFo2NLd_OI",
  },
};

/**
 * @param {"visitor" | "member" | "admin"} role
 */
export function login(role) {
  const user = mockUsers[role];
  if (!user) {
    throw new Error(`Unknown role: ${role}`);
  }
  const snapshot = { ...user };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore quota / private mode */
  }
  return snapshot;
}

export function logout() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
