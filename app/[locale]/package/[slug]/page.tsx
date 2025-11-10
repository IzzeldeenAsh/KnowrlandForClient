import Footer from '@/components/ui/footer'
import Breadcrumb from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchBreadcrumb } from "@/utils/breadcrumb";
import PackageKnowledgeDisplay from "./PackageKnowledgeDisplay";
import PackageSideBox from "./PackageSideBox"; // Import the new component
import { cookies } from "next/headers";
import styles from "./package.module.css";

interface PackageData {
  slug: string;
  name: string;
  price: number;
  discount: number;
  final_price: number;
  knowledge: Array<{
    slug: string;
    type: string;
    title: string;
    description: string;
    total_price: string;
    published_at: string;
    insighter: {
      name: string;
      profile_photo_url: string | null;
      roles: string[];
    };
  }>;
}

interface Params {
  slug: string;
  locale?: string;
}

interface Props {
  params: Promise<Params>; // Note: params is a Promise
}

async function fetchPackageData(slug: string, locale: string = 'en') {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("knoldg_session");
  const token = tokenCookie?.value;
  
  const response = await fetch(
    `https://api.foresighta.co/api/platform/industries/package/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );
  
  if (!response.ok) {
    console.error("API Error:", {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
    });
    
    if (response.status === 404) {
      return notFound();
    }
    
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error(`Failed to fetch package details: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  return data.data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale = 'en' } = await params;
  try {
    const packageData: PackageData = await fetchPackageData(slug, locale);
    return {
      title: `${packageData.name} Package | Insighta`,
      description: `Explore the ${packageData.name} package, including exclusive knowledge and insights.`,
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Package | Insighta",
      description: "Exclusive packages and insights",
    };
  }
}

export default async function PackagePage({ params }: Props) {
  // Await params to access its properties
  const { slug, locale = 'en' } = await params;
  
  try {
    const packageData: PackageData = await fetchPackageData(slug, locale);
  
    return (
      <div className={styles.container}>
      
  
        {/* Header Section with Background Image and Breadcrumb */}
        <div className={styles.sectionHeader}>
          <Image
            alt="Section background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className="relative z-10 container mx-auto px-4 mt-20 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
              <div className="flex-1 max-w-3xl">
              <span className="inline-block px-5 py-1 text-xs font-semibold text-blue-500 bg-blue-100 rounded-md mb-2 uppercase">
                     Package
                    </span>
                <div className="text-start mb-4" data-aos="fade-down">
                  <h3 className="text-md bg-gradient-to-r from-blue-500 to-teal-400 md:text-4xl font-extrabold text-transparent bg-clip-text">
                    {packageData.name} Package
                  </h3>
                </div>
              </div>
              <div className="block md:hidden w-full" data-aos="fade-up">
                <PackageSideBox
                  name={packageData.name}
                  final_price={packageData.final_price}
                  discount={packageData.discount}
                />
              </div>
                  {/* Desktop Side Box */}
        <div className="hidden md:block w-80" data-aos="fade-left">
          <PackageSideBox
            name={packageData.name}
            final_price={packageData.final_price}
            discount={packageData.discount}
          />
        </div>
            </div>
          </div>
        </div>
  
    
  
        {/* Main Content: Toggle view for included knowledge */}
        <div className="container mx-auto px-4 pt-4">
          <PackageKnowledgeDisplay
            knowledge={packageData.knowledge}
            totalPages={1}  
          />
        </div>
  
        <Footer />
      </div>
    );
  } catch (error) {
    console.error("Page render error:", error);
    throw error;
  }
}
