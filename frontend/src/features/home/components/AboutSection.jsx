function AboutSection() {
  return (
    <section className="container-custom section-padding">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-4">
          <div
            className="aspect-square rounded-2xl bg-orange-100"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCsVSxoJCRDO0Ru65Ws-y_RY2Z7n-yaJF476K2m8mG5MdL__h8mVRn1SIJYyaDXCH4ipYiEYCDfOCaton5XcZX2CKI9m7aEAt1DA5sce0CZ4pTSYQKKQ_COAQVPN5ta84QLS_U5BLJ6xlzfZi6Flfp77N0uzNU6ZPlzVG821tLy49x9eIUdpCWysjfLnRL7bE4b8ARTYV9GNesdXnFOX3vjiBhcvWFD1F7CUZ-q8EQnXxW85KK4M-P2rOj68VM1S5HFaChZQlg0xGw5')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="mt-8 aspect-square rounded-2xl bg-orange-100"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYTlemtU1p185pUAgy8YRv0w5QFmIuTeqFZcC48UcOkSxt5jXUd1ZbAGF1PRQ1bF-4alpFWkxRXV9aBvZ4AwAFsR5-VCsEBk8rXEKppgo0eTiyIzSyAuTnvp1wTcaTDzRJouvMjMF6MjeGTnrKFBq66t6p-AKUJjCAn-z4_eNWF-BD-Afqu7HnjYuUnBON1mlC2OPkxzBthwn14EpgGJEDVnW2wm7RQEcRtuASW0VuiBtOLnDjBPLhjdIOT-r__slpWA88jAgc_ZOF')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <h2 className="section-title">About VibeHub Club</h2>
          <div className="h-1.5 w-20 rounded-full bg-primary-custom" />
          <p className="text-lg leading-relaxed text-muted">
            VibeHub is more than just a club; it&apos;s a movement within the
            university. We bridge the gap between passion and professional
            growth by providing a platform for students to excel in sports,
            culture, and entrepreneurship.
          </p>
          <p className="text-lg leading-relaxed text-muted">
            Founded on the pillars of inclusivity and excellence, we empower
            students to step out of their comfort zones and lead the next
            generation of campus life.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;