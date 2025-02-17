'use client';

import { useSubIndustry, IndustryType } from '@/hooks/industries';
import { Container, Text, Skeleton } from '@mantine/core';
import HeaderLight from '@/components/ui/header-light';
import FooterLight from '@/components/ui/footer-light';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect } from 'react';
import styles from './sub-industry-by-type.module.css';
import IndustryIcon from "@/components/icons/industry-icon";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Stripes from "@/public/images/stripes-dark.svg";
interface Topic {
  id: number;
  name: string;
  slug: string;
  knowledge: any[];
}

interface Knowledge {
  id: number;
  name: string;
  slug: string;
  description: string;
  topic_id: number;
}

const validTypes: IndustryType[] = ['report', 'insight', 'data', 'manual', 'course'];

interface Props {
  params: Promise<{
    type: string;
    id: string;
    slug: string;
  }>;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function SubIndustryByTypePage({ params }: Props) {
  const resolvedParams = use(params);
  const type = resolvedParams.type as IndustryType;
  const id = parseInt(resolvedParams.id, 10);
  const slug = resolvedParams.slug;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  // Validate type parameter
  if (!validTypes.includes(type)) {
    notFound();
  }

  const { subIndustry, isLoading, error } = useSubIndustry({
    type,
    id,
    slug,
    topTopic: 5,
  });

  if (error) {
    return (
      <>
        <HeaderLight />
        <Container className={styles.container}>
          <Text color="red">{error}</Text>
        </Container>
        <FooterLight />
      </>
    );
  }

  return (
    <>
      <HeaderLight />
      <div className="relative z-10 max-w-6xl relative mx-auto  w-full ">
      <div
        className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
        style={{ left: '28%' }}
        aria-hidden="true"
      >
        <Image
          className="max-w-none opacity-50"
          src={Stripes}
          width={768}
          height={768}
          style={{ width: 'auto', height: 'auto' }}
          alt="Stripes"
          priority
        />
      </div>
      </div>
    
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <Image
            alt="Section background"
            src="https://res.cloudinary.com/dsiku9ipv/image/upload/v1737266454/breadcrumb-bg-2_anwto8.png"
            fill
            className="object-cover z-0"
            priority
          />
          <div className={styles.headerContent}>
            <div data-aos="fade-down">
              <span className={styles.typeLabel}>
                {capitalizeFirstLetter(type)}s
              </span>
              <h3 className={styles.headerTitle}>
                {subIndustry?.name || 'Loading...'}
              </h3>
              <p className={styles.description}>
                Explore our comprehensive collection of {type}s for {subIndustry?.name}. Get detailed insights and analysis to support your business decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} height={200} radius="md" />
              ))}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-4">Topics & Knowledge</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {subIndustry?.topic?.map((topic: any) => (
                  <div
                    key={topic.id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    data-aos="fade-up"
                  >
                    <div className="space-y-3">
                      <Link href={`/en/topic-by-type/${type}/${topic.id}/${topic.slug}`} className="block">
                        <div className="flex items-center gap-2">
                          <IndustryIcon />
                          <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600">
                            {topic.name}
                          </h3>
                        </div>
                      </Link>
                      {topic?.knowledge && topic.knowledge.length > 0 ? (
                        <div>
                          <h3 className="text-sm font-bold mb-2">Knowledge</h3>
                          <ul className="space-y-2">
                            {topic.knowledge.map((item: any) => (
                                <Link href={`/en/knowledge/${item.id}/${item.slug}`} key={item.id} className="block">
                                  <li className="text-xs text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                                    <span className="mr-2">•</span>
                                    {item.title}
                                  </li>
                                </Link>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500 italic flex items-center">
                          <span className="mr-2">•</span>
                          <p>No knowledge items available</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <FooterLight />
    </>
  );
}
