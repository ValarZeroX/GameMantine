import Link from "next/link";
import { useTranslation } from "../../i18n";

type PageProps = { params: { lng: string } };
export default async function Page({ params }: PageProps) {
    // const { lng } = await params; // 在函式內部解構
    
    const { lng } = await params; // 在函式內部解構
    const { t } = await useTranslation(lng, "common");
    // console.log('second-page', lng);
  return (
    <>
      <h1>{t("login.login")}</h1>
      <Link href={`/${lng}`}>{t("back-to-home")}</Link>
    </>
  );
}