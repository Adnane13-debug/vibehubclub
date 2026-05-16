const fs = require('fs');
const path = require('path');

function patch(filePath, replacements) {
  const fullPath = path.resolve(__dirname, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  if (!content.includes('useTranslation')) {
    if (content.includes('import React')) {
      content = content.replace(/(import React.*?;\n)/, '$1import { useTranslation } from "react-i18next";\n');
    } else {
      content = 'import { useTranslation } from "react-i18next";\n' + content;
    }
  }

  // insert const { t } = useTranslation();
  // find the function component declaration
  const funcMatch = content.match(/function\s+(\w+)\s*\([^)]*\)\s*\{/);
  const arrowMatch = content.match(/const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{/);
  const defaultExportMatch = content.match(/export\s+default\s+function\s+(\w+)\s*\([^)]*\)\s*\{/);

  let match = funcMatch || arrowMatch || defaultExportMatch;
  if (match && !content.includes('const { t } = useTranslation()')) {
    const startIdx = match.index + match[0].length;
    content = content.slice(0, startIdx) + '\n  const { t } = useTranslation();' + content.slice(startIdx);
  }

  for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Patched ' + filePath);
}

// 1. HeroSection.jsx
patch('src/features/home/components/HeroSection.jsx', [
  ['University Pulse · 2024', '{t("hero.eyebrow")}'],
  ['<span className="block text-[2.7rem] leading-[1.06] tracking-[-0.015em] md:text-[3.4rem]">\n                Connect,\n              </span>', '<span className="block text-[2.7rem] leading-[1.06] tracking-[-0.015em] md:text-[3.4rem]">\n                {t("hero.title1")}\n              </span>'],
  ['Create{" "}', '{t("hero.title2")}{" "}'],
  ['Compete.', '{t("hero.title3")}'],
  ['at VibeHub', '{t("hero.title4")}'],
  ['This isn\'t a club directory — it\'s where students actually show\n              up. Sports, culture, startups: real events, real people, real\n              momentum. Your campus life, finally worth caring about.', '{t("hero.subtitle")}'],
  ['>1.2k<', '>{t("hero.stat1Value")}<'],
  ['>members<', '>{t("hero.stat1Label")}<'],
  ['>48<', '>{t("hero.stat2Value")}<'],
  ['>events this year<', '>{t("hero.stat2Label")}<'],
  ['>↑12%<', '>{t("hero.stat3Value")}<'],
  ['>this semester<', '>{t("hero.stat3Label")}<'],
  ['>Explore Events<', '>{t("hero.exploreEvents")}<'],
  ['Join as member', '{t("hero.joinMember")}'],
  ['38 joined this week', '{t("hero.joinedWeek")}'],
  ['membership open', '{t("hero.membershipOpen")}']
]);

// 2. StatsSection.jsx
patch('src/features/home/components/StatsSection.jsx', [
  ['Numbers that speak', '{t("stats.title")}'],
  ['Built by students, for students.', '{t("stats.subtitle")}'],
  ['const stats = [', 'const defaultStats = ['],
  ['{stats.map', '{(() => {\n          const stats = t("stats.items", { returnObjects: true }) || defaultStats;\n          const validStats = Array.isArray(stats) ? stats : defaultStats;\n          return validStats.map']
]);

// 3. AboutSection.jsx
patch('src/features/home/components/AboutSection.jsx', [
  ['Who we are', '{t("about.eyebrow")}'],
  ['About VibeHub Club', '{t("about.title")}'],
  ['VibeHub is more than just a club — it\'s a movement within the\n              university. We bridge the gap between passion and professional\n              growth by giving students a platform to excel in sports,\n              culture, and entrepreneurship.', '{t("about.paragraph1")}'],
  ['Founded on pillars of inclusivity and excellence, we empower\n              students to step out of their comfort zones and lead the next\n              generation of campus life.', '{t("about.paragraph2")}'],
  ['>3+<', '>{t("about.stat1Value")}<'],
  ['>Years active<', '>{t("about.stat1Label")}<'],
  ['>500+<', '>{t("about.stat2Value")}<'],
  ['>Students<', '>{t("about.stat2Label")}<'],
  ['>3<', '>{t("about.stat3Value")}<'],
  ['>Domains<', '>{t("about.stat3Label")}<']
]);

// 4. EventsPreviewSection.jsx
patch('src/features/home/components/EventsPreviewSection.jsx', [
  ['Upcoming events', '{t("eventsPreview.eyebrow")}'],
  ['Where the action happens', '{t("eventsPreview.title")}'],
  ['View all events', '{t("eventsPreview.viewAll")}'],
  ['Chargement...', '{t("eventsPreview.loading")}'],
  ['Aucun événement disponible.', '{t("eventsPreview.empty")}'],
  ['View event', '{t("eventsPreview.viewEvent")}']
]);

// 5. AboutHeroSection.jsx
patch('src/features/about/components/AboutHeroSection.jsx', [
  ['Est. 2021', '{t("aboutHero.badge")}'],
  ['Beyond the Lecture Hall', '{t("aboutHero.title")}'],
  ['VibeHub is more than a club; it&apos;s a launchpad for the next\n          generation of athletes, artists, and innovators.', '{t("aboutHero.subtitle")}']
]);

// 6. AboutStorySection.jsx
patch('src/features/about/components/AboutStorySection.jsx', [
  ['Our Story', '{t("aboutStory.eyebrow")}'],
  ['We started with a simple idea: ', '{t("aboutStory.title")}'],
  ['more action, less talk.', '{t("aboutStory.titleAccent")}'],
  ['Back in 2021, we realized that campus life was fragmented. The athletes, the artists, and the founders were all building incredible things, but completely in silos.', '{t("aboutStory.paragraph1")}'],
  ["VibeHub was built to crash those worlds together. We wanted a space where a coding workshop could sit next to a basketball tournament, and where the energy of one domain fuels the others. Today, we're the fastest-growing community on campus.", '{t("aboutStory.paragraph2")}'],
  ['2021', '{t("aboutStory.stat1Value")}'],
  ['Founded', '{t("aboutStory.stat1Label")}'],
  ['15+', '{t("aboutStory.stat2Value")}'],
  ['Partnerships', '{t("aboutStory.stat2Label")}'],
  ['100%', '{t("aboutStory.stat3Value")}'],
  ['Student-led', '{t("aboutStory.stat3Label")}'],
  ['Membership Open', '{t("aboutStory.membershipOpen")}'],
  ['Join for free', '{t("aboutStory.joinForFree")}']
]);

// 7. AboutMissionSection.jsx
patch('src/features/about/components/AboutMissionSection.jsx', [
  ['Purpose', '{t("aboutMission.eyebrow")}'],
  ['Driven by action and community.', '{t("aboutMission.title")}'],
  ['Our Mission', '{t("aboutMission.missionTitle")}'],
  ['To provide every student with the resources, network, and environment to pursue their passions beyond academics.', '{t("aboutMission.missionText")}'],
  ['Our Vision', '{t("aboutMission.visionTitle")}'],
  ['To become the definitive hub for student talent, where ideas are built, skills are tested, and lifelong connections are made.', '{t("aboutMission.visionText")}'],
  ['Core Values', '{t("aboutMission.valuesTitle")}'],
  ['We believe in pushing boundaries, supporting one another, and leaving the campus better than we found it.', '{t("aboutMission.valuesText")}'],
  ['const VALUES = [', 'const defaultValues = ['],
  ['{VALUES.map', '{(() => {\n                const vals = t("aboutMission.values", { returnObjects: true }) || defaultValues;\n                const validVals = Array.isArray(vals) ? vals : defaultValues;\n                return validVals.map']
]);

// 8. AboutDomainsSection.jsx
patch('src/features/about/components/AboutDomainsSection.jsx', [
  ['The Framework', '{t("aboutDomains.eyebrow")}'],
  ['Three domains. One ecosystem.', '{t("aboutDomains.title")}'],
  ['We organize our activities into three core pillars, designed to develop well-rounded leaders and creators.', '{t("aboutDomains.subtitle")}'],
  ['title: "Sports"', 'title: t("aboutDomains.sports.title")'],
  ['tag: "Movement"', 'tag: t("aboutDomains.sports.tag")'],
  ['description: "Competitive leagues, casual tournaments, and a focus on physical and mental endurance."', 'description: t("aboutDomains.sports.description")'],
  ['title: "Culture"', 'title: t("aboutDomains.culture.title")'],
  ['tag: "Expression"', 'tag: t("aboutDomains.culture.tag")'],
  ['description: "Music, art, debate, and events that celebrate diversity and creative expression."', 'description: t("aboutDomains.culture.description")'],
  ['title: "Entrepreneurship"', 'title: t("aboutDomains.entrepreneurship.title")'],
  ['tag: "Innovation"', 'tag: t("aboutDomains.entrepreneurship.tag")'],
  ['description: "Hackathons, pitch days, and networking to turn student ideas into reality."', 'description: t("aboutDomains.entrepreneurship.description")']
]);

// 9. AboutTeamSection.jsx
patch('src/features/about/components/AboutTeamSection.jsx', [
  ['Meet the Board', '{t("aboutTeam.title")}'],
  ['The students working behind the scenes to make it all happen.', '{t("aboutTeam.subtitle")}'],
  ['View all members', '{t("aboutTeam.viewAll")}'],
  ['const TEAM = [', 'const defaultTeam = ['],
  ['{TEAM.map', '{(() => {\n          const team = t("aboutTeam.members", { returnObjects: true }) || defaultTeam;\n          const validTeam = Array.isArray(team) && team[0]?.name ? team.map((member, i) => ({ ...member, image: defaultTeam[i]?.image })) : defaultTeam;\n          return validTeam.map']
]);

// 10. AboutCtaSection.jsx
patch('src/features/about/components/AboutCtaSection.jsx', [
  ['Join the movement', '{t("aboutCta.badge")}'],
  ['Ready to step up?', '{t("aboutCta.title")}'],
  ['Whether you want to compete, create, or just find your people — there\'s a place for you here.', '{t("aboutCta.subtitle")}'],
  ['Get started free', '{t("aboutCta.getStarted")}'],
  ['Talk to us', '{t("aboutCta.talkToUs")}'],
  ['Takes 2 minutes. Cancel anytime.', '{t("aboutCta.footnote")}']
]);

// 11. ContactComponent.jsx
patch('src/features/contact/components/ContactComponent.jsx', [
  ['Get in touch', '{t("contact.eyebrow")}'],
  ['We\'d love to', '{t("contact.title1")}'],
  ['hear from you.', '{t("contact.title2")}'],
  ['A question, a partnership idea, or just want to say hello — our team is here and happy to help.', '{t("contact.subtitle")}'],
  ['Send us a message', '{t("contact.formTitle")}'],
  ['We\'ll reply within 24 hours.', '{t("contact.formSubtitle")}'],
  ['Full Name', '{t("contact.fullName")}'],
  ['placeholder="Alex Rivera"', 'placeholder={t("contact.fullNamePlaceholder")}'],
  ['Email Address', '{t("contact.emailAddress")}'],
  ['placeholder="alex@vibe.com"', 'placeholder={t("contact.emailPlaceholder")}'],
  ['>Message<', '>{t("contact.message")}<'],
  ['placeholder="How can we help?"', 'placeholder={t("contact.messagePlaceholder")}'],
  ["'Sending…'", 't("contact.sending")'],
  ["'Send message'", 't("contact.sendMessage")'],
  ["'Message sent! We`ll get back to you soon.'", 't("contact.successMessage")'],
  ["'Something went wrong. Try again.'", 't("contact.errorMessage")'],
  ['Email Support', '{t("contact.emailSupportLabel")}'],
  ['support@vibehubclub.ma', '{t("contact.emailSupportValue")}'],
  ['HQ Location', '{t("contact.locationLabel")}'],
  ['CMC OFPPT, Casablanca, Morocco', '{t("contact.locationValue")}'],
  ['Follow us', '{t("contact.followUs")}'],
  ['Students first', '{t("contact.studentsFirst")}'],
  ['Your people are already here.', '{t("contact.ctaTitle")}'],
  ['Hundreds of students found their crew, their projects, and their confidence through this platform. Your story starts the same way — just show up.', '{t("contact.ctaSubtitle")}'],
  ['>Get started free<', '>{t("contact.ctaGetStarted")}<'],
  ['Talk to us →', '{t("contact.ctaTalkToUs")}'],
  ['No credit card. No pressure. Just your campus, better.', '{t("contact.ctaFootnote")}']
]);

// 12. EventsPage.jsx
patch('src/features/events/pages/EventsPage.jsx', [
  ['Chargement...', '{t("eventsPage.loading")}'],
  ['Aucun événement disponible.', '{t("eventsPage.empty")}']
]);

// 13. EventsHeroSection.jsx
patch('src/features/events/components/EventsHeroSection.jsx', [
  ['The Calendar', '{t("eventsHero.eyebrow")}'],
  ['Experiences that', '{t("eventsHero.title1")}'],
  ['matter.', '{t("eventsHero.title2")}'],
  ['From intense sports tournaments to creative workshops and founder pitches. Find where you belong.', '{t("eventsHero.subtitle")}']
]);

// 14. EventsFilterSection.jsx
patch('src/features/events/components/EventsFilterSection.jsx', [
  ['Browse by category', '{t("eventsFilter.browseByCategory")}'],
  ['label: "All Events"', 'label: t("eventsFilter.allEvents")'],
  ['label: "Sport"', 'label: t("eventsFilter.sport")'],
  ['label: "Culture"', 'label: t("eventsFilter.culture")'],
  ['label: "Entrepreneurship"', 'label: t("eventsFilter.entrepreneurship")'],
  ['label: "Date"', 'label: t("eventsFilter.dateRange")']
]);

// 15. EventCard.jsx
patch('src/features/events/components/EventCard.jsx', [
  ['View event', '{t("eventCard.viewEvent")}']
]);

// 16. LoginPage.jsx
patch('src/features/auth/pages/LoginPage.jsx', [
  ['Welcome back', '{t("login.welcomeBack")}'],
  ['Enter your details to access your account.', '{t("login.subtitle")}'],
  ['>Email address<', '>{t("login.email")}<'],
  ['placeholder="alex@example.com"', 'placeholder={t("login.emailPlaceholder")}'],
  ['>Password<', '>{t("login.password")} <'],
  ["'Signing In...'", 't("login.signingIn")'],
  ["'Sign In'", 't("login.signIn")'],
  ['Not a member?', '{t("login.notMember")}'],
  ['>Create an account<', '>{t("login.createAccount")}<'],
  ["'Something went wrong.'", 't("login.errorDefault")'],
  ['Connect. Create. Compete.', '{t("login.brandTitle")}'],
  ['The ultimate platform for university life.', '{t("login.brandSubtitle")}'],
  ["label === 'Members' ? t('login.members') : label === 'Events/yr' ? t('login.eventsYr') : t('login.domains')", "label"],
  ["'Members'", 't("login.members")'],
  ["'Events/yr'", 't("login.eventsYr")'],
  ["'Domains'", 't("login.domains")']
]);

// 17. RegisterPage.jsx
patch('src/features/auth/pages/RegisterPage.jsx', [
  ['Create your account', '{t("register.title")}'],
  ['Join VibeHub and unlock your campus experience.', '{t("register.subtitle")}'],
  ['>Last Name<', '>{t("register.lastName")}<'],
  ['placeholder="Rivera"', 'placeholder={t("register.lastNamePlaceholder")}'],
  ['>First Name<', '>{t("register.firstName")}<'],
  ['placeholder="Alex"', 'placeholder={t("register.firstNamePlaceholder")}'],
  ['>Email address<', '>{t("register.email")}<'],
  ['placeholder="alex@example.com"', 'placeholder={t("register.emailPlaceholder")}'],
  ['>Password<', '>{t("register.password")}<'],
  ["'Registering...'", 't("register.registering")'],
  ["'Register for free'", 't("register.registerFree")'],
  ['Already a member?', '{t("register.alreadyMember")}'],
  ['>Sign In<', '>{t("register.signIn")}<'],
  ["'Something went wrong.'", 't("register.errorDefault")'],
  ['Connect. Create. Compete.', '{t("register.brandTitle")}'],
  ['The ultimate platform for university life.', '{t("register.brandSubtitle")}'],
  ["'Members'", 't("register.members")'],
  ["'Events/yr'", 't("register.eventsYr")'],
  ["'Domains'", 't("register.domains")']
]);

// 18. Footer.jsx
patch('src/components/layout/Footer.jsx', [
  ['>About Us<', '>{t("footer.about")}<'],
  ['>Our Activities<', '>{t("footer.events")}<'],
  ['>Upcoming Events<', '>{t("footer.events")}<'],
  ['>Member Benefits<', '>{t("footer.register")}<'],
  ['>Help Center<', '>{t("footer.contact")}<'],
  ['>Contact Us<', '>{t("footer.contact")}<'],
  ['>Privacy Policy<', '>{t("footer.privacy")}<'],
  ['>Terms of Service<', '>{t("footer.terms")}<'],
  ['>University Club<', '>{t("footer.universityClub")}<'],
  ['The premier student-led organization for well-rounded university\n            experiences.', '{t("footer.subtitle")}'],
  ['© 2026 VibeHub Club. All rights reserved.', '{t("footer.rights")}']
]);

