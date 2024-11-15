/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://pokemonnier.com/',
    generateRobotsTxt: true, // 生成 robots.txt 文件
    // 可選配置
    // exclude: ['/admin/**', '/secret-page'],
    // robotsTxtOptions: {
    //   additionalSitemaps: ['https://yourdomain.com/my-custom-sitemap-1.xml'],
    // },
  }