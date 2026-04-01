const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBj2KDXPAmcWsTtBy-OFDE0QgaC6GhvQdgiZ7_7jOP3qGjpqlVyritfUPNwuucWxpEJNnJBPm9Q3-OoszmIGrZca2XI8Nd7LEKRCj7s0Mq7rP-faE7DicDkt1yn2jOKTgjnUbj4yTBfE9UZjYQeL55UKdl4jHw4A-8JvbJukNU15upihMc3Imxh4lSc7ciZ_-7zxDxACR-WmtN8f3bX60mFugrs6MGLeWcCDASHbOl04yAp5EFvFoFdJ8d-j2lPEyi16VxbV_jKFDbB",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCo6wUEJu2rIcJCyh5szyQ8bXOAT4RD8a5QUFKFN6673Q23TmN5CvOMEYcalfgfJn_dgB5pOY52RJ2C66IQYA0GHI8i38Z9fK-cT7Upw7fBU_ijg16lR_uuy7-47Mc6EL4s4ci3KIQlSPuW20NQnDsQiHsLmW4VkImnRywRLvvBq2LbBhNADHLHJ0T-bRTxDfZXV2--KiV-NKOr-bJI0JIIGLSuRequUsTN8rLi_qLYrdhXEzl42KrE_p3mdq8YxYbeekFAFEdYuF7K",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCkPnTpHa7ftxKP2kT8YsN-4YIEt8vq_WafAeyB1743cYHk-YQtQ4o1IdpCs3eUVSXfWmCtyBMb4h9wkF5LpVosxPXee61C8K4ro7JaxBcrLM1h4Z4Q1nkdaeZCF1ITTJJRZ8ya7pUKNZ1GQzmbYmkY55Y3u1v7H8EuhPhEY22alTs0fPvi7OssNCuclQm_GFfoyHUISpuwj_FOk6ssNITDyGRhXyub-M0XTUl-tA30Z_VqMUVRHAuWdp7sdYgNrRAf_kIlgBcUHHgx",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCBVkhDUv1M0bsHhQ4FVRQ_fm2IpZoK3LA6Oeqao85ZYwBftVPZCX02ZAFkh72pAE554xwuFVOw0xzAW7d3GUUn0w4x25BQcYkFRnLpZSkD2129it4ckY4pbogpG524OqlyrgTxKMLQUFr9ZaLVxMJhqdslCvnAWnFAWHMhreUkg5OYnA6xMNJcdVsWhoSRsoOCgKZM4bgf1R9Fudsk2e62yJhhpgYUcnCmrFCIDaJix5WZOyQvPzCQGmfm9vptvU58DXsRRelCKG3y",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBIHo4cz8MBsBwXkbYtxGlptNq3kNxp6i81pnwhPmo3QaeKgZgkIR-riJ6T8WNGDKKqJPuoQNNwY6NfKHeNlAiTJxo-aYglewtD1p98z0hgWTtiUE2PijAAmu9LPk_8EpmkaLGAeERHd7QusaO5rMnVwQcfcH2tqiERuRdLXlOoiszywqS3tmTYW3nUatCeIGCNYHW4bAfEPFT1r1PIuuGVgOzsKUdIDgm-IcKJl-yUq6Gwnhm7eI6EUqyoBpFTeWQlzliEA0poUmlR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFyufQkpTO5GyPnT2KFT_vXZLVa07e0JfCfTnbaUyUyYzFtuPE5uJXDHDiblj217z6DN2tDsmC_szk_Ikb640NpiBi3ISDI6dcwDjzFiYUoJAz5b_ydK8-Sy5zNU1hlWeT11gRKErpXqjFJoeF2JZ18a54o0PYUPGpiVcWHaU67dFHPOLjItqzci0yM42RlCAiqYAuBSiWVEq1lAJI5VeHcGORUTPxyM1-qeYIFV5kk5kMXldpZ-C1ceC0roX2_h8WsQHYUbu-9LJU",
];

function GallerySection() {
  return (
    <section className="bg-slate-50 px-6 py-24 lg:px-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-16 text-center">
          <h2 className="section-title">Community Moments</h2>
          <p className="section-subtitle">
            Glimpses into our vibrant club life
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-xl shadow-sm">
              <img
                src={image}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GallerySection;