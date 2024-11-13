// import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../../components/Welcome/Welcome';
import Layout from '../../components/Layout/Layout';

import Link from "next/link";
import { useTranslation } from "../i18n";


type PageProps = { params: Promise<{ lng: string; }> };

export default async function HomePage({ params }: PageProps) {
  const { lng } = await params; // 在函式內部解構
  const { t } = await useTranslation(lng, "common"); // 假設使用 'common' 命名空間
// console.log("lng", lng)
  return (
    <>
      <Layout lng={lng}>
        <Welcome />
        {/* <ColorSchemeToggle /> */}
        {/* <h1>{t("login.login")}</h1>
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
      <Link href={`/zh-Hant/second-page`}>{t("back-to-zh")}</Link>
      <Link href={`/en`}>{t("back-to-en")}</Link> */}
      </Layout>
    </>
  );
}
