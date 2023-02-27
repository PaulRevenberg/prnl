/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Paul Revenberg | Developer`,
    siteUrl: `https://www.paulrevenberg.nl`,
    description: "Paul Revenberg | Developer | Photo gallery",
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Paul Revenberg | Developer",
        short_name: "Paul",
        start_url: "/",
        background_color: "#FAFAFA",
        theme_color: "#344C11",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/images/favicon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: "www.paulrevenberg.nl",
        region: "eu-central-1",
        acl: null,
      },
    },
  ],
};
