import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s – Fiatsend",
      };
    }
  },
  logo: <img src="/favicon.ico" alt="fiatsend logo" width={40} />,
  themeSwitch: {
    useOptions() {
      return {
        light: "Light",
        dark: "Dark",
        system: "System",
      };
    },
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      "https://fiatsend.com" +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta
          property="og:title"
          content={frontMatter.title || "Fiatsend Docs"}
        />
        <meta
          property="og:image"
          content={
            frontMatter.image || "https://www.fiatsend.com/images/fiatsend.png"
          }
        />
        <meta
          property="og:description"
          content={
            frontMatter.description || "A detailed documentation about Fiatsend"
          }
        />
      </>
    );
  },
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()}{" "}
        <a
          href="https://fiatsend.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fiatsend
        </a>
        . All rights reserved.
      </span>
    ),
  },
  project: {
    link: "https://github.com/fiatsend",
  },
  docsRepositoryBase: "https://github.com/fiatsend/docs/blob/main",
};
